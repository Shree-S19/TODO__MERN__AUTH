const express = require("express");
const {createTask,getAllTasks, getCurrentUserTasks,updateTask, deleteTask} = require('../controllers/task.js')

const router = express.Router();

router.post('/', createTask);
router.get('/all',getAllTasks);
router.get('/myTasks', getCurrentUserTasks);
router.put('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);

module.exports = router;
