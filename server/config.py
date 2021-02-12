import os

TEAM_NAME = os.environ['TEAM_NAME']

class Config(object):
    SECRET_KEY = 'I am cool as superhero'
    MONGODB_HOST = "mongodb+srv://TeamBLT-Admin:jcPCzsMV2021HatchwaysTeamBLT@teambltcluster0.5hi8c.mongodb.net/test?retryWrites=true&w=majority"
