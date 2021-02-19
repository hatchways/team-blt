from flask import request, Response, make_response, jsonify
from flask_restful import Resource, Api
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models.user import User
import datetime


class UsersApi(Resource):
    # Read the list of users
    def get(self):
        users = User.objects().to_json()
        return Response(users, mimetype="application/json", status=200)

    def post(self):
        body = request.get_json()
        name = body.get('name')
        email = body.get('email')
        password = body.get('password')
        user = User(name=name, email=email, password=password)
        user.hash_password()
        user.save()
        name = user.name
        password = user.password
        return {'name': str(name)}, 201

'''
get_jwt_identity() returns the identity of the JWT that is accessing the endpoint.
In this case, get_jwt_identity() will return the user's email. In order to check
if the current use has access to specific enpoints such as the editing and 
deleting the user's profile, the user's email will be compared to the returned 
result of get_jwt_identity(). 
'''

class UserApi(Resource):
    # Update user profile
    @jwt_required()
    def put(self, name):
        user_id = get_jwt_identity()
        user = User.objects.get(email=user_id)
        body = request.get_json()
        name = body.get('name')
        email = body.get('email')
        password = body.get('password')
        user = User(name=name, email=email, password=password)
        User.objects.get(name=name).update(name=name, email=email, password=password)
        user.update(**body)
        return '', 200

    # Delete user profile
    @jwt_required()
    def delete(self, name):
        user_id = get_jwt_identity()
        if name == user_id:
            user = User.objects.get(email=user_id)
            user.delete()
            return '', 200

    # Read user prolfile
    @jwt_required()
    def get(self, name):
        user = User.objects.get(name=name).to_json()
        return Response(user, mimetype="application/json", status=200)


class SignupApi(Resource):
    # Create user account
    def post(self):
        body = request.get_json()
        name = body.get('name')
        email = body.get('email')
        password = body.get('password')
        user = User(name=name, email=email, password=password)
        user.hash_password()
        user.save()
        return name, 201


class LoginApi(Resource):
    # Log in user
    def post(self):
        body = request.get_json()
        user = User.objects.get(email=body.get('email'))
        checked = user.check_password(body.get('password'))
        if not checked:
            return {'error': 'Email or password invalid'}, 401

        expires = datetime.timedelta(days=7)
        access_token = create_access_token(
            identity=str(user.email), expires_delta=expires)

        response = jsonify(access_token)
        response.status_code = 201
        response.set_cookie(user.email, access_token)
        return response
