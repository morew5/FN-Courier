const router = require("express").Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

router.get("/", (req,res)=>{
    res.render("index");
});

router.get("/about",(req,res)=>{
    res.render("about");
});

router.get("/track",(req,res)=>{
    res.render("track",{parcel:null});
});

router.post("/track",(req,res)=>{
    db.get("SELECT * FROM parcels WHERE tracking=?",
    [req.body.tracking],
    (err,row)=>{
        res.render("track",{parcel:row});
    });
});

module.exports = router;
