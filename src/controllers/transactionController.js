const Transaction = require('../models/transaction');
const Book = require('../models/book');
const User = require('../models/user');

// Issue a book
exports.issueBook = async (req, res) => {
    const { bookId, userId } = req.body;

    try {
        const user = await User.findById(userId);
        const book = await Book.findById(bookId);

        if (!user || !book) {
            return res.status(404).json({ message: 'User or Book not found' });
        }

        const transaction = new Transaction({
            user: userId,
            book: bookId,
            issueDate: Date.now()
        });

        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Failed to issue the book', error });
    }
};

// Return a book
exports.returnBook = async (req, res) => {
    const { transactionId, returnDate } = req.body;

    try {
        const transaction = await Transaction.findById(transactionId).populate('book');

        if (!transaction || transaction.isReturned) {
            return res.status(404).json({ message: 'Transaction not found or book already returned' });
        }

        // Calculate rent based on issue and return date
        const daysRented = Math.ceil((new Date(returnDate) - transaction.issueDate) / (1000 * 60 * 60 * 24));
        const rentPaid = daysRented * transaction.book.rentPerDay;

        transaction.returnDate = returnDate;
        transaction.isReturned = true;
        transaction.rentPaid = rentPaid;

        await transaction.save();

        res.status(200).json({ message: 'Book returned successfully', transaction });
    } catch (error) {
        res.status(500).json({ message: 'Failed to return the book', error });
    }
};

// Get transaction history by book name
exports.getTransactionHistory = async (req, res) => {
    const { bookName } = req.query;

    try {
        const transactions = await Transaction.find()
            .populate({
                path: 'book',
                match: { name: { $regex: bookName, $options: 'i' } }
            })
            .populate('user');

        const filteredTransactions = transactions.filter(transaction => transaction.book !== null);

        res.status(200).json(filteredTransactions);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get transaction history', error });
    }
};

// Get books issued within a date range
exports.getBooksIssuedInDateRange = async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
        const transactions = await Transaction.find({
            issueDate: { $gte: new Date(startDate), $lte: new Date(endDate) }
        }).populate('book user');

        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch books issued in the date range', error });
    }
};
