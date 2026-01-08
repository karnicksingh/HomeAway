const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync= require("../utils/warpAsync.js");
const passport= require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const usercontroller = require("../controllers/user.js")

router.route("/signup")
.get(usercontroller.renderSinupForm)
.post(wrapAsync(usercontroller.Sinup));

router.route("/login")
.get(usercontroller.renderLoginForm)
.post(saveRedirectUrl ,passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true}),usercontroller.Login);

router.get("/logout", usercontroller.logout);

module.exports = router; 