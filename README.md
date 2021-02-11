# flask-starter

## Starting the server:


1. Open a terminal and go to the server folder. Make sure you have **pipenv** installed (`pip install pipenv`)
2. Install the dependencies with `pipenv install`. This also createa a virtual environment, if there isn't one already
3. In order to run db locally, make sure you go to the server/.env file and replace the value of the MONGODB_PWD key with the actual password provided on Slack
4. Activate the virtual environment and start the app with `pipenv run flask run`

