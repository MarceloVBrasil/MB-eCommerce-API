import { IBrand } from "../../models/Brand"

export interface IBrandRepository {
    getByName(name: string): Promise<IBrand>
    getById(id: string): Promise<IBrand>
    add(brand: IBrand): Promise<IBrand>
    update(brandId: string, name: IBrand): Promise<IBrand>
    delete(brandId: string): Promise<string>
}