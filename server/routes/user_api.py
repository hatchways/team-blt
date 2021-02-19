from flask import request, Response, make_response, jsonify
from flask_restful import Resource, Api
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models.user import User
import datetime


class UsersApi(Resource):
    def get(self):
        users = User.objects().to_json()
        return Response(users, mimetype="application/json", status=200)

    def post(self):
        body = request.get_json()
        username = body.get('name')
        email = body.get('email')
        password = body.get('password')
        user = User(username=username, email=email, password=password)
        user.hash_password()
        user.save()
        username = user.username
        password = user.password
        return {'username': str(username)}, 201


class UserApi(Resource):
    @jwt_required()
    def put(self, username):
        user_id = get_jwt_identity()
        user = User.objects.get(username=user_id)
        body = request.get_json()
        username = body.get('name')
        email = body.get('email')
        password = body.get('password')
        user = User(username=username, email=email, password=password)
        User.objects.get(username=username).update(username=username, email=email, password=password)
        user.update(**body)
        return '', 200

    @jwt_required()
    def delete(self, username):
        user_id = get_jwt_identity()
        if username == user_id:
            user = User.objects.get(username=user_id)
            user.delete()
            return '', 200

    @jwt_required()
    def get(self, username):
        user = User.objects.get(username=username).to_json()
        return Response(user, mimetype="application/json", status=200)


class SignupApi(Resource):
    def post(self):
        body = request.get_json()
        username = body.get('name')
        email = body.get('email')
        password = body.get('password')
        user = User(username=username, email=email, password=password)
        user.hash_password()
        user.save()
        return username, 201


class LoginApi(Resource):
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
