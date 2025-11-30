
const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("Post");
});
router.get("/:id",(req,res)=>{
    res.send("post Id ");
});

router.post("/",(req,res)=>{
    res.send("Post");
});

router.delete("/:id",(req,res)=>{
    res.send("Post");
});

module.exports=router;
