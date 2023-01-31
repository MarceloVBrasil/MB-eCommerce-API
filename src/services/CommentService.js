const { CommentRepository } = require("../repositories/CommentRepository")
const { UserRepository } = require("../repositories/UserRepository")
const commentRepository = new CommentRepository()
const userRepository = new UserRepository()

class CommentService {
    constructor() { }
    
    static async getAll(productId) {
        const comments = await commentRepository.getAll(productId)
        const namedComments = comments.map((comment) => {
            const { name } = userRepository.getById(comment.userId)
            console.log(name)
            return  { ...comment, name }
        })
        
        return namedComments
    }

    static async add(productId, comment) {
        return await commentRepository.add(productId, comment)
    }
}

module.exports = { CommentService }