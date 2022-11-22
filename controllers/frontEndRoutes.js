const express = require('express');
const router = express.Router();
const {User, Note} = require('../models');

router.get("/",(req,res)=>{
    if(!req.session.logged_in){
        return res.redirect("/login")
    }
    User.findByPk(req.session.user_id, {
        include: [Note],
    }).then(userData => {
        const hbsData = userData.toJSON();
        console.log(hbsData)
        hbsData.logged_in=req.session.logged_in
        res.render("home", hbsData)
    })
})

router.get("/sessions",(req,res)=>{
    res.json(req.session)
})


router.get("/login",(req,res)=>{
    if(req.session.logged_in){
        return res.redirect("/profile")
    }
    res.render("login")
})

router.get("/newNotes",(req,res)=>{
    if(!req.session.logged_in){
        return res.redirect("/login")
    }
    User.findByPk(req.session.user_id, {
        include: [Note],
    }).then(userData => {
        const hbsData = userData.toJSON();
        console.log(hbsData)
        hbsData.logged_in=req.session.logged_in
        res.render("newNotes", hbsData)
    })
})

router.get("/lessonNotes",(req,res)=>{
    if(!req.session.logged_in){
        return res.redirect("/login")
    }
    User.findByPk(req.session.user_id, {
        include: [Note],
    }).then(userData => {
        const hbsData = userData.toJSON();
        console.log(hbsData)
        hbsData.logged_in=req.session.logged_in
        res.render("lessonNotes", hbsData)
    })
})

router.get("/profile",(req,res)=>{
    if(!req.session.logged_in){
        return res.redirect("/login")
    }
    User.findByPk(req.session.user_id,{
        include:[Note],
    }).then(userData=>{
        const hbsData = userData.toJSON();
        console.log(hbsData)
        hbsData.logged_in=req.session.logged_in
        res.render("profile",hbsData)
    })
})

module.exports = router;