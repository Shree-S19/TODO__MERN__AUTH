const express = require("express");
const {getUserInfo, updateUser,getOAuthUserInfo} = require('../controllers/user.js');
const router = express.Router();

router.get('/me', getUserInfo);
router.get('/OAuthME',getOAuthUserInfo);
router.put('/me', updateUser);

module.exports = router;
