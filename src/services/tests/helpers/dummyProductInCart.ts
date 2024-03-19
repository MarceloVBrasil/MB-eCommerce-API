import { ProductsInCartFactory } from "../../factories/ProductsInCartFactory";
import { addDummyProduct } from "./dummyProduct";
import { addDummyCart } from "./dummyCart";
import { IProductInCart } from "../../../models/ProductInCart";
import { INamedProductInCart } from "../../../repositories/interfaces/view models/INamedProductInCart";

interface IGenerateDummyProductToCart {
    addCart?: boolean
    addProduct?: boolean
}

const productInCartService = ProductsInCartFactory()

async function addDummyProductToCart(): Promise<IProductInCart> {
    const { cartId, productId } = await generateDummyProductToCart()

    await productInCartService.add({ cartId, productId })

    return { cartId, productId }
}

async function addMultipleSameDummyProductsToCart(numberOfProductToAdd: number = 1): Promise<IProductInCart> {
    const { cartId, productId } = await generateDummyProductToCart()

    for (let i = 0; i < numberOfProductToAdd; i++) {
        await productInCartService.add({ cartId, productId })
    }

    return { cartId, productId }
}

async function addMultipleSameDummyProductsToCartAndReturnThem(numberOfProductToAdd: number = 1): Promise<INamedProductInCart[]> {
    const { cartId, productId } = await generateDummyProductToCart()

    for (let i = 0; i < numberOfProductToAdd - 1; i++) {
        await productInCartService.add({ cartId, productId })
    }

    const productsInCart = await productInCartService.add({ cartId, productId })

    return productsInCart
}

async function generateDummyProductToCart({ addCart = true, addProduct = true }: IGenerateDummyProductToCart = {}): Promise<IProductInCart> {
    const cartId = await getCartId({ addCart })
    const productId = await getProductId({ addProduct })

    return { cartId, productId }
}

async function getCartId({ addCart = true }: { addCart?: boolean } = {}): Promise<string> {
    if (!addCart) return crypto.randomUUID()

    const dummyCart = await addDummyCart()
    return dummyCart.id!
}

async function getProductId({ addProduct = true }: { addProduct?: boolean } = {}) {
    if (!addProduct) return crypto.randomUUID()

    const dummyProduct = await addDummyProduct()
    return dummyProduct.id!
}

export { addDummyProductToCart, addMultipleSameDummyProductsToCart, generateDummyProductToCart, addMultipleSameDummyProductsToCartAndReturnThem }