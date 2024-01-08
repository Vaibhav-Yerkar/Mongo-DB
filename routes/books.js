const express = require('express');
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");

const {userModel,bookModel} = require("../models/index.js");
const { getAllBooks, getSingleBookById, getAllIssuedBooks, addNewBook, updateBookById, deleteBookById} = require('../controllers/books_controllers.js');

const router = express.Router();

/**
 * Route : /books
 * Method : GET
 * Description : Get all the books info 
 * Access : Public
 * Parameter : None
 */
router.get('/', getAllBooks);

/**
 * Route : /books
 * Method : POST
 * Description : Creating/Adding new Books
 * Access : Public
 * Parameter : None
 */
router.post('/', addNewBook);

/**
 * Route : /books/:id
 * Method : GET
 * Description : Get book's info via id
 * Access : Public
 * Parameter : Id
 */
router.get("/:id", getSingleBookById);

/**
 * Route : /books/:id
 * Method : PUT
 * Description : Updating Book via id
 * Access : Public
 * Parameter : Id
 */
router.put('/:id', updateBookById);

/**
 * Route : /books/:id
 * Method : DELETE
 * Description : Deleting Book via id
 * Access : Public
 * Parameter : Id
 */
router.delete('/:id', deleteBookById);

/**
 * Route : /books/issued
 * Method : GET
 * Description : Get all Issued Book info
 * Access : Public
 * Parameter : None
 */
router.get('/issued/info', getAllIssuedBooks);



module.exports = router;