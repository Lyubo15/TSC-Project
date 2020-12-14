const candidatureErrorHandler = (req) => {
    const { aboutYou } = req.body

    let errors = {}

    if (!aboutYou) { errors['aboutYou'] = 'Description about you is required' }

    return errors
}

module.exports = {
    candidatureErrorHandler
}