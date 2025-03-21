from api.extensions import mongo

user_information_collection = mongo.db.user_information


def get_user_information(user_id: str):
    try:
        user_info = user_information_collection.find_one({"user_id": user_id})

        if user_info and '_id' in user_info:
            user_info['_id'] = str(user_info['_id'])

        return user_info
    except Exception as e:
        print(f"Error getting user information: {e}")
        return None


def add_user_information(user_id: str, onboarding_data: dict):
    existing = get_user_information(user_id)

    if existing:
        user_information_collection.update_one(
            {"user_id": user_id},
            {"$set": onboarding_data}
        )
    else:
        onboarding_data["user_id"] = user_id
        user_information_collection.insert_one(onboarding_data)

    result = get_user_information(user_id)

    if result and '_id' in result:
        result['_id'] = str(result['_id'])

    return result
