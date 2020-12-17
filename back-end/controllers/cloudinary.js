const { cloudinary } = require('../utils/cloudinary');

const uploads = async (file, fileName) => {
   
    try {
        const urlResponse = await cloudinary.uploader.upload(file, {
            public_id: `TSC/${fileName}`,
            overwrite: true,    
            width: 480,
            height: 400,
        })

        return urlResponse;
    } catch(err) {
        return null;
    }
}

const destroy = async (fileName) => {

    try {
        await cloudinary.uploader.destroy(`TSC/${fileName}`)
        return true
    } catch (err) {
        return false;
    }
}

module.exports = {
    uploads,
    destroy
}