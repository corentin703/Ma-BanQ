import React, { createContext, useEffect, useRef, useState } from 'react'
import {
  AccountStoreContextProviderProps,
  AccountStoreContextType,
} from '@/contexts/AccountStoreContextProvider.types'
import accountManagerApi from '@/api/accountManager/accountManagerApi'
import { Account, AccountRequest } from '@/types/Account'
import { Alert } from 'react-native'
import Loading from '@/components/Loading'
import { Box, Center, Image } from "native-base";

export const AccountStoreContext = createContext<AccountStoreContextType>({
  getAll: () => {
    /**/
  },
  getById: (_: string) => {
    /**/
  },
  create: (_: AccountRequest) => {
    /**/
  },
  update: (_: string, __: AccountRequest) => {
    /**/
  },
  remove: (_: string) => {
    /**/
  },
} as AccountStoreContextType)

export default function AccountStoreContextProvider({
  children,
}: AccountStoreContextProviderProps): JSX.Element {
  const accountManagerApiClient = useRef(new accountManagerApi())

  const [accounts, setAccounts] = useState<Account[] | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const getAll = async (forceReload: boolean): Promise<Account[]> => {
    if (accounts !== undefined && !forceReload) return accounts

    setIsLoading(true)
    const response = await accountManagerApiClient.current.getAll()
    setIsLoading(false)

    if (!response.ok) handleError(response.problem)

    setAccounts(response.data)

    if (accounts === undefined) return []
    return accounts
  }

  const handleError = (errorMessage: string) => {
    Alert.alert("Une errreur s'est produite", errorMessage)
    throw new Error(errorMessage)
  }

  useEffect(() => {
    getAll(true)
    // accountManagerApiClient.current.getAll().then(res => {
    //   if (res === undefined || res.data === undefined) return
    //
    //   // for (const account of res.data) {
    //   //   accountManagerApiClient.current.delete(account.id).then(_ => {
    //   //     console.log(`Test ${account.id} deleted`)
    //   //   })
    //   // }
    //
    //   // if (res.data.length < 500) {
    //   //   for (let i = 1; i < 501; ++i) {
    //   //     accountManagerApiClient.current
    //   //       .create({
    //   //         ownerName: `Test ${i}`,
    //   //         balance: Math.random() * (i % 2 === 0 ? 1_000_000 : 1_000),
    //   //       })
    //   //       .then(_ => {
    //   //         console.log(`Test ${i} created`)
    //   //       })
    //   //   }
    //   // }
    //
    //   setAccounts(res.data)
    // })
  }, [])

  const contextValue: AccountStoreContextType = {
    getAll: () => getAll(false),
    getById: async id => {
      const response = await accountManagerApiClient.current.getById(id)

      if (response.ok) return response.data!

      handleError(response.problem)
    },
    create: async request => {
      const response = await accountManagerApiClient.current.create(request)

      if (response.ok) {
        if (accounts === undefined) await getAll(true)
        else if (response.data !== undefined)
          setAccounts([...accounts, response.data])

        return
      }

      handleError(response.problem)
    },
    update: async (id, request) => {
      const response = await accountManagerApiClient.current.update(id, request)

      if (response.ok) {
        await getAll(true)
        return
      }

      handleError(response.problem)
    },
    remove: async id => {
      const response = await accountManagerApiClient.current.remove(id)

      if (response.ok) {
        await getAll(true)
        return
      }

      handleError(response.problem)
    },
  }

  if (isLoading)
    return (
      <Box backgroundColor={'white'} height={'100%'} width={'100%'}>
        <Loading />
        <Center p={4}>
          <Image
            size={'2xl'}
            resizeMode={'contain'}
            borderRadius={50}
            source={require('@/assets/images/atom.jpg')}
            alt={'BanQ'}
          />
        </Center>
      </Box>
    )

  return (
    <AccountStoreContext.Provider value={contextValue}>
      {children}
    </AccountStoreContext.Provider>
  )
}
