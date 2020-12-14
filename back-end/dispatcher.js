const authRouter = require('./routers/auth')
const careerRouter = require('./routers/career')
const candidatureRouter = require('./routers/candidature')

module.exports = (app) => {
    app.use('/api/auth', authRouter)
    app.use('/api/career', careerRouter)
    app.use('/api/candidature', candidatureRouter)

    app.get('*', (req, res) => {
        res.status(404).send({
            message: 'Not Found!'
        })
    })
}