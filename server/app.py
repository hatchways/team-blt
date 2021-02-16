from flask import Flask, render_template, flash, redirect, url_for, request, Response, jsonify
from flask_mongoengine import MongoEngine
from flask_login import LoginManager, UserMixin, current_user, login_user, logout_user, login_required
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, ValidationError
from wtforms.fields.html5 import EmailField
from wtforms.validators import DataRequired, Length, EqualTo
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_restful import Resource, Api
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from api.ping_handler import ping_handler
from api.home_handler import home_handler
import datetime
import os

app = Flask(__name__)
app.config['MONGODB_HOST']=os.environ['MONGODB_HOST']
app.config['SECRET_KEY']=os.environ['SECRET_KEY']
app.config['JWT_SECRET_KEY'] = os.environ['JWT_SECRET_KEY']
app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)
api = Api(app)
db = MongoEngine(app)
jwt = JWTManager(app)
login = LoginManager(app)

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
    @jwt_required
    def put(self, username):
        body = request.get_json()
        User.objects.get(username=username).update(**body)
        return '', 200
    @jwt_required
    def delete(self, username):
        user = User.objects.get(username=username).delete()
        return '', 200

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
    @jwt_required
    def post(self):
        body = request.get_json()
        user = User.objects.get(username=body.get('username'))
        checked = user.check_password(body.get('password'))
        if not checked:
            return {'error': 'Email or password invalid'}, 401

        expires = datetime.timedelta(days=7)
        access_token = create_access_token(identity=str(user.username), expires_delta=expires)
        return {'token': access_token}, 201

def initialize_routes(api):
    api.add_resource(UsersApi, '/users')
    api.add_resource(UserApi, '/users/<username>')
    api.add_resource(SignupApi, '/signup')
    api.add_resource(LoginApi, '/login')

initialize_routes(api)

@login.user_loader
def load_user(id):
    return User.objects(username=id).first()

class User(db.Document, UserMixin):
    username = db.StringField(required=True, unique=True, min_length=6)
    email = db.EmailField(required=True, min_length=6)
    password = db.StringField(required=True, min_length=7)


    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)
