from flask import request
from flask_restx import Namespace, Resource, fields
from api.modules.auth.service import AuthService
from api.models.auth import AuthModel
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from flask import make_response


ns = Namespace('auth', description='Authentication related operations')

# Swagger models
auth_model = ns.model('Login', {
    'email': fields.String(required=True, description='User email'),
    'password': fields.String(required=True, description='User password'),
})


@ns.route('/register')
class RegisterResource(Resource):
    @ns.expect(auth_model, validate=True)
    def post(self):
        """
        Register a new user.
        """
        try:
            data = request.get_json()

            # Validate data
            register_data = AuthModel(**data)

            # Call the AuthService to create the user and save information
            response, status_code = AuthService.register_user(
                register_data.email, register_data.password)

            return response, status_code

        except Exception as e:
            return {
                'status_code': 400,
                'response_type': 'error',
                'description': "Invalid data",
                'error': str(e),
            }, 400


@ns.route('/login')
class LoginResource(Resource):
    @ns.expect(auth_model, validate=True)
    def post(self):
        """
        Login and return a JWT token.
        """
        try:
            data = request.get_json()

            # Validate with AuthModel
            login_data = AuthModel(**data)

            # Call the AuthService to authenticate the user
            response, status_code = AuthService.login_user(
                login_data.email,
                login_data.password
            )

            if status_code == 200:
                resp = make_response(response, status_code)
                refresh_token = response.pop('refresh_token')

                resp.set_cookie(
                    'refresh_token',
                    refresh_token,
                    httponly=True,
                    secure=True,
                    samesite='strict',
                    max_age=60*60*24*30)

                return resp

            return response, status_code

        except Exception as e:
            return {
                "status_code": 400,
                "response_type": "error",
                "description": "Invalid data",
                "error": str(e),
            }, 400


@ns.route('/refresh')
class RefreshResource(Resource):

    def post(self):
        """
        Refresh the access token using a valid refresh token.
        """
        try:
            refresh_token = request.cookies.get('refresh_token')

            if not refresh_token:
                return {
                    "status_code": 401,
                    "response_type": "error",
                    "description": "No refresh token provided",
                }, 401

            from flask_jwt_extended import decode_token, get_jwt_identity

            try:
                user_claims = decode_token(refresh_token)
                user_id = user_claims['sub']

                new_access_token = create_access_token(identity=user_id)

                return {
                    "access_token": new_access_token,
                }, 200

            except Exception as e:
                return {
                    "status_code": 401,
                    "response_type": "error",
                    "description": "Invalid refresh token",
                    "error": str(e),
                }, 401

        except Exception as e:
            return {
                "status_code": 500,
                "response_type": "error",
                "description": "Server error",
                "error": str(e),
            }, 500


@ns.route('/logout')
class LogoutResource(Resource):
    def post(self):
        """
        Logout the user by clearing the refresh token cookie.
        """
        response = make_response({
            "message": "Logged out successfully"
        }, 200)

        response.delete_cookie('refresh_token')

        return response


@ns.route('/user')
class UserResource(Resource):
    @jwt_required()
    def get(self):
        """
        Get logged in user email
        """
        try:
            user_id = get_jwt_identity()
            print(f"User ID: {user_id}")

            user = AuthService.find_user_by_id(user_id)
            print(f"User found in database: {user}")

            if not user:
                return {
                    'status_code': 404,
                    'response_type': 'error',
                    'description': 'User not found',
                }

            return {"email": user["email"]}, 200
        except Exception as e:
            return {
                'status_code': 500,
                'response_type': 'error',
                'description': 'Server error',
                'error': str(e),
            }, 500
