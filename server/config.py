import os

TEAM_NAME = os.environ['TEAM_NAME']

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'hi my name is nobody'

    MONGODB_HOST = "mongodb+srv://TeamBLT-Admin:jcPCzsMV2021HatchwaysTeamBLT@teambltcluster0.5hi8c.mongodb.net/test?retryWrites=true&w=majority"
