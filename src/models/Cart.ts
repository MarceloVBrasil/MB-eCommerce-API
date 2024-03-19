export interface ICart {
    id?: string
    userId: string
    status: statusType
}

export type statusType = "open" | "closed"