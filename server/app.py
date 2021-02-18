from flask import Flask
from db import initialize_db
from flask_restful import Api
from api.user_api import UsersApi, UserApi, SignupApi, LoginApi
from api.products_api import ProductApi, ProductsListApi, CreateProductsListApi, AddProductApi
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
    api.add_resource(UserApi, '/users/<username>')
    api.add_resource(SignupApi, '/signup')
    api.add_resource(LoginApi, '/login')
    api.add_resource(CreateProductsListApi, '/create-list')
    api.add_resource(ProductsListApi, '/<list_title>')
    api.add_resource(AddProductApi, '/<list_title>/add-product')
    api.add_resource(ProductApi, '/<list_title>/<product_name>')

initialize_routes(api)
