import { ICategory } from "../../models/Category"

export interface ICategoryRepository {
    getById(id: string): Promise<ICategory>
    getByName(name: string): Promise<ICategory>
    add(category: ICategory): Promise<ICategory>
    update(id: string, category: ICategory): Promise<ICategory>
    delete(id: string): Promise<string>
}