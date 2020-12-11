module.exports = careerErrorHandler = async (req) => {
    const { title, description } = req.body

    let errors = {}

    if (!title) { errors['title'] = 'Title is required' }
    if (title.length > 50) { errors['title'] = 'Title can not be more than 50 characters' }

    if (!description) { errors['description'] = 'Description is required' }

    return errors
}