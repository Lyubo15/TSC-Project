const userErrorHandler = require('../validations/user')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const saveUser = async (req, res) => {
    const errors = await userErrorHandler(req)

    if (JSON.stringify(errors) !== JSON.stringify({})) { return res.status(400).send(errors) }

    const { firstName, lastName, email, password, tel } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
   
    let user = undefined;
    try {
        if(await User.find().countDocuments() === 0){
             user = new User({ firstName, lastName, email, tel, password: hashedPassword, userRole: 'ADMIN' })
        } else {
             user = new User({ firstName, lastName, email, tel, password: hashedPassword, userRole: 'USER' })        
        }

        const userObject = await user.save()

        const token = getToken({
            userId: userObject.id,
            firstName: firstName,
            role: user.userRole,
        }, new Date().getTime() + 863940000)       
       
        return res.status(201).send({'accessToken': token, 'user': user});
    } catch (err) {
        errors['error'] = err
        return res.status(400).send(errors)
    }
}

const verifyUser = async (req, res) => {
    const { firstName, password } = req.body

    try {
        const user = await User.findOne({ firstName });  
        
        if (!user) { return res.status(400).send({ message: 'Username or password is wrong' }) }
        const status = await bcrypt.compare(password, user.password)

        if (status) {
            const token = getToken({
                userId: user.id,
                firstName: firstName,
                role: user.userRole,
            }, new Date().getTime() + 863940000)

            return res.status(201).send({'accessToken': token, message: 'Successfully logged!' })
        }
    } catch (err) {
        return res.status(400).send({ message: 'Username or password is wrong' })
    }
}

const isUserExists = async (id) => {
    const user = await User.findById(id);
    return user === null ? false : true;
}

const getCurrentUser = async (req, res) => {
    const token = req.headers['x-access-token']
    return jwt.verify(token, process.env.PRIVATE_KEY,(err, user) => {
        return res.status(200).send(user);
    })
}

const getUserById = async (id) => {
    const user = await User.findById(id);
    return user
}

const getToken = (data, expire) => {
    return jwt.sign(
        data,
        process.env.PRIVATE_KEY,
        { expiresIn: Number(expire) }
    );
}

module.exports = {
    saveUser,
    verifyUser,
    getUserById,
    getCurrentUser,
    isUserExists
};