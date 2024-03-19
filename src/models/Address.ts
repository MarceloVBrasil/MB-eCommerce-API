export interface IAddress {
    id?: string
    userId: string
    province: canadianProvinces
    city: string
    street: string
    postalCode: string
    complement?: string
}

export type canadianProvinces = "NL" | "PE" | "NS" | "NB" | "QC" | "ON" | "MB" | "SK" | "AB" | "BC" | "YT" | "NT" | "NU"