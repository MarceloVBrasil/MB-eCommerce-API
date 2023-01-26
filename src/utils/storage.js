const multer = require("multer");
const { getFileExtension } = require("./getFileExtension")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/')
    },

    filename: function (req, file, cb) {
        const extension = getFileExtension(file.originalname)
        if (["jpg", "jpeg", "png", "webp"].includes(extension.toLowerCase())) {
            cb(null, `${file.originalname}`)
        }
    }
})


module.exports = storage