const express =require("express");
const app = express();
const users = require("./routes/user.js")
const posts = require("./routes/post.js")
const cookieParser=require("cookie-parser");
const session = require("express-session");
const path = require("path");
const { name } = require("ejs");
const flash = require('connect-flash');

app.set("view engine" , "ejs");
app.set("views" ,path.join(__dirname,"views"));

app.use(cookieParser("code"));

 app.use(flash());
const sessionOption = session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true
});

app.use(sessionOption);

app.use((req,res,next)=>{
  res.locals.sucessMsg=req.flash("sucess");
    res.locals.errorMsg=req.flash("error");
    next();
});

app.get("/register",(req,res)=>{
    let {name =`Unknown`}= req.query;
    if(name=='Unknown'){
        req.flash("error","User is not Register");
    }else{
         req.flash("sucess","User is Register");
    }
     req.session.name = name; 
    res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
    res.render("page.ejs", {name: req.session.name});
});

app.get("/", (req, res) => {
    if (req.session.count) {
        req.session.count++;
    } else {
        req.session.count = 1;
    }
    res.send(`You visited this page ${req.session.count} times`);
});


 app.get("/getcookies",(req,res)=>{
    res.cookie("greet","hello");
    res.send("send you cookies!")
 });

// app.get("/",(req,res)=>{
//     console.dir(req.cookies);
//     res.send("Hey, i am root");
// })
app.get("/getsignedcookie",(req,res)=>{
    res.cookie("made-in", "India" ,{signed:true});
    res.send("signed cookie sent");
});
app.get("/verify",(req,res)=>{
    console.log(req.signedCookies);
    res.send("verified");
});
app.get("/greet",(req,res)=>{
  let {name =`Unknown`}= req.cookies;
    res.send(`hey, ${name}`);
})


app.use("/user",users);
app.use("/post",posts);

app.listen(3000,()=>{
    console.log("Server is listenting on port 3000");
});