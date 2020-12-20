const authRouter = require('./routers/auth')
const careerRouter = require('./routers/career')
const candidatureRouter = require('./routers/candidature')
const restourantRouter = require('./routers/restaurant')
const bookRouter = require('./routers/book')
const menuRouter = require('./routers/menu')
const productRouter = require('./routers/product')

module.exports = (app) => {
    app.use('/api/auth', authRouter)
    app.use('/api/career', careerRouter)
    app.use('/api/candidature', candidatureRouter)
    app.use('/api/restaurant', restourantRouter)
    app.use('/api/book', bookRouter)
    app.use('/api/menu', menuRouter);
    app.use('/api/product', productRouter)

    app.get('*', (req, res) => {
        res.status(404).send({
            message: 'Not Found!'
        })
    })
}