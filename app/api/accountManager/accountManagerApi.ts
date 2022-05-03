import { ApiResponse, ApisauceInstance, create } from 'apisauce'
import { Account, AccountRequest } from '@/types/Account'

export class AccountManagerApi {
  private readonly api: ApisauceInstance

  constructor() {
    this.api = create({
      baseURL: 'https://arcane-brushlands-92194.herokuapp.com',
      // baseURL: 'https://loanapproval-accmanager.ew.r.appspot.com',
      // baseURL: 'http://localhost:8080',
      headers: {
        Accept: 'application/json',
      },
    })
  }

  getAll = (): Promise<ApiResponse<Account[]>> => {
    return this.api.get(`/accounts`)
  }

  getById = (id: string): Promise<ApiResponse<Account>> => {
    return this.api.get(`/accounts/${id}`)
  }

  create = (requestBody: AccountRequest): Promise<ApiResponse<Account>> => {
    return this.api.post(`/accounts`, requestBody)
  }

  update = (
    id: string,
    requestBody: AccountRequest,
  ): Promise<ApiResponse<Account>> => {
    return this.api.put(`/accounts/${id}`, requestBody)
  }

  remove = (id: string): Promise<ApiResponse<Account>> => {
    return this.api.delete(`/accounts/${id}`)
  }
}

export default AccountManagerApi
