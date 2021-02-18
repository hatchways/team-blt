from db import db
from flask_bcrypt import generate_password_hash, check_password_hash

class User(db.Document):
    username = db.StringField(required=True, unique=True, min_length=6)
    email = db.EmailField(required=True, min_length=6)
    password = db.StringField(required=True, min_length=7)

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)
