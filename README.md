# Growindigo App

## Introduction :

Growindigo App is simple web application where user can sign up using Name, email and mobile number where email and name are unique. If user try to sign up using duplicate email and mobile number it will show error. User can log in using email and password. When user log in and sign up then user need to put otp if user put wrong otp it will throw an error, when user put correct otp then user can successfully sign up and login.

## End point

### /optgenerate

This end point for generating a new opt and send those opt to user's provide mobile number.

### /signupOTPMatch

This end point for match the user provide opt with system generated otp for a particular mobile number during signup.

### /loginOTPMatch

This end point for match the user provide opt with system generated otp for a particular mobile number during login.

## dependency:

-  > "cors": "^2.8.5",
-  > "express": "^4.17.1",
-  > "mongoose": "^5.11.14",
-  > "nodemon": "^2.0.7",
-  > "sendotp": "^1.2.9",
-  > "unirest": "^0.6.0"

## SendOtp - Node.js SDK

This SDK enables sendOTP and allows you to send OTP

1. Set-up:
2. Download the NPM module

-  > npm install sendotp --save

3. Require the package in your code.

-  const SendOtp = require('sendotp');

4. Initialize with your MSG91 auth key

-  const sendOtp = new SendOtp('AuthKey');

5. **That's all, your SDK is set up!**

### Requests

You now have the send, retry and verify otp via following methods.

-  > sendOtp.send(contactNumber, senderId, otp, callback);
   > `//otp is optional if not sent it'll be generated automatically`
-  > sendOtp.retry(contactNumber, retryVoice, callback);
-  > sendOtp.verify(contactNumber, otpToVerify, callback);

## how to run locally

1. open vscode new window and open a new folder
2. clone git repo. in new folder . follow the following command to clone the repo.
3. -  > git clone https://github.com/rambhajansonti/Growindigo-backend
4. now you can see a new folder named **Growindigo-backend**.
5. Open obove folder and run the following command in terminal.
6. -  > npm install
7. above command install all dependency locally.
8. now run the following command to start the backend of application.
9. -  > npm start

## Prerequisite:

-  Nodejs
-  mongodb

##

[Project Link](https://github.com/rambhajansonti/Growindigo-backend)
