from flask import Flask, render_template, jsonify, request
from wtforms import Form, BooleanField, StringField, PasswordField, validators
from api.ping_handler import ping_handler
from api.home_handler import home_handler
from flask_pymongo import PyMongo


app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/myDatabase"
mongo = PyMongo(app)

app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)

@app.route('/')
def hello():
    return 'hello world'

class User:
    def __init__(self, name, email, password):
        self._id = ''
        self.name = name
        self.email = email
        self.password = password

    def export(self):
        return {
            "_id": "",
            "name": self.name,
            "email": self.email,
            "password": self.password
        }

class RegistrationForm(Form):
    name = StringField('Username', [validators.Length(min=6, max=20)])
    email = StringField('Email Address', [validators.Length(min=6, max=20)])
    password = PasswordField('New Password', [
        validators.DataRequired(),
        validators.EqualTo('confirm', message='Passwords must match')
    ])
    confirm = PasswordField('Repeat Password')

@app.route('/user/signup', methods=['GET', 'POST'])
def signup():
    form = RegistrationForm(request.form)
    if request.method == 'POST' and form.validate():
        user = User(form.name.data, form.email.data,
                    form.password.data)
        return user.export()
    return 'fail'
