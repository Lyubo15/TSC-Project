const schedule = require('node-schedule');

const { getAllBooks, deleteBookById } = require('../controllers/book')

module.exports = schedule.scheduleJob('0 0/1 * 1/1 * ? *', async () => {
    const books = await getAllBooks()
    const now = new Date()

    books.filter(async (book) => {
        const bookDate = new Date(book.date);
        const result = now.setMinutes(now.getMinutes() - bookDate.getMinutes())

        if(result >= 30){
            await deleteBookById(book._id);
        }
    })
});

