const { bookErrorHandler } = require('../validations/book')
const { getRestaurantByName } = require('./restaurant')

const Book = require('../models/book')

const makeABook = async (req, res) => {
    const errors = await bookErrorHandler(req)

    if (JSON.stringify(errors) !== JSON.stringify({})) {
        return res.status(400).send({"error": errors})
    }

    const { count, date, hour, restaurant } = req.body

    try {
        const restaurantId = await getRestaurantByName(restaurant)
        const book = new Book({ date, 'countOfPeople': Number(count), hour, 'restaurant': restaurantId })
        const bookObject = await book.save();
        return res.status(201).send(bookObject)
    } catch(err) {
        errors['error'] = err
        return res.status(400).send({"error": errors});
    }
}

const getAllBooks = async () => {
    return await Book.find();
}

const deleteBookById = async (id) => {
    await Book.findByIdAndDelete(id);
}

module.exports = {
    makeABook,
    getAllBooks,
    deleteBookById
}