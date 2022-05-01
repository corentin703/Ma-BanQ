import { Account, AccountRequest } from '@/types/Account'
import React from 'react'

export type AccountStoreContextType = {
  getAll: () => Promise<Account[]>
  getById: (id: string) => Promise<Account | undefined>
  create: (request: AccountRequest) => Promise<void>
  update: (id: string, request: AccountRequest) => Promise<void>
  remove: (id: string) => Promise<void>
}

export type AccountStoreContextProviderProps = {
  children: React.ReactNode
}
