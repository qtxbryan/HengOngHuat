def template(message, status_code=500, error_type='custom'):
    return {'message': message, 'status_code': status_code, 'error_type': error_type}


GENERIC_ERROR = template(
    message='An internal server error has occurred.',
    status_code=500
)

INVALID_ACCESS_TOKEN = template(
    message='Invalid access token. Please log in again.',
    status_code=401
)

OAUTH_SERVICE_FAILED = template(
    message='Authentication URL for service [{}] is down. Please retry later',
    status_code=500
)

NOT_AUTHORIZED = template(
    message='Request not authorized. Reason: {}',
    status_code=401
)


class CustomHttpError(Exception):
    def __init__(self, message, status_code=None, error_type=None, payload=None):
        Exception.__init__(self)
        self.message = message
        self.error_type = error_type
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_json(self, form_fields=None):
        """
        Convert the error details into a JSON serializable dictionary.
        """
        json_object = form_fields or {}
        json_object['message'] = self.message
        json_object['status_code'] = self.status_code
        if self.error_type:
            json_object['error_type'] = self.error_type
        if self.payload:
            json_object['payload'] = self.payload
        return json_object, self.status_code

    @classmethod
    def generic_error_message(cls):
        return cls(**GENERIC_ERROR)

    @classmethod
    def invalid_access_token(cls):
        return cls(**INVALID_ACCESS_TOKEN)

    @classmethod
    def oauth_service_failed(cls, service_name):
        http_error = cls(**OAUTH_SERVICE_FAILED)
        message = str(http_error.message).format(service_name)
        http_error.message = message
        return http_error

    @classmethod
    def not_authorized(cls, reason):
        http_error = cls(**NOT_AUTHORIZED)
        message = str(http_error.message).format(reason)
        http_error.message = message
        return http_error
