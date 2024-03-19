import { revertString } from "../utils/revertString"

function getFileExtension(filename: string) {
    const reversedExtension = revertString(filename).split(".")[0]
    return revertString(reversedExtension)
}

export { getFileExtension }