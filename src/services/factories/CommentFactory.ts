import { InMemoryCommentRepository } from "../../repositories/inMemory/inMemoryCommentRepository";
import { CommentService } from "../CommentService";

const { TEST_ENVIRONMENT } = process.env

let commentService: CommentService | null = null

export function CommentFactory() {
    if (!commentService && TEST_ENVIRONMENT) {
        commentService = new CommentService(new InMemoryCommentRepository())
    }

    else if (!commentService) {
        commentService = new CommentService(new InMemoryCommentRepository())
    }

    return commentService
}