import { IComment } from "../../models/Comment"
import { INamedComment } from "./views/INamedComment"

export interface ICommentRepository {
    getAll(productId: string): Promise<INamedComment[]>
    add(data: IComment): Promise<IComment>
}