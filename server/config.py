import os

TEAM_NAME = os.environ['TEAM_NAME']

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'hi my name is nobody'
