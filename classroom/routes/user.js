const express = require("express");
const router = express.Router();


//user
router.get("/",(req,res)=>{
    res.send("user ");
});
router.get("/:id",(req,res)=>{
    res.send("user id");
});

router.post("/",(req,res)=>{
    res.send("user ");
});
router.delete("/:id",(req,res)=>{
    res.send("user ");
});


module.exports=router;