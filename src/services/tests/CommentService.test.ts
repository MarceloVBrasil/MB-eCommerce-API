import { describe, test, expect } from "@jest/globals"

import { CommentFactory } from "../factories/CommentFactory";
import { addDummyComment, generateDummyComment } from "./helpers/dummyComment";

const commentService = CommentFactory()

describe("Comment Service", () => {
    describe("get all comments", () => {
        describe("success", () => {
            test("get all comments method must be defined", () => {
                expect(commentService.getAll).toBeDefined()
            })

            test("get all comments successfully", async () => {

                const dummyComment = await addDummyComment()

                const comments = await commentService.getAll(dummyComment.productId)

                expect(comments).toHaveLength(1)

                expect(comments[0]).toHaveProperty('id')
                expect(comments[0]).toHaveProperty('productId')
                expect(comments[0]).toHaveProperty('message')
                expect(comments[0]).toHaveProperty('date')
                expect(comments[0]).toHaveProperty('userId')
                expect(comments[0]).toHaveProperty('name')
            })
        })

        describe("fail", () => {
            test("fail to get all comments | invalid product id", () => {
                const productId = crypto.randomUUID()

                const promise = commentService.getAll(productId)

                expect(promise).rejects.toThrow(new Error('Product does not exist'))
            })
        })
    })

    describe("add", () => {
        describe("success", () => {
            test("add method must be defined", () => {
                expect(commentService.add).toBeDefined()
            })

            test("add a comment successfully", async () => {

                const dummyComment = await addDummyComment()

                expect(dummyComment).toHaveProperty('id')
                expect(dummyComment).toHaveProperty('userId')
                expect(dummyComment).toHaveProperty('productId')
                expect(dummyComment).toHaveProperty('message')
                expect(dummyComment).toHaveProperty('date')
            })
        })

        describe("fail", () => {
            test("fail to add comment | invalid product id", async () => {
                const dummyComment = await generateDummyComment({ addProduct: false })

                const promise = commentService.add(dummyComment)

                expect(promise).rejects.toThrow(new Error('Product does not exist'))
            })

            test("fail to add comment | invalid user id", async () => {
                const dummyComment = await generateDummyComment({ addUser: false })

                const promise = commentService.add(dummyComment)

                expect(promise).rejects.toThrow(new Error('User does not exist'))
            })
        })
    })
})