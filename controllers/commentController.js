const knex = require("knex")(require("../knexfile"));

exports.getAll = async (req, res) => {
    try {
      const productId = req.params.productId
    const data = await knex
        .select("comment.id", "message", "user.name", "timestamp")
      .from("comment")
      .join("user", "user_id", "=", "user.id")
        .where("product_id", productId)
      .orderBy("timestamp", "desc")
    res.json(data);
  } catch (error) {
    res.status(503).send("Error getting comments data");
  }
};

exports.postComment = async (req, res) => {
  try {
    const { productId } = req.params
    const { message, userId } = req.body

    if(!productId || !userId || !message) return res.status(401).send("Please fill in all required fields")
    const data = await knex('comment').insert({ message, product_id: productId, user_id: userId, timestamp: Date.now() })
    res.status(201).json(data)
  } catch (error) {
    res.status(401).send("Error posting comment")
  }
}