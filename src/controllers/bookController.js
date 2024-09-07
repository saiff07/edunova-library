const Book = require('../models/book');



// Create a new book
exports.addBook = async (req, res) => {
    try {
        const { name, category, rentPerDay } = req.body;

        // Create a new Book instance
        const newBook = new Book({
            name,
            category,
            rentPerDay,
        });

        // Save the new book to the database
        await newBook.save();

        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add book' });
    }
};


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

