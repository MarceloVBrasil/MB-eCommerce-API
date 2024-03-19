import { IComment } from "../../models/Comment";
import { ICommentRepository } from "../interfaces/ICommentRepository";
import { INamedComment } from "../interfaces/view models/INamedComment";
import { assignAuthorNameForComment } from "./helpers/CommentHelper";

export class InMemoryCommentRepository implements ICommentRepository {
    private _comments: IComment[];
    constructor() {
        this._comments = []
    }

    async getAll(productId: string): Promise<INamedComment[]> {
        const comments = this._comments.filter(comment => comment.productId === productId).sort((commentA, commentB) => { return commentB.date.getTime() - commentA.date.getTime() });
        const namedComments = await assignAuthorNameForComment(comments)

        return namedComments
    }

    async add(comment: IComment): Promise<IComment> {
        comment.id = crypto.randomUUID()
        this._comments.push(comment)

        return comment
    }
}