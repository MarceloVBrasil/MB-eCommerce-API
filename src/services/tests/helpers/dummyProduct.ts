import { IProduct } from "../../../models/Product"
import { ProductFactory } from "../../factories/ProductFactory"
import { addDummyBrand } from "./dummyBrand"
import { addDummyCategory } from "./dummyCategory"

interface IGenerateDummyProduct {
    addBrand?: boolean
    addCategory?: boolean
}


async function addDummyProduct(): Promise<IProduct> {
    const productService = ProductFactory()

    const product = await generateProduct({ addBrand: true, addCategory: true })

    return await productService.add(product)
}

async function addUnavailableDummyProduct(): Promise<IProduct> {
    const productService = ProductFactory()

    const product = await generateUnavailableDummyProduct()

    return await productService.add(product)
}


async function generateProduct({ addBrand = true, addCategory = true }: IGenerateDummyProduct = {}): Promise<IProduct> {
    const brandId = await getBrandId(addBrand)
    const categoryId = await getCategoryId(addCategory)

    return {
        id: 'product id',
        name: `New Product - ${crypto.randomUUID()}`,
        description: 'product description',
        image: 'image goes here',
        price: 100,
        quantity: 100,
        brandId: brandId || crypto.randomUUID(),
        categoryId: categoryId || crypto.randomUUID()
    }
}

async function generateUnavailableDummyProduct({ addBrand = true, addCategory = true }: IGenerateDummyProduct = {}) {
    const brandId = await getBrandId(addBrand)
    const categoryId = await getCategoryId(addCategory)

    return {
        id: 'product id',
        name: `New Product - ${crypto.randomUUID()}`,
        description: 'product description',
        image: 'image goes here',
        price: 100,
        quantity: 0,
        brandId: brandId || crypto.randomUUID(),
        categoryId: categoryId || crypto.randomUUID()
    }
}

async function getBrandId(addBrand?: boolean): Promise<string> {
    if (!addBrand) return ''

    const dummyBrand = await addDummyBrand()
    return dummyBrand.id!
}

async function getCategoryId(addCategory?: boolean): Promise<string> {
    if (!addCategory) return ''

    const dummyCategory = await addDummyCategory()
    return dummyCategory.id!
}

export { addDummyProduct, generateProduct, addUnavailableDummyProduct }