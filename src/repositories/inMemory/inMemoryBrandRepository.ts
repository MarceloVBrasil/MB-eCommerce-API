import { IBrand } from "../../models/Brand"
import { IBrandRepository } from "../interfaces/IBrandRepository"

export class InMemoryBrandRepository implements IBrandRepository {
    private _brands: IBrand[]
    constructor() {
        this._brands = [
            { id: '8d544607-eef2-4c80-a264-b7a66d588b78', name: "Apple" },
            { id: 'd6761bac-8d20-4e0c-93da-0a2832bb31b5', name: "Dell" },
            { id: '0146c766-a6ea-4d8c-96ab-83b8619316eb', name: "Samsung" },
            { id: '7d1ac90c-3aa6-4dc9-b863-6672ff45599d', name: "Logitech" },
            { id: '405ac18a-c54f-4f61-a807-55ce148db05d', name: "Brocs" },
            { id: 'f1dbf7d2-f93d-40bf-b292-610aadf3af98', name: "Sony" },
            { id: '8572c25e-7fa2-4aa2-a0c8-98ee26fcd8b7', name: "Corsair" },
            { id: '560b8381-da72-4500-aa22-f18ecd90f648', name: "Snowkids" },
            { id: 'f0d019f5-a1d8-4a3a-bf8f-664db848e9ce', name: "Acer" }
        ]
    }

    async getByName(name: string): Promise<IBrand> {
        return this._brands.find(brand => brand.name === name)!
    }

    async getById(id: string): Promise<IBrand> {
        return this._brands.find(brand => brand.id === id)!
    }

    async add(brand: any): Promise<IBrand> {
        brand.id = crypto.randomUUID()
        this._brands.push(brand)

        return brand
    }

    async update(brandId: string, brand: any): Promise<IBrand> {
        const brandIndex = this._brands.findIndex(brand => brand.id === brandId)
        this._brands[brandIndex] = { id: brandId, ...brand }

        return this._brands[brandIndex]
    }

    async delete(brandId: string): Promise<string> {
        this._brands = this._brands.filter(brand => brand.id !== brandId)

        return brandId
    }
}