const express = require('express');
const {register,login,logout,isLoggedIn,OAuthRegister} = require("../controllers/auth.js");


const router = express.Router();

router.post('/register', register);
router.post('/google_oauth',OAuthRegister);
router.post('/login',login);
router.get('/logout',logout);
router.get('/is_logged_in',isLoggedIn);

module.exports = router;