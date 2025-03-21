from flask import Flask, Blueprint, jsonify, request
from flask_restx import Api
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from api.extensions import mongo, bcrypt
from api.exceptions import CustomHttpError
from config import Config
from datetime import timedelta
import logging

authorizations = {
    'Bearer': {
        'type': 'apiKey',
        'in': 'header',
        'name': 'Authorization'
    }
}

logger = logging.getLogger(__name__)


def create_app():
    app = Flask(__name__)
    CORS(app,
         resources={r"/api/*": {"origins": "http://localhost:5173"}},
         supports_credentials=True,
         allow_headers=[
             "Content-Type",
             "Authorization",
         ],
         methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
         )
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=15)
    app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)
    app.config["JWT_TOKEN_LOCATION"] = ["headers", "cookies"]
    app.config["JWT_COOKIE_SECURE"] = True
    app.config["JWT_COOKIE_CSRF_PROTECT"] = True
    app.config["JWT_COOKIE_SAMESITE"] = "strict"
    app.config.from_object(Config)

    # Initialize extensions
    mongo.init_app(app)
    bcrypt.init_app(app)
    jwt = JWTManager(app)

    @jwt.unauthorized_loader
    def unauthorized_callback(error):
        return jsonify({
            "msg": error,
            "error": "authorization_required"
        }), 401

    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return jsonify({
            "msg": error,
            "error": "invalid_token"
        }), 401

    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return jsonify({
            "msg": "The token has expired",
            "error": "token_expired"
        }), 401

    # Verify MongoDB connection
    with app.app_context():
        if mongo.db is None:
            db_name = app.config.get("MONGO_DBNAME")
            if db_name:
                mongo.db = mongo.cx[db_name]

        try:
            mongo.cx.server_info()
            if mongo.db is not None:
                print(f"MongoDB connected successfully to {mongo.db.name}")
            else:
                print("Mongo.db is None. Check MONGO_URI and MONGO_DBNAME")
        except Exception as e:
            print("Failed to connect to MongoDB: ", e)

    # Register API namespaces
    api_v1_blueprint, api_v1 = create_api_v1()
    register_namespaces(api_v1)
    app.register_blueprint(api_v1_blueprint)

    # Register global error handler
    app.register_error_handler(CustomHttpError, global_error_handler)
    # Catch-all for unexpected exceptions
    app.register_error_handler(Exception, fallback_error_handler)

    return app


def create_api_v1():
    blueprint = Blueprint('API v1', __name__, url_prefix='/' + 'api/v1')
    api = Api(blueprint, version='1.0', title='Quant Finance API',
              description='API for Quant Finance',
              authorizations=authorizations,
              security='Bearer')

    # Register error handler for Flask-RESTX-specific exceptions
    api.errorhandler(CustomHttpError)(global_error_handler)

    return blueprint, api


def register_namespaces(api):
    from api.modules.auth import controller as auth_controller
    api.add_namespace(auth_controller.ns)

    from api.modules.onboard import controller as onboard_controller
    api.add_namespace(onboard_controller.ns)

    # from api.modules.stocks import controller as stock_controller
    # api.add_namespace(stock_controller.ns)

    from api.modules.portfolio import controller as portfolio_controller
    api.add_namespace(portfolio_controller.ns)

    # from api.modules.news import controller as news_controller
    # api.add_namespace(news_controller.ns)


def global_error_handler(error):
    """
    Handles CustomHttpError exceptions and returns a JSON response.
    """
    logger.error(f"CustomHttpError: {
                 error.message}, Status: {error.status_code}")
    response, status_code = error.to_json()
    return jsonify(response), status_code


def fallback_error_handler(error):
    """
    Handles unexpected exceptions and returns a generic error response.
    """
    logger.error(f"Unhandled Exception: {error}", exc_info=True)
    response = {
        "message": "An unexpected error occurred.",
        "status_code": 500
    }
    return jsonify(response), 500


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
