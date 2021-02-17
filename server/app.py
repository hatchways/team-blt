from flask import Flask
from db import initialize_db
from flask_restful import Api
from routes import UsersApi, UserApi, SignupApi, LoginApi
from flask_jwt_extended import JWTManager
from api.ping_handler import ping_handler
from api.home_handler import home_handler
import os

app = Flask(__name__)
app.config['MONGODB_HOST']=os.environ['MONGODB_HOST']
app.config['SECRET_KEY']=os.environ['SECRET_KEY']
app.config['JWT_SECRET_KEY'] = os.environ['JWT_SECRET_KEY']
app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)
api = Api(app)
initialize_db(app)
jwt = JWTManager(app)

def initialize_routes(api):
    api.add_resource(UsersApi, '/users')
    api.add_resource(UserApi, '/users/<username>')
    api.add_resource(SignupApi, '/signup')
    api.add_resource(LoginApi, '/login')

initialize_routes(api)
