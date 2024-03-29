from flask import request, Response, make_response, jsonify
from flask_restful import Resource, Api
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models.user import User
from models.product import Product
from models.list import List

'''
get_jwt_identity() returns the identity of the JWT that is accessing the endpoint.
In this case, get_jwt_identity() will return the user's email. In order to check
if the current use has access to specific enpoints such as the created lists and
products, the user's email will be compared to the returned result of get_jwt_identity().
Once the user object is retrieved, it is then referenced by the List and/or Product
model's "added_by" attribute.
'''
# List of products
class ProductsListApi(Resource):
    # Read the list of products
    @jwt_required()
    def get(self, list_title=None):
        try:
            user_id = get_jwt_identity()
            user = User.objects.get(email=user_id)
            # Retrieve one of the user's list based on the list title.
            if list_title:
                list_of_products = List.objects.get(list_title=list_title, added_by=user).to_json()
            # Retrieve all of the lists the user created
            else:
                list_of_products = List.objects(added_by=user).to_json()
            return Response(list_of_products, mimetype="application/json", status=200)
        except:
            return 'Unable to find the list.'

    # Updating a list of products' private/public toggle.
    @jwt_required()
    def put(self, list_title):
        user_id = get_jwt_identity()
        user = User.objects.get(email=user_id)
        # Retrieve the list the user is trying to edit
        list_of_products = List.objects.get(
            list_title=list_title, added_by=user)
        body = request.get_json()
        list_of_products.update(**body)
        new_list_of_products = List.objects(added_by=user).to_json()
        return Response(new_list_of_products, mimetype="application/json", status=200)

    # Create a new list of products
    @jwt_required()
    def post(self):
        try:
            user_id = get_jwt_identity()
            body = request.get_json()
            user = User.objects.get(email=user_id)
            list_of_products = List(**body, added_by=user)
            list_of_products.save()
            list_name = list_of_products.list_title
            user.update(push__list_of_products=list_of_products)
            user.save()
            return {'name': str(list_name)}, 201
        except:
            return 'Unable to create the list.'

    # Delete a list of products
    @jwt_required()
    def delete(self, list_title):
        try:
            user_id = get_jwt_identity()
            user = User.objects.get(email=user_id)
            list_of_products = List.objects.get(list_title=list_title, added_by=user)
            # Delete the products within the list
            product = Product.objects(added_by=user, in_list=list_of_products)
            product.delete()
            # Delete the list
            list_of_products.delete()
            new_list_of_products = List.objects(added_by=user).to_json()
            return Response(new_list_of_products, mimetype="application/json", status=200)
        except:
            return 'Unable to find your list.'

# Individual products
class ProductApi(Resource):
    # Add a product in an existing list of products
    @jwt_required()
    def post(self, list_title):
        try:
            user_id = get_jwt_identity()
            body = request.get_json()
            user = User.objects.get(email=user_id)
            user_list = List.objects.get(list_title=list_title, added_by=user)
            product = Product(**body, added_by=user, in_list=user_list)
            product.save()
            product_name = product.product_name
            user_list.update(push__products=product)
            user_list.save()
            # After updating the list of products, return the user's new list of products lists
            list_of_products = List.objects(added_by=user).to_json()
            return Response(list_of_products, mimetype="application/json", status=200)
        except:
            return 'Unable to add product to your list.'

    # Edit a product
    @jwt_required()
    def put(self, list_title, product_name):
        try:
            user_id = get_jwt_identity()
            user = User.objects.get(email=user_id)
            list_of_products = List.objects.get(list_title=list_title, added_by=user).to_json()
            product = Product.objects.get(product_name=product_name, added_by=user)
            body = request.get_json()
            product.update(**body)
            return 'Product has been updated.', 200
        except:
            return 'Unable to update your product.'

    # Delete a product from its list
    @jwt_required()
    def delete(self, list_title, id):
        user_id = get_jwt_identity()
        user = User.objects.get(email=user_id)
        list_of_products = List.objects.get(
            list_title=list_title, added_by=user)
        product = Product.objects.get(id=id, added_by=user, in_list=list_of_products)
        product.delete()
        new_list_of_products = List.objects(added_by=user).to_json()
        # Returning a new list of product lists for the client to update
        return Response(new_list_of_products, mimetype="application/json", status=200)

    # Read a product
    @jwt_required()
    def get(self, list_title, id=None):
        try:
            user_id = get_jwt_identity()
            user = User.objects.get(email=user_id)
            list_of_products = List.objects.get(
                list_title=list_title, added_by=user)
            # Retrieve one of the user's product based on the product name.
            if id:
                product = Product.objects.get(
                    id=id, added_by=user, in_list=list_of_products).to_json()
            # Retrieve all of the products in the user's specified list.
            else:
                product = Product.objects(added_by=user, in_list=list_of_products).to_json()
            return Response(product, mimetype="application/json", status=200)
        except:
            return 'Unable to find your product(s).'

# Looking at other user's lists
class OtherUserProductsListApi(Resource):
    # Read the public list of products
    @jwt_required()
    def get(self, id, list_title=None):
        try:
            user = User.objects.get(id=id)
            # Retrieve one of the user's list based on the list title.
            if list_title:
                list_of_products = List.objects.get(
                    list_title=list_title, added_by=user, private=False).to_json()
            # Retrieve all of the lists the user created
            else:
                list_of_products = List.objects(added_by=user, private=False).to_json()
            return Response(list_of_products, mimetype="application/json", status=200)
        except:
            return 'Unable to find the list.'

# Looking at other user's products
class OtherUserProductApi(Resource):
    # Read a product
    @jwt_required()
    def get(self, id, list_title):
        try:
            user = User.objects.get(id=id)
            list_of_products = List.objects.get(
                list_title=list_title, added_by=user)
            # Retrieve all of the products in the user's specified list.
            product = Product.objects(added_by=user, in_list=list_of_products).to_json()
            return Response(product, mimetype="application/json", status=200)
        except:
            return 'Unable to find the product(s).'
