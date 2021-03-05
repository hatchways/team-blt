from flask import request, Response, make_response, jsonify
from flask_restful import Resource, Api
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, unset_jwt_cookies, set_access_cookies
from models.user import User
import json
import datetime


class UsersApi(Resource):
    def put(self):
        size = len(User.objects)
        body = request.get_json(force=True)
        getFriends = body.get('getFriends')
        friends = body.get('friends')

        if getFriends:
            userInfo = User.objects(email__in=friends).only('email', 'name', 'profile_pic')
        else:
            userInfo = User.objects(email__nin=friends).only('email', 'name', 'profile_pic')

        return Response(userInfo.to_json(), mimetype="application/json", status=200)

class UserApi(Resource):
    @jwt_required()
    def put(self):
        user_id = get_jwt_identity()
        user = User.objects.get(email=user_id)
        body=request.get_json()
        user.update(**body)
        return Response(user.to_json(), mimetype="application/json", status=200)

    @jwt_required()
    def delete(self):
        user_id = get_jwt_identity()
        user = User.objects.get(email=user_id)
        user.delete()
        return 'User has been deleted', 200

    def get(self):
        email = request.get_json(force=True).get('email')
        user = User.objects.only('email', 'name', 'profile_pic').get(email=email)
        return Response(user.to_json(), mimetype="application/json", status=200)

class FriendApi(Resource):
    @jwt_required()
    def put(self):
        user_id = get_jwt_identity()
        user = User.objects.get(email=user_id)
        body = request.get_json(force=True)
        friend = body.get('friends')
        user.friends.append(friend)
        user.save()
        user.reload()
        return Response(user.to_json(), mimetype="application/json", status=200)

    @jwt_required()
    def delete(self):
        user_id = get_jwt_identity()
        user = User.objects.get(email=user_id)
        body = request.get_json(force=True)
        friend = body.get('friends')
        user.update(pull__friends=friend)
        user.save()
        user.reload()
        return Response(user.to_json(), mimetype="application/json", status=200)

    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user = User.objects.get(email=user_id)
        return Response(user.to_json(), mimetype="application/json", status=200)


class SignupApi(Resource):
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
        # set_access_cookies(response, access_token)
        response.set_cookie(user.email, access_token)
        return response


class LogoutApi(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        response = jsonify({"msg": "logout successful"})
        response.delete_cookie(user_id)
        return response
