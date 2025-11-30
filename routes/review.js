const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync= require("../utils/warpAsync.js");
const ExpressError= require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {isLoggedIn ,validateReview} = require("../middleware.js");


//Reviews
router.post("/" ,isLoggedIn , validateReview,  wrapAsync(async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);
  
  await newReview.save();
  await listing.save();
  req.flash("sucess"," New Review Created!");
  
  res.redirect(`/listings/${listing._id}`);
  
  }));
  
  router.delete("/:reviewsId",wrapAsync(async(req,res)=>{
    let {id, reviewsId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews: reviewsId}})
    await Review.findByIdAndDelete(reviewsId);
    req.flash("sucess"," Review Deleted !");
    res.redirect(`/listings/${id}`);
  
  })
  );

  module.exports = router;