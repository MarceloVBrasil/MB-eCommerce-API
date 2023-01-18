require("dotenv").config()
const knex = require("knex")(require("../knexfile"));
const { REMOTE_SERVER_URL, SERVER_URL } = process.env
const { v4: uuidV4 } = require("uuid")

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
    if(!productId) return res.status(400).send("Invalid product id")
    const product = await knex("product")
      .join("brand", "brand_id", "brand.id")
      .join("category", "category_id", "category.id")
      .select("product.id", "product.name", "product.price", "product.image", "product.description", "product.quantity" , "brand.name as brandName", `category.name as categoryName`)
      .where("product.id", productId)
      .first()
    
    res.json(product)
  } catch (error) {
    res.status(503).send("Error getting product data")
  }
}

exports.createProduct = async (req, res) => {
  try {
     const { name, description, price, quantity, brand, category } = req.body
    
    if(!name) return res.status(401).send("name is required")
    if(!description) return res.status(401).send("description is required")
    if(!price) return res.status(401).send("price is required")
    if(!quantity) return res.status(401).send("quantity is required")
    if(!brand) return res.status(401).send("brand is required")
    if (!category) return res.status(401).send("category is required")
    if (!req.file.filename) return res.status(401).send("file is required")
    
    let brand_id = await getBrandId(brand)
    if(!brand_id) brand_id = await createNewBrand(brand)
    
    let category_id = await getCategoryId(category)
    if (!category_id) category_id = await createNewCategory(category)

    const image = `${REMOTE_SERVER_URL}/images/${req.file.filename}`
    const productId = uuidV4()

    const newProduct = {
      id: productId,
      name,
      description,
      price,
      quantity,
      brand_id,
      category_id,
      image
    }

    const data = await knex("product").insert(newProduct)
    res.status(201).send("Product created successfully!")
  } catch (error) {
    res.status(503).send("Error creating product")
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const { id, name, description, price, quantity, brand, category } = req.body
    
    if(!name) return res.status(401).send("name is required")
    if(!description) return res.status(401).send("description is required")
    if(!price) return res.status(401).send("price is required")
    if(!quantity) return res.status(401).send("quantity is required")
    if(!brand) return res.status(401).send("brand is required")
    if (!category) return res.status(401).send("category is required")
    if (!req.file.filename) return res.status(401).send("file is required")
    
    let brand_id = await getBrandId(brand)
    if(!brand_id) brand_id = await createNewBrand(brand)
    
    let category_id = await getCategoryId(category)
    if (!category_id) category_id = await createNewCategory(category)

    const image = `${REMOTE_SERVER_URL}/images/${req.file.filename}`

    const updatedProduct = {
      name,
      description,
      price,
      quantity,
      brand_id,
      category_id,
      image
    }

    const data = await knex("product").update(updatedProduct).where("id", id)
    res.status(201).send("Product updated successfully!")
  } catch (error) {
    res.status(503).send("Error updating product")
  }
}

async function getBrandId(brand) {
  const capitalizedBrandName = brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase()
  const data = await knex("brand").where("name", capitalizedBrandName).first()
  return data?.id
}

async function createNewBrand(brand) {
  const brandId = uuidV4()
  const capitalizedBrandName = brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase()
  await knex("brand").insert({id: brandId, name: capitalizedBrandName})
  return brandId
}

async function getCategoryId(category) {
  const capitalizedCategoryName = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
  const data = await knex("category").where("name", capitalizedCategoryName).first()
  return data?.id
}

async function createNewCategory(category) {
  const categoryId = uuidV4()
  const capitalizedCategoryName = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
  await knex("category").insert({id: categoryId, name: capitalizedCategoryName})
  return categoryId
}
