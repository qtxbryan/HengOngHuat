# pydantic_to_restx_model.py
from flask_restx import fields
from typing import get_args, get_origin, List
import inspect
from pydantic import BaseModel


def pydantic_to_restx_model(api, name, schema):
    """
    Convert a Pydantic model schema to a Flask-RESTx model, including support for nested objects and arrays.
    """
    flask_fields = {}
    schema_dict = schema.schema()
    properties = schema_dict.get('properties', {})
    required_fields = schema_dict.get('required', [])

    for field_name, field_props in properties.items():
        field_type = field_props.get('type')
        description = field_props.get('description', '')
        is_required = field_name in required_fields

        if field_type == 'string':
            flask_fields[field_name] = fields.String(
                description=description, required=is_required)
        elif field_type == 'integer':
            flask_fields[field_name] = fields.Integer(
                description=description, required=is_required)
        elif field_type == 'number':
            flask_fields[field_name] = fields.Float(
                description=description, required=is_required)
        elif field_type == 'boolean':
            flask_fields[field_name] = fields.Boolean(
                description=description, required=is_required)
        elif field_type == 'array':
            items = field_props.get('items', {})
            items_type = items.get('type')

            if items_type == 'string':
                flask_fields[field_name] = fields.List(
                    fields.String, description=description, required=is_required)
            elif items_type == 'integer':
                flask_fields[field_name] = fields.List(
                    fields.Integer, description=description, required=is_required)
            elif items_type == 'number':
                flask_fields[field_name] = fields.List(
                    fields.Float, description=description, required=is_required)
            elif items_type == 'boolean':
                flask_fields[field_name] = fields.List(
                    fields.Boolean, description=description, required=is_required)
            elif items_type == 'object':
                # Handle list of nested objects
                # Extract the Pydantic type from the schema annotations
                pydantic_type = schema.__annotations__.get(field_name, None)
                if pydantic_type:
                    origin = get_origin(pydantic_type)
                    args = get_args(pydantic_type)
                    if origin in (list, List):
                        item_type = args[0] if args else dict
                        # Avoid infinite recursion by checking if item_type is already a Pydantic BaseModel
                        if inspect.isclass(item_type) and issubclass(item_type, BaseModel):
                            nested_name = f"{name}_{field_name}_item"
                            nested_model = pydantic_to_restx_model(
                                api, nested_name, item_type)
                            flask_fields[field_name] = fields.List(fields.Nested(
                                nested_model), description=description, required=is_required)
                        else:
                            flask_fields[field_name] = fields.List(
                                fields.Raw, description=description, required=is_required)
                    else:
                        flask_fields[field_name] = fields.List(
                            fields.Raw, description=description, required=is_required)
                else:
                    flask_fields[field_name] = fields.List(
                        fields.Raw, description=description, required=is_required)
            else:
                flask_fields[field_name] = fields.List(
                    fields.Raw, description=description, required=is_required)
        elif field_type == 'object':
            # Handle nested objects
            # Extract the Pydantic type from the schema annotations
            pydantic_type = schema.__annotations__.get(field_name, None)
            if pydantic_type and inspect.isclass(pydantic_type) and issubclass(pydantic_type, BaseModel):
                nested_name = f"{name}_{field_name}"
                nested_model = pydantic_to_restx_model(
                    api, nested_name, pydantic_type)
                flask_fields[field_name] = fields.Nested(
                    nested_model, description=description, required=is_required)
            else:
                flask_fields[field_name] = fields.Raw(
                    description=description, required=is_required)
        else:
            flask_fields[field_name] = fields.Raw(
                description=description, required=is_required)

    return api.model(name, flask_fields)
