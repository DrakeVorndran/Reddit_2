const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')


router.get('/sign-up', (req, res) => {
    res.render('sign-up')
})

router.post('/sign-up', (req, res) => {
    const user = new User(req.body)
    user.save()
    .then(user => {
        let token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
        res.cookie("nToken", token, {maxAge: 900000, httpOnly: true})
        return res.redirect('/')
        
    }).catch(err => {
        console.log(err)
        return res.status(400).send({ err : err.message })
    })
})

router.get('/login', (req, res) => {
    res.render('login')
}) 

router.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    User.findOne({ username })
    .then(user => {
        if(!user) {
            return res.status(401).send({message: "User does not exist in our system"})
        }

        user.comparePassword(password, (err, isMatch) => {
            if(!isMatch) {
                return res.status(401).send({message: "Wrong password for username"})
            }

            let token = jwt.sign({_id: user._id}, process.env.SECRET, {expiresIn: "60 days"} )
            res.cookie("nToken", token, {maxAge: 900000, httpOnly: true})
            res.redirect('/')
        })
    }).catch(err => {
        console.log(err)
    })
})

router.get('/logout', (req, res) => {
    res.clearCookie('nToken')
    res.redirect('/')
})


module.exports = router
