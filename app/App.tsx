import { NativeBaseProvider, StatusBar } from 'native-base'
import React from 'react'
import Router from './Router'
import AccountStoreContextProvider from '@/contexts/AccountStoreContextProvider'

export default function App(): JSX.Element {
  return (
    <NativeBaseProvider>
      <StatusBar backgroundColor={'white'} />
      <AccountStoreContextProvider>
        <Router />
      </AccountStoreContextProvider>
    </NativeBaseProvider>
  )
}
