const express = require('express');
const tasksRoutes =  require('../routes/tasks.js');
const authRoutes = require("../routes/auth.js");

const router = express.Router();

router.use('/tasks',tasksRoutes);

module.exports = router;