from db import db
from flask_bcrypt import generate_password_hash, check_password_hash
from .product import *
from .list import *

class User(db.Document):
    name = db.StringField(required=True, unique=True)
    email = db.EmailField(required=True, unique=True, min_length=6)
    password = db.StringField(required=True, min_length=6)
    list_of_products = db.ListField(db.ReferenceField('List', reverse_delete_rule=db.PULL))

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)

# This line creates anoter delete rule where if a user is deleted,
# then the products listed by the user is also deleted.
User.register_delete_rule(Product, 'added_by', db.CASCADE)
User.register_delete_rule(List, 'added_by', db.CASCADE)
