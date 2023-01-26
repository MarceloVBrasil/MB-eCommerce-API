const { revertString } = require("./revertString")

module.exports.getFileExtension = (filename) => {
    const reversedExtension = revertString(filename).split(".")[0]
    return revertString(reversedExtension)
}