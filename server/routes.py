from flask import request, Response, make_response, jsonify
from flask_restful import Resource, Api
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models.user import User
from models.product import Product
from models.list import List
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

# Creating the empty list
class CreateProductsListApi(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        body = request.get_json()
        user = User.objects.get(username=user_id)
        list_of_products = List(**body, added_by=user)
        list_of_products.save()
        list_name = list_of_products.list_title
        user.update(push__list_of_products=list_of_products)
        user.save()
        return {'name': str(list_name)}, 201

# List of products
class ProductsListApi(Resource):
    @jwt_required()
    def get(self, list_title):
        user_id = get_jwt_identity()
        user = User.objects.get(username=user_id)
        list_of_products = List.objects.get(list_title=list_title, added_by=user).to_json()
        return Response(list_of_products, mimetype="application/json", status=200)
    
    @jwt_required()
    def delete(self,list_title):
        user_id = get_jwt_identity()
        user = User.objects.get(username=user_id)
        list_of_products = List.objects(list_title=list_title, added_by=user)
        list_of_products.delete()
        return 'Your list has been deleted.', 200

# Adding individual products to the list
class AddProductApi(Resource):
    @jwt_required()
    def post(self, list_title):
        user_id = get_jwt_identity()
        body = request.get_json()
        user = User.objects.get(username=user_id)
        user_list = List.objects.get(list_title=list_title, added_by=user)
        product = Product(**body, added_by=user)
        product.save()
        product_name = product.product_name
        user.update(push__products=product)
        user.save()
        user_list.update(push__products=product)
        user_list.save()
        return {'name': str(product_name)}, 201

# Individual products
class ProductApi(Resource):
    @jwt_required()
    def put(self, list_title, product_name):
        user_id = get_jwt_identity()
        user = User.objects.get(username=user_id)
        list_of_products = List.objects.get(list_title=list_title, added_by=user).to_json()
        product = Product.objects.get(product_name=product_name, added_by=user)
        body = request.get_json()
        product.update(**body)
        return 'Product has been updated.', 200

    @jwt_required()
    def delete(self,list_title, product_name):
        user_id = get_jwt_identity()
        user = User.objects.get(username=user_id)
        list_of_products = List.objects.get(list_title=list_title, added_by=user).to_json()
        product = Product.objects(product_name=product_name, added_by=user)
        product.delete()
        return 'Product has been deleted.', 200

    @jwt_required()
    def get(self, list_title, product_name):
        user_id = get_jwt_identity()
        user = User.objects.get(username=user_id)
        list_of_products = List.objects.get(list_title=list_title, added_by=user).to_json()
        product = Product.objects.get(product_name=product_name, added_by=user).to_json()
        return Response(product, mimetype="application/json", status=200)
        



