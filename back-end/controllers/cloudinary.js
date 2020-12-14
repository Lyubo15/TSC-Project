const cloudinary = require('./cloudinary')

const uploads = (file) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                url: result.url,
                id: result.public_id
            })
        }, {
            resource_type: "auto"
        })
    })
}

module.exports = {
    uploads
}