const { validationResult } = require('express-validator');
const { bookValidators } = require('../validators/validators');
const Book = require('../models/book');

// Add a new book
exports.addBook = [
    bookValidators.addBook,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, category, rentPerDay } = req.body;
            const newBook = new Book({ name, category, rentPerDay });
            await newBook.save();

            res.status(201).json(newBook);
        } catch (error) {
            res.status(500).json({ error: 'Failed to add book' });
        }
    }
];



// Search books by term
exports.searchBooks = async (req, res) => {
    try {
        const { term } = req.query;
        const books = await Book.find({ name: { $regex: term, $options: 'i' } });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: 'Book search failed' });
    }
};

// Get books by rent price range
exports.getBooksByRent = async (req, res) => {
    try {
        const { minRent, maxRent } = req.query;
        const books = await Book.find({ rentPerDay: { $gte: minRent, $lte: maxRent } });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: 'Book search by rent failed' });
    }
};

// Get books by filter
exports.filterBooks = async (req, res) => {
    try {
        const { category, term, minRent, maxRent } = req.query;

        // Build query object dynamically
        const query = {};

        if (category) {
            query.category = category;
        }

        if (term) {
            query.name = { $regex: term, $options: 'i' };
        }

        if (minRent,maxRent) {
            query.rentPerDay = { $gte: minRent, $lte: maxRent};
          
            
        }

        // Perform search
        const books = await Book.find(query);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: 'Book filtering failed' });
    }
};

//list all books
exports.listAllBooks = async (req, res) =>  {
    try {
        const book = await Book.find();
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: 'Fetching books detail failed' });
    }
};