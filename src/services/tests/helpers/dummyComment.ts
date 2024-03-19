import { IComment } from "../../../models/Comment";
import { CommentFactory } from "../../factories/CommentFactory"
import { addDummyProduct } from "./dummyProduct"
import { addDummyUser } from "./dummyUser"

interface IGenerateDummyComment {
    addProduct?: boolean
    addUser?: boolean
}

const commentService = CommentFactory()

async function addDummyComment() {

    const comment: IComment = await generateDummyComment()

    return await commentService.add(comment)
}

async function generateDummyComment({ addProduct = true, addUser = true }: IGenerateDummyComment = {}): Promise<IComment> {
    const productId = await getProductId(addProduct!)
    const userId = await getUserId(addUser!)

    return {
        userId: userId,
        productId: productId,
        date: new Date(),
        message: `Dummy message - ${crypto.randomUUID()}`
    }
}

async function getProductId(addProduct: boolean): Promise<string> {
    if (!addProduct) return 'product id'

    const dummyProduct = await addDummyProduct()
    return dummyProduct.id!
}

async function getUserId(addUser: boolean): Promise<string> {
    if (!addUser) return 'user id'

    const dummyUser = await addDummyUser()
    return dummyUser.id!
}

export { addDummyComment, generateDummyComment }