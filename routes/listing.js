const express = require("express");
const router = express.Router();
const wrapAsync= require("../utils/warpAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn ,isOwner,validateListing  } = require("../middleware.js");
const listingcontroller = require("../controllers/listing.js")
const multer  = require('multer');
// const Joi = require("joi");
const {storage}= require("../cloudConfig.js")
const upload = multer({ storage })
// router.get("/",(req,res)=>{
//     res.send("working");
// });


router.route("/")
.get(wrapAsync(listingcontroller.index))
.post( isLoggedIn,
   upload.single('listing[image]'),
   validateListing,
   wrapAsync( listingcontroller.createListing));

//New route
router.get("/new", isLoggedIn ,listingcontroller.renderNewForm );

router.route("/:id")
.get( wrapAsync(listingcontroller.showListing ))
.put( isLoggedIn ,isOwner ,upload.single('listing[image]'),validateListing , wrapAsync(listingcontroller.updateListing))
.delete( isLoggedIn ,isOwner  , wrapAsync( listingcontroller.deleteListing));

//show route
// router.get("/:id",  wrapAsync(listingcontroller.showListing ));

   //edit Route 
   router.get("/:id/edit", isLoggedIn ,isOwner, wrapAsync( listingcontroller.renderEditForm));

//update Route
// router.put("/:id/", isLoggedIn ,isOwner ,validateListing , wrapAsync(listingcontroller.updateListing));
 
// delete route
// router.delete("/:id/", isLoggedIn ,isOwner  , wrapAsync( listingcontroller.deleteListing));

module.exports = router;