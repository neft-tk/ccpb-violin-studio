const express = require('express');
const router = express.Router();
const {User, Note} = require('../models');

router.get("/",(req,res)=>{

        res.render("home",{
            logged_in:req.session.logged_in
        })
})

router.get("/sessions",(req,res)=>{
    res.json(req.session)
})

router.get("/users/:id",(req,res)=>{
    User.findByPk(req.params.id,{
        include:[Note]
    }).then(user=>{
        const userHbsData = user.get({plain:true});
        console.log(user);
        console.log("==============")
        console.log(userHbsData)
        userHbsData.logged_in=req.session.logged_in
        res.render(userHbsData)
    })
})

router.get("/login",(req,res)=>{
    if(req.session.logged_in){
        return res.redirect("/profile")
    }
    res.render("login")
})

router.get("/profile",(req,res)=>{
    if(!req.session.logged_in){
        return res.redirect("/login")
    }
    User.findByPk(req.session.user_id,{
        include:{
            model: Dev,
            include: Move,
        },
    }).then(userData=>{
        const hbsData = userData.toJSON();
        console.log(hbsData)
        hbsData.logged_in=req.session.logged_in
        res.render("profile",hbsData)
    })
})

module.exports = router;