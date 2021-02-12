from flask import Flask, render_template, flash, redirect
from flask_mongoengine import MongoEngine
from flask_login import LoginManager, UserMixin, current_user, login_user, logout_user, login_required
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.fields.html5 import EmailField
from wtforms.validators import DataRequired, Length, EqualTo
from config import Config
from werkzeug.security import generate_password_hash, check_password_hash
from api.ping_handler import ping_handler
from api.home_handler import home_handler


app = Flask(__name__)
app.config.from_object(Config)

# Setup Flask-MongoEngine
db = MongoEngine(app)
login = LoginManager(app)

app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)

@login.user_loader
def load_user(id):
    return User.objects(username=id).first()

class User(db.Document, UserMixin):
    username = db.StringField(max_length=20)
    email = db.EmailField(max_length=60)
    password = db.StringField(max_length=20)
    password_hash = db.StringField(max_length=128)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<User {}>'.format(self.username)


class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Sign In')

class SignupForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), Length(min=3, max=20)])
    email = EmailField('Email', validators=[DataRequired(), Length(min=3, max=60)])
    password = PasswordField('Password', validators=[DataRequired(), Length(min=3, max=20), EqualTo('confirm', message='Passwords must match')])
    confirm = PasswordField('Confirm')
    submit = SubmitField('Submit')

    def validate_username(self, username):
        user = User.objects(username=username.data).first()
        if user is not None:
            raise ValidationError('Please use a different username.')

    def validate_email(self, email):
        user = User.objects(email=email.data).first()
        if user is not None:
            raise ValidationError('Please use a different email address.')


@app.route('/')
def index():
    return render_template('index.html', title='home')

@login_required
@app.route('/login', methods = ['GET','POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.objects(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            return redirect(url_for('login'))
        login_user(user)
        return redirect(url_for('index'))
    return render_template('login.html', title='Sign In', form=form)

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/signup', methods = ['GET','POST'])
def signup():
    form = SignupForm()
    if form.validate_on_submit():
        new_user = User(username=form.username.data, email=form.email.data)
        new_user.set_password(form.password.data)
        new_user.save()
    return render_template('signup.html', title='Sign Up', form=form)
