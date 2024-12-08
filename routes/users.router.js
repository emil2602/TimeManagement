const express = require('express');
const {Router} = require("express");
const {getAllUsers, createUser, getUserById, updateUser, findActiveUsers, deleteUser, changeIsActiveStatus} = require("../controllers/user.controller");
const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/active', findActiveUsers);
router.patch('/:id/status', changeIsActiveStatus);

module.exports = router;