const express = require('express');
const router = express.Router();
const { issueBook, returnBook, getTransactionHistory, getBooksIssuedInDateRange, getAllTransactionHistory } = require('../controllers/transactionController');
const { protect } = require('../middlewares/authMidlleware');

// Issue a book
router.post('/issue', protect, issueBook);

// Return a book
router.post('/return', protect, returnBook);

// Get transaction history by book name
router.get('/history-book', protect, getTransactionHistory);

router.get('/history', getAllTransactionHistory);

// Get books issued in a date range
router.get('/daterange', protect, getBooksIssuedInDateRange);

module.exports = router;
