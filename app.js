const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride= require("method-override");
const ejsMate= require("ejs-mate");
const session = require("express-session");
const flash = require('connect-flash');
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");

const listingsRouter = require("./routes/listing.js"); 
const reviewsRouter = require("./routes/review.js"); 
const userRouter = require("./routes/user.js"); 


app.set("view engine" , "ejs");
app.set("views" ,path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine( "ejs" , ejsMate); 
app.use(express.static(path.join(__dirname, "public")));

const sessionOption = session({
  secret: "mysecret",
  resave: false,
  saveUninitialized: true,
  cookie :{
    expire: Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true
  }
});

app.use(sessionOption);
app.use(flash());

main()
.then(()=>{
    console.log("Connected to DB")
})
.catch((err)=> console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Wanderlust');
}

app.use(passport.initialize());
app.use(passport.session());
passport.use( new localStrategy((User.authenticate()))); 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  res.locals.sucess=req.flash("sucess");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;
    next();
});

// app.get("/demouser" , async (req,res)=>{
//  let fakeUser =new User({
//   email:"student@gmail.com",
//   username:"student4"
//  });
//  let registerUser = await User.register(fakeUser,"helloworld");
//  res.send(registerUser);
// });



//Routes
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);


app.use((err,req,res,next)=>{
  let{statusCode=500,message="Something went wrong"}=err;
  // res.status(statusCode).send(message);
  res.render("./listings/error.ejs",{message})
})

app.listen(8080 ,()=>{
    console.log("Server is listening to port 8080 ");
})

