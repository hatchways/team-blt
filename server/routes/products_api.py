from flask import request, Response, make_response, jsonify
from flask_restful import Resource, Api
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models.user import User
from models.product import Product
from models.list import List


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
    def delete(self, list_title):
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
        