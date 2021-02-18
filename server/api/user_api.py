from flask import request, Response, make_response, jsonify
from flask_restful import Resource, Api
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models.user import User
import datetime


class UsersApi(Resource):
    def get(self):
        users = User.objects().to_json()
        return Response(users, mimetype="application/json", status=200)

    def delete(self):
        user = User.objects.delete()
        return '', 200

    def post(self):
        body = request.get_json()
        user = User(**body)
        user.hash_password()
        user.save()
        username = user.username
        password = user.password
        return {'username': str(username)}, 201


class UserApi(Resource):
    @jwt_required()
    def put(self, username):
        body = request.get_json()
        User.objects.get(username=username).update(**body)
        return '', 200

    @jwt_required()
    def delete(self, username):
        user = User.objects.get(username=username).delete()
        return '', 200

    @jwt_required()
    def get(self, username):
        user = User.objects.get(username=username).to_json()
        return Response(user, mimetype="application/json", status=200)


class SignupApi(Resource):
    def post(self):
        body = request.get_json()
        user = User(**body)
        user.hash_password()
        user.save()
        username = user.username
        return {'username': str(username)}, 201


class LoginApi(Resource):
    def post(self):
        body = request.get_json()
        user = User.objects.get(username=body.get('username'))
        checked = user.check_password(body.get('password'))
        if not checked:
            return {'error': 'Email or password invalid'}, 401

        expires = datetime.timedelta(days=7)
        access_token = create_access_token(
            identity=str(user.username), expires_delta=expires)
        response = make_response('given access')
        response.set_cookie('access token', access_token, httponly=True)
        return {'token': access_token}, 201
