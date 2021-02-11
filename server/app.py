from flask import Flask, render_template, jsonify, request
from wtforms import Form, BooleanField, StringField, PasswordField, validators
from api.ping_handler import ping_handler
from api.home_handler import home_handler
from flask_pymongo import PyMongo


app = Flask(__name__)
app.config["MONGO_URI"] = 'abc'
mongo = PyMongo(app)

app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)

@app.route('/')
def index():
    return '''
        <form method="POST", action="/user/signup", enctype="multipart/form-data">
            <input type="text" name="Username">
            <input type="text" name="Email">
            <input type="text" name="Password">
            <input type="text" name="Confirm Password">
            <input type="submit">
        </form>
    '''

class User:
    def __init__(self, name, email, password):
        self._id = ''
        self.name = name
        self.email = email
        self.password = password
        self.encrypted_password = hash(password)
        self.is_login = True

    def export(self):
        return {
            "_id": "",
            "name": self.name,
            "email": self.email,
            "encrypted_password": self.encrypted_password,
        }

    def validate(self):
        if len(str(self.name)) < 6:
            return False
        if len(str(self.email)) < 6:
            return False
        if len(str(self.password)) < 6:
            return False
        return True


@app.route('/user/signup', methods=['POST'])
def signup():
    user = User(request.form.get("Username"), request.form.get("Email"),
                request.form.get("Password"))
    if user.validate():
        mongo.db.users.insert_one(user.export())
        return user.export()
    return 'invalid user!'

@app.route('/login', methods=['POST'])
def login():
    return'''
        <form method="POST", action="/user/signup", enctype="multipart/form-data">
            <input type="text" name="Username1">
            <input type="text" name="Password1">
            <input type="submit">
        </form>
    '''

@app.route('/login1', methods=['GET','POST'])
def login_status():
    '''if db finds user, return success'''
