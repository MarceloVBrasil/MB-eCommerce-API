import { IComment } from "../../../models/Comment";
import { UserFactory } from "../../../services/factories/UserFactory";
import { INamedComment } from "../../interfaces/view models/INamedComment";

async function assignAuthorNameForComment(comments: IComment[]): Promise<INamedComment[]> {
    const userService = UserFactory()

    return await Promise.all(comments.map(async comment => {
        const user = await userService.getById(comment.userId)
        return { ...comment, id: comment.id!, name: user.name }
    }))
}

export { assignAuthorNameForComment }