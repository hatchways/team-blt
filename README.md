# Deals Mate
Have you ever wanted to buy an item from Amazon, but it was too expensive? Well you can't change the price, but with Deals Mate, you can keep track of when the item goes on sale! Deals Mate is an easy to use website where you, the user, can input an Amazon link of a product that you want to track and get notifications of when it goes on sale!

## Tech Stack
### Frontend
* React (Hooks)
* Material UI

### Backend
* Python (Flask)
* MongoEngine
* MongoDB
* Amazon AWS S3

## Setting Up the Database
The database used for this web app is MongoDB. A simple way to get started with MongoDB is to use MongoDB Atlas. A quick guide can be found here: https://docs.atlas.mongodb.com/getting-started/

## Starting the Server
1. Open a terminal and go to the server folder. Make sure you have **pipenv** installed (`pip install pipenv`)
2. Install the dependencies with `pipenv install`. This also createa a virtual environment, if there isn't one already
3. In order to run db locally, make sure you go to the server/.env file and have the following key, value pairs in the .env file:

`FLASK_ENV="development"`<br>
`SECRET_KEY = "Make up a secret key."`<br>
`MONGODB_HOST = "The MongoDB server URL given to you by MongoDB after you create a database."`<br>
`JWT_SECRET_KEY = "Make up a JWT secret key"`

4. Activate the virtual environment and start the app with `pipenv run flask run`

## Setting up AWS S3
In order to upload images to your profile and/or images to the products list you are creating, you must create an AWS account and create a S3 bucket. This is a simple guide to creating an AWS S3 bucket https://medium.com/@rachid1982fsb/upload-images-on-a-react-app-to-aws-s3-bucket-3f3114a683f1

## Starting the Client
1. Open a terminal and go the client folder. 
2. Install the dependencies using `npm install` or `yarn install`.
3. In order to utilize Amazon's AWS S3 service for uploading images for your profile image and/or list image, make sure to go to the client/.env file and have the following key, value pairs in the .env file:

`REACT_APP_BUCKET_NAME=Your bucket name`<br>
`REACT_APP_REGION=Your chosen region`<br>
`REACT_APP_ACCESS_ID=Your access ID`<br>
`REACT_APP_ACCESS_KEY=Your access key`<br>

4. Start the App using `npm start` or `yarn start`.


