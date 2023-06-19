const express = require('express');
const {check, body} = require('express-validator')
const authController = require('../controllers/auth');
const User= require('../models/user')
const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post('/signup', 
check('email').isEmail()
.withMessage('Please enter valid email ! ')
.custom((value,{req}) =>{
    return User.findOne({email:value}).then(userDoc =>{
        if(userDoc){
            return Promise.reject(
                'Email already exists. Please enter a different email !'
            )
        }
    })
}),
body('password',
'Please! enter a password with only numbers and text and at least 5 charactor.')
.isLength({min: 5})
.isAlphanumeric(), 
body('confirmPassword')
.custom((value,{req})=>{
    if(value === req.boyd.password){
        throw new Error('Password did not match !')
    }
    return true;
}),authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
