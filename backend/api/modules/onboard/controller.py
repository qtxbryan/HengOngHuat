import logging
from flask import request
from flask_restx import Namespace, Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.constants import RouteConstants
from api.exceptions import CustomHttpError
from api.models.user import User
from api.models.user_information import UserInformation
from api.modules.onboard.handler import add_user_information, get_user_information
from api.utils.pydantic_utils import pydantic_to_restx_model

logging.basicConfig(level=logging.INFO)
LOGGER = logging.getLogger(__name__)

ns = Namespace('user', description='User related operations')

user_information_model = pydantic_to_restx_model(
    ns, "UserInformation", UserInformation)


@ns.route('/information')
class UserInformationResource(Resource):
    @jwt_required()
    def get(self):
        """
        Get user information
        """
        response_data = dict()
        try:
            user_id = get_jwt_identity()
            user_info = get_user_information(user_id)

            if user_info:
                response_data['message'] = 'User information retrieved successfully'
                response_data['status_code'] = 200
                response_data['data'] = user_info
            else:
                response_data['message'] = 'No user information found'
                response_data['status_code'] = 404

        except Exception as err:
            LOGGER.error(f"Error getting user information: {err}")
            raise CustomHttpError("An internal server error has occurred", 500)

        return response_data, response_data['status_code']


@ns.route('/onboarding')
class OnboardingResource(Resource):
    @jwt_required()
    @ns.expect(user_information_model, validate=True)
    def post(self):
        """
        Add user information
        """
        response_data = dict()
        try:
            user_id = get_jwt_identity()
            data = request.get_json()
            onboarding_data = UserInformation(**data)

            db_result = add_user_information(
                user_id, onboarding_data.model_dump())

            if db_result:
                response_data['message'] = 'Onboarding data added successfully'
                response_data['status_code'] = 200
                response_data['data'] = db_result
            else:
                response_data['message'] = 'Error adding onboarding data'
                response_data['status_code'] = 500
        except Exception as err:
            LOGGER.error(f"Error adding onboarding data: {err}")
            raise CustomHttpError.generic_error_message()

        return response_data, response_data['status_code']
