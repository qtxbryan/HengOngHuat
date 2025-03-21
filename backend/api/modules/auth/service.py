from flask_jwt_extended import create_access_token, create_refresh_token
from api.extensions import mongo, bcrypt
from bson.objectid import ObjectId
from pydantic import ValidationError
from werkzeug.security import generate_password_hash, check_password_hash


class AuthService:
    @staticmethod
    def register_user(email, password):
        """
        Register a new user by creating a record in `users` collection.
        """
        users_collection = mongo.db.users

        # Check if the email already exists
        if users_collection.find_one({"email": email}):
            return {"message": "User already exists"}, 409

        # Hash the password
        hashed_password = generate_password_hash(password)

        # Create user record
        user_id = ObjectId()
        users_collection.insert_one({
            "_id": user_id,
            "email": email,
            "password": hashed_password
        })

        # Return success with JWT token
        access_token = create_access_token(identity=str(user_id))
        return {"message": "User registered successfully", "access_token": access_token, "user_id": str(user_id)}, 201

    @staticmethod
    def login_user(email, password):
        """
        Authenticate a user with email and password.
        """
        users_collection = mongo.db.users

        # Find user by email
        user = users_collection.find_one({"email": email})
        if not user:
            return {"message": "Invalid email or password"}, 401

        # Check password
        if not check_password_hash(user["password"], password):
            return {"message": "Invalid email or password"}, 401

        # Generate and return JWT token
        access_token = create_access_token(identity=str(
            user["_id"]))  # Ensure user_id is a string
        refresh_token = create_refresh_token(identity=str(user["_id"]))

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user_id": str(user["_id"]),
        }, 200

    @staticmethod
    def find_user_by_id(user_id):
        """
        Find user by user_id
        """
        try:
            users_collection = mongo.db.users
            user = users_collection.find_one({"_id": ObjectId(user_id)})
            if not user:
                return None
            return user
        except Exception as e:
            print(f"Error finding user by ID: {e}")
            return None

    @staticmethod
    def update_user(user_id, updates):
        """
        Update user by user_id
        """
        users_collection = mongo.db.users
        users_collection.update_one(
            {"id": user_id},
            {"$set": updates}
        )
        return users_collection.find_one({"id": user_id})
