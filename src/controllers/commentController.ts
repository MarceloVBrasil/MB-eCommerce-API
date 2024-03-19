import { Request, Response } from "express";
import { v4 as uuidV4 } from "uuid"
import { CommentSchema } from "./schemas/CommentSchema"
import { CommentFactory } from "../services/factories/CommentFactory";

const commentSchema = new CommentSchema()

// exports.getAll = async (req, res) => {
//     try {
//       const productId = req.params.productId
//     const data = await knex
//         .select("comment.id", "message", "user.name", "timestamp", "user.admin")
//       .from("comment")
//       .join("user", "user_id", "=", "user.id")
//         .where("product_id", productId)
//       .orderBy("timestamp", "desc")
//     res.json(data);
//   } catch (error) {
//     res.status(503).send("Error getting comments data");
//   }
// };

// exports.postComment = async (req, res) => {
//   try {
//     const { productId } = req.params
//     const { message, userId } = req.body
//     const commentId = uuidV4()

//     if(!productId || !userId || !message) return res.status(401).send("Please fill in all required fields")
//     await knex('comment').insert({ id: commentId, message, product_id: productId, user_id: userId, timestamp: Date.now() })
//     res.status(201).json(commentId)
//   } catch (error) {
//     res.status(401).send("Error posting comment")
//   }
// }

export class CommentController {
  constructor() { }

  async getAll(req: Request, res: Response) {
    try {
      const commentService = CommentFactory()

      await commentSchema.getAll().validate(req.params)
      const result = await commentService.getAll(req.params.productId)
      res.json(result)
    } catch (error) {
      res.status(503).json({ message: error })
    }
  }

  async add(req: Request, res: Response) {
    try {
      const commentService = CommentFactory()

      await commentSchema.add().validate({ ...req.params, ...req.body })
      req.body.id = uuidV4()
      req.body.timestamp = Date.now()
      const result = await commentService.add(req.body)
      res.json(result)
    } catch (error) {
      res.status(503).json({ message: error })
    }
  }
}