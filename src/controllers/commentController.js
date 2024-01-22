const { v4: uuidV4 } = require("uuid");
const { CommentSchema } = require("./schemas/CommentSchema");
const { CommentService } = require("../services/CommentService");

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

class CommentController {
  constructor() { }

  static async getAll(req, res) {
    try {
      await CommentSchema.getAll().validate(req.params)
      const result = await CommentService.getAll(req.params.productId)
      res.json(result)
    } catch (error) {
      res.status(503).json({ message: error })
    }
  }

  static async add(req, res) {
    try {
      await CommentSchema.add().validate({ ...req.params, ...req.body })
      req.body.id = uuidV4()
      req.body.timestamp = Date.now()
      const result = await CommentService.add(req.params.productId, req.body)
      res.json(result)
    } catch (error) {
      res.status(503).json({ message: error })
    }
  }
}

module.exports = { CommentController }