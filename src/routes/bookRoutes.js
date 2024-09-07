const express = require('express');
const router = express.Router();
const { addBook, searchBooks, getBooksByRent, filterBooks } = require('../controllers/bookController');
const { protect } = require('../middlewares/authMidlleware');

router.post('/add-books', protect, addBook);
router.get('/search', protect, searchBooks);
router.get('/rent', protect, getBooksByRent);
router.get('/filter', protect, filterBooks);

module.exports = router;
