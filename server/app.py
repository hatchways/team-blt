from flask import Flask
from dotenv import load_dotenv
load_dotenv()
import os
import pymongo
import dns
from api.ping_handler import ping_handler
from api.home_handler import home_handler

app = Flask(__name__)

####### Added by Philippe ######### start
######### DB SETUP ######################
try:
  # client = pymongo.MongoClient("mongodb+srv://TeamBLT-Admin:<password>@teambltcluster0.5hi8c.mongodb.net/<dbname>?retryWrites=true&w=majority")
  client = pymongo.MongoClient(f"mongodb+srv://TeamBLT-Admin:{os.getenv('MONGODB_PWD')}@teambltcluster0.5hi8c.mongodb.net/TeamBLTCluster0?retryWrites=true&w=majority")
  db = client['test']
  col = db['item']
  print(client.list_database_names())
except Exception as ex:
  print("****** ERROR - Cannot connect to db ******")
  print(ex)
  print("******************************************")
################################### end




app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)
####### Added by Philippe ######### start
@app.route("/", methods=["GET"])
def index():
  return f"{os.getenv('TEST_ENV')}... App is running..."

if __name__ == "__main__":
  app.run(port=5000, debug=True)

################################### end