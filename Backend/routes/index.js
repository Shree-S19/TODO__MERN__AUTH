const express = require('express');
const tasksRoutes =  require('../routes/tasks.js');
const usersRoutes = require("../routes/users.js");
const authRoutes = require("../routes/auth.js");
const checkAuth = require('../utils/checkAuth.js');

const router = express.Router();

router.use('/auth',authRoutes);
router.use('/tasks',checkAuth,tasksRoutes);
router.use('/users',checkAuth,usersRoutes);

module.exports = router;