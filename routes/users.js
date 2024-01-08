const express = require('express');
const {users} = require("../data/users.json");

const {userModel,bookModel} = require("../models/index.js");
const {getAllUsers, getSingleUserById, addNewUser, updateUserById, deleteUserById, getUserSubscriptionDataById} = require('../controllers/users_controllers.js');

const router = express.Router();

/**
 * Route : /users
 * Method : GET
 * Description : Get all the users info 
 * Access : Public
 * Parameter : None
 */
router.get("/", getAllUsers);

/**
 * Route : /users/:id
 * Method : GET
 * Description : Get user's info via id
 * Access : Public
 * Parameter : Id
 */
router.get("/:id", getSingleUserById);

/**
 * Route : /users
 * Method : POST
 * Description : Creating new User
 * Access : Public
 * Parameter : None
 */
router.post('/', addNewUser);

/**
 * Route : /users/:id
 * Method : PUT
 * Description : Updating User via id
 * Access : Public
 * Parameter : Id
 */
router.put('/:id', updateUserById);

/**
 * Route : /users/:id
 * Method : DELETE
 * Description : deleting User via id
 * Access : Public
 * Parameter : Id
 */
router.delete('/:id', deleteUserById);

/**
 * Route : /users/subscription/:id
 * Method : GET
 * Description : Get User subscription details via id
 * Access : Public
 * Parameter : Id
 */
router.get('/subscription/:id', getUserSubscriptionDataById);

module.exports = router;