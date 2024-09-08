const { body, query } = require('express-validator');

// User validators
const userValidators = {
    registerUser: [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ],
    loginUser: [
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').notEmpty().withMessage('Password is required'),
    ]
};

// Book validators
const bookValidators = {
    addBook: [
        body('name').notEmpty().withMessage('Book name is required'),
        body('category').notEmpty().withMessage('Category is required'),
        body('rentPerDay').isFloat({ min: 1 }).withMessage('Rent per day must be at least 1'),
    ],
    searchBooks: [
        query('term').notEmpty().withMessage('Search term is required'),
    ],
    getBooksByRent: [
        query('minRent').isFloat({ min: 1 }).withMessage('Minimum rent must be at least 1'),
        query('maxRent').isFloat().withMessage('Maximum rent must be a valid number'),
    ],
    filterBooks: [
        query('category').optional(),
        query('term').optional(),
        query('minRent').optional().isFloat({ min: 1 }).withMessage('Minimum rent must be at least 1'),
        query('maxRent').optional().isFloat().withMessage('Maximum rent must be a valid number'),
    ]
};

// Transaction validators
const transactionValidators = {
    issueBook: [
        body('bookId').notEmpty().withMessage('Book ID is required'),
        body('userId').notEmpty().withMessage('User ID is required'),
    ],
    returnBook: [
        body('transactionId').notEmpty().withMessage('Transaction ID is required'),
        body('returnDate').isISO8601().withMessage('Valid return date is required'),
    ],
    getTransactionHistory: [
        query('bookName').optional().isString().withMessage('Book name must be a string'),
    ],
    getBooksIssuedInDateRange: [
        query('startDate').isISO8601().withMessage('Valid start date is required'),
        query('endDate').isISO8601().withMessage('Valid end date is required'),
    ]
};

module.exports = {
    userValidators,
    bookValidators,
    transactionValidators
};
