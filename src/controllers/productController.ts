import { Request, Response } from "express";
import { v4 as uuidV4 } from "uuid"
import { ProductSchema } from "./schemas/ProductSchema"
import { ProductFactory } from "../services/factories/ProductFactory";

const productSchema = new ProductSchema()

export class ProductController {
  constructor() { }

  async getAll(req: Request, res: Response) {
    try {
      const productService = ProductFactory()

      const result = await productService.getAll()
      res.json(result)
    } catch (error: any) {
      res.status(503).json({ message: error.message })
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const productService = ProductFactory()

      await productSchema.getById().validate(req.params)
      const result = await productService.getById(req.params.id)
      if (!Object.keys(result).length) res.status(400).json({ message: "product not found" })
      else res.json(result)

    } catch (error: any) {
      res.status(503).json({ message: error.message })
    }
  }

  async add(req: Request, res: Response) {

    try {
      const productService = ProductFactory()

      await productSchema.add().validate({ ...req.body })
      req.body.id = uuidV4()
      // req.body.image = `${SERVER_URL}/images/${req.file!.filename}`
      const result = await productService.add(req.body)
      if (!Object.keys(result).length) res.status(400).json({ message: "product already registered" })
      else res.json({ message: "product cerated successfully" })

    } catch (error: any) {
      res.status(503).json({ message: error.message })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const productService = ProductFactory()

      await productSchema.update().validate({ ...req.params, ...req.body })
      // req.body.image = `${SERVER_URL}/images/${req.file!.filename}`
      const result = await productService.update(req.params.id, req.body)
      if (!Object.keys(result).length) return res.status(400).json({ message: "product not found" })
      res.json({ message: "product edited successfully" })
    } catch (error: any) {
      res.status(503).json({ message: error.message })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const productService = ProductFactory()

      await productSchema.delete().validate(req.params)
      const result = await productService.delete(req.params.id)
      res.json(result)
    } catch (error: any) {
      res.status(503).json({ message: error.message })
    }
  }
}
