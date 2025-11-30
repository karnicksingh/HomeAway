const express = require("express");
const router = express.Router();
const wrapAsync= require("../utils/warpAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn ,isOwner,validateListing  } = require("../middleware.js");

// router.get("/",(req,res)=>{
//     res.send("working");
// });

//index route
router.get("/", wrapAsync( async( req,res)=>{
const allListings =  await Listing.find({});
res.render("./listings/index.ejs",{allListings});
}));

//New route
router.get("/new", isLoggedIn ,(req,res)=>{
   res.render("./listings/new.ejs");
   });

//show route
router.get("/:id",  wrapAsync(async(req,res)=>{
 let {id} = req.params;
const listing =  await Listing.findById(id).populate("reviews").populate("owner"); 
if(!listing){
  req.flash("error","Listing you requested is not existed !");
  res.redirect("/listings");
};
res.render("./listings/show.ejs",{listing});
}));

// create route
router.post("/",  isLoggedIn ,validateListing ,wrapAsync( async(req,res,next)=>{
    const newListing = new Listing(req.body.listing);
    newListing.owner =req.user._id;
    await newListing.save()
    req.flash("sucess","New listing Created");
   res.redirect("/listings");
}));

   //edit Route
   router.get("/:id/edit", isLoggedIn ,isOwner, wrapAsync( async(req,res)=>{
 let {id} = req.params;
const listing =  await Listing.findById(id); 
res.render("./listings/edit.ejs",{listing});
}));


//update Route
router.put("/:id/", isLoggedIn ,isOwner ,validateListing , wrapAsync( async(req,res)=>{
  let {id} = req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing}); 
  req.flash("sucess","Listing Updated !");
 res.redirect(`/listings/${id}`);
}));
 
// delete route
router.delete("/:id/", isLoggedIn ,isOwner  , wrapAsync( async(req,res)=>{ 
  let {id} = req.params;
 await Listing.findByIdAndDelete(id); 
 req.flash("sucess","Listing Deleted !");
 res.redirect("/listings");
}));

module.exports = router;