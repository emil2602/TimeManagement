const express = require('express');
const {Router} = require("express");
const {createTask, getTaskById, updateTask, deleteTask, getTasksList} = require("../controllers/task.controller");
const router = express.Router();

router.post("/", createTask);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete('/:id', deleteTask);
router.post('/all', getTasksList);

module.exports = router;