from pydantic import BaseModel


class AuthModel(BaseModel):
    email: str
    password: str

    class Config:
        schema_extra = {
            'example': {
                'email': 'user@example.com',
                'password': 'hahasecure',
            }
        }
