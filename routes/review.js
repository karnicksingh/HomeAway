const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync= require("../utils/warpAsync.js");
const ExpressError= require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {isLoggedIn ,validateReview} = require("../middleware.js");
const reviewcontroller = require("../controllers/review.js")


//Reviews
router.post("/" ,isLoggedIn , validateReview,  wrapAsync(reviewcontroller.createReview));
  
router.delete("/:reviewsId",wrapAsync(reviewcontroller.deleteReview));

  module.exports = router;