from flask import Flask
from db import initialize_db
from flask_restful import Api
from routes.user_api import UsersApi, UserApi, SignupApi, LoginApi, LogoutApi
from routes.products_api import ProductApi, ProductsListApi
from flask_jwt_extended import JWTManager
import os

app = Flask(__name__)
app.config['MONGODB_HOST']=os.environ['MONGODB_HOST']
app.config['SECRET_KEY']=os.environ['SECRET_KEY']
app.config['JWT_SECRET_KEY'] = os.environ['JWT_SECRET_KEY']
api = Api(app)
initialize_db(app)
jwt = JWTManager(app)

def initialize_routes(api):
    api.add_resource(UsersApi, '/users')
    api.add_resource(UserApi, '/users/<id>')
    api.add_resource(SignupApi, '/signup')
    api.add_resource(LoginApi, '/login')
    api.add_resource(LogoutApi, '/logout')
    api.add_resource(ProductsListApi, '/create-list', '/lists', '/lists/<list_title>')
    api.add_resource(ProductApi, '/lists/<list_title>/add-product', '/lists/<list_title>/products', '/lists/<list_title>/products/<product_name>')

initialize_routes(api)
