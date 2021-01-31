const express = require("express");
const SendOtp = require("sendotp");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(
   cors({
      credentials: true,
      origin: "http://localhost:3000",
   })
);
const authKey = "353071A6IUnHSnS6015bb5fP1";
const port = 9999;
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const connstr = "mongodb://localhost:27017/Growindigo";
const db = new mongoose.createConnection(connstr, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});
const otpUserSchema = new mongoose.Schema({
   mobile: Number,
   otp: Number,
});
const userSchema = new mongoose.Schema({
   name: String,
   mobile: Number,
   email: String,
});
const otpUser = db.model("otpUser", otpUserSchema);
const user = db.model("user", userSchema);
const sendOtp = new SendOtp(authKey);
app.post("/loginOTPMatch", async (req, res) => {
   const { mobile, otp, email } = req.body;
   const newMobile = 91 + mobile;
   const myuser = await otpUser.find({ mobile: newMobile });
   if (otp == myuser[0].otp) {
      console.log("otp is same");
      const exist = await user.find({ mobile: newMobile });
      console.log("my exist:", exist);
      if (exist.length > 0) {
         if (exist[0].email !== email) {
            res.status(401).send({ error: "user email does not exist" });
         } else {
            res.status(200).send({ success: "successfully login" });
         }
      } else {
         res.status(401).send({ error: "user does not exist" });
      }
   } else {
      console.log("otp is not same");
      res.status(401).send({ error: "otp don't match" });
   }
});
app.post("/signupOTPMatch", async (req, res) => {
   const { name, email, mobile, otp } = req.body;
   console.log("my mobile:", mobile);
   const newMobile = 91 + mobile;
   const myuser = await otpUser.find({ mobile: newMobile });
   console.log("my user:", myuser);
   if (myuser == [] || myuser == null || myuser == undefined || myuser == "") {
      res.status(401).send({ error: "invalid mobile number" });
   } else {
      if (otp == myuser[0].otp) {
         console.log("otp is same");
         const exist = await user.find({ mobile: newMobile });
         if (exist.length > 0) {
            res.status(401).send({ error: "mobile already exist" });
         } else {
            const newUser = new user({
               name,
               email,
               mobile: newMobile,
            });
            await newUser.save();
            res.status(201).send({ success: "saved" });
         }
      } else {
         console.log("otp is not same");
         res.status(401).send({ error: "otp don't match" });
      }
   }
});
app.post("/optgenerate", async (req, res) => {
   const uniqueOTP = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
   let { mobile } = req.body;
   mobile = 91 + mobile;
   console.log(uniqueOTP, mobile);
   //make sure your mobile do not register for DND otherwise
   //you will not get message check panel for message
   sendOtp.send(mobile, "ab2", uniqueOTP, function (error, data) {
      if (error) {
         console.log("error", error);
         // return error;
      } else {
         console.log("data ", data);
         // return data;
      }
   });
   const user = await otpUser.find({ mobile });
   let newUser = null;
   if (user.length > 0) {
      newUser = await otpUser.findOneAndUpdate({ mobile }, { otp: uniqueOTP });
      res.send(newUser);
   } else {
      newUser = otpUser({ mobile, otp: uniqueOTP });
      await newUser.save();
      res.send(newUser);
   }
});

app.listen(port, () => {
   console.log(`App is listening on port :  ${port}.... `);
});
