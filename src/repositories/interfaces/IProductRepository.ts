import { IProduct } from "../../models/Product"
import { IProductBrandCategory } from "./views/IProductBrandCategory"

export interface IProductRepository {
    getAll(): Promise<IProduct[]>
    getById(id: string): Promise<IProduct>
    getByIdWithBrandAndCategory(id: string): Promise<IProductBrandCategory>
    getByName(name: string): Promise<IProduct>
    add(product: IProduct): Promise<IProduct>
    update(id: string, data: IProduct): Promise<IProduct>
    delete(id: string): Promise<string>
}