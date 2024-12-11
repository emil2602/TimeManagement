const express = require('express');
const {Router} = require("express");
const {getAllUsers, createUser, getUserById, updateUser, findActiveUsers, deleteUser, changeIsActiveStatus, searchUsers,
    changeUserPassword
} = require("../controllers/user.controller");
const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/active', findActiveUsers);
router.patch('/:id/status', changeIsActiveStatus);
router.post('/search', searchUsers);
router.patch('/:id/password', changeUserPassword);

module.exports = router;