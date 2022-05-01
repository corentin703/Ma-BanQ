export interface Account {
  id: string
  ownerName: string
  balance: number

  risk?: string | null
}

export interface AccountRequest {
  ownerName?: string
  balance?: number
}
