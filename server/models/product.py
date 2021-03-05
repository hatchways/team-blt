from db import db
from .user import *

class Product(db.Document):
    product_name = db.StringField(required=True)
    url = db.StringField(required=True)
    price = db.FloatField(required=True)
    added_by = db.ReferenceField('User')
    in_list = db.ReferenceField('List')
