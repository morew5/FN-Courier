const router = require("express").Router();
const sqlite3 = require("sqlite3").verbose();
const { v4: uuidv4 } = require("uuid");

const db = new sqlite3.Database("./database.db");

function auth(req,res,next){
    if(!req.session.user) return res.redirect("/admin");
    next();
}

router.get("/",(req,res)=>{
    res.render("admin/login",{layout:false});
});

router.post("/",(req,res)=>{
    if(req.body.username==="admin" && req.body.password==="Agu12345$")
    {
        req.session.user=true;
        return res.redirect("/admin/dashboard");
    }
    res.redirect("/admin");
});

router.get("/dashboard",auth,(req,res)=>{
    db.all("SELECT * FROM parcels",(e,rows)=>{
        res.render("admin/dashboard",{rows});
    });
});

router.get("/add",auth,(req,res)=>{
    res.render("admin/add");
});

router.post("/add",auth,(req,res)=>{
    const tracking="FN"+uuidv4().slice(0,8);

    db.run(
        "INSERT INTO parcels(tracking,sender,receiver,amount,status) VALUES(?,?,?,?,?)",
        [tracking,req.body.sender,req.body.receiver,req.body.amount,"Processing"],
        ()=> res.redirect("/admin/dashboard")
    );
});

router.get("/receipt/:id",auth,(req,res)=>{
    db.get("SELECT * FROM parcels WHERE id=?",[req.params.id],
    (e,row)=> res.render("admin/receipt",{p:row}));
});

module.exports = router;
