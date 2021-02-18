from db import db
from .user import *
from .product import *

class List(db.Document):
    list_title = db.StringField(required=True)
    cover_image_url = db.StringField()
    products = db.ListField(db.ReferenceField('Product', reverse_delete_rule=db.PULL))
    added_by = db.ReferenceField('User')