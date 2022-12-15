const knex = require("knex")(require("../knexfile"));

exports.getAll = async (_req, res) => {
  try {
    const data = await knex
      .select("id", "name", "image", "price")
      .from("product");
    res.json(data);
  } catch (error) {
    res.status(503).send("Error getting products data " + error);
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.productId
    const product = await knex("product")
      .join("brand", "brand_id", "brand.id")
      .join("category", "category_id", "category.id")
      .select("product.id", "product.name", "product.price", "product.image", "product.description", "brand.name as brandName", `category.name as categoryName`)
      .where("product.id", productId)
      .first()
    
    res.json(product)
  } catch (error) {
    res.status(503).send("Error getting product data")
  }
}
