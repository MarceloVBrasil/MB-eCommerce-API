import { IComment } from "../models/Comment"
import { ICommentRepository } from "../repositories/interfaces/ICommentRepository"
import { UserFactory } from "./factories/UserFactory"
import { ProductFactory } from "./factories/ProductFactory"

export class CommentService {
    constructor(private commentRepository: ICommentRepository) { }

    async getAll(productId: string) {
        const productService = ProductFactory()

        const doesProductExist = await productService.getById(productId)
        if (!doesProductExist) throw new Error('Product does not exist')

        return await this.commentRepository.getAll(productId)
    }

    async add(comment: IComment) {
        const productService = ProductFactory()
        const userService = UserFactory()

        const doesProductExist = await productService.getById(comment.productId)
        if (!doesProductExist) throw new Error('Product does not exist')

        const doesUserExist = await userService.getById(comment.userId)
        if (!doesUserExist) throw new Error('User does not exist')

        return await this.commentRepository.add(comment)
    }
}