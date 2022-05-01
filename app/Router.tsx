import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '@/screens/HomeScreen'
import AccountsListScreen from '@/screens/Accounts/AccountsListScreen'
import { AccountDetailsScreenProps } from '@/screens/Accounts/AccountDetailsScreen.types'
import AccountDetailsScreen from '@/screens/Accounts/AccountDetailsScreen'
import { AccountEditScreenProps } from '@/screens/Accounts/AccountEditScreen.types'
import AccountEditScreen from '@/screens/Accounts/AccountEditScreen'
import AccountCreateScreen from '@/screens/Accounts/AccountCreateScreen'

export type MainStackNavigatorParams = {
  Home: undefined
  Accounts: undefined
  AccountDetails: AccountDetailsScreenProps
  AccountCreate: undefined
  AccountEdit: AccountEditScreenProps
}

export const MainStackNavigator =
  createNativeStackNavigator<MainStackNavigatorParams>()

export default function Router(): JSX.Element {
  return (
    <NavigationContainer>
      <MainStackNavigator.Navigator initialRouteName={'Home'}>
        <MainStackNavigator.Screen
          name={'Home'}
          component={HomeScreen}
          options={{
            title: 'BanQ - Consultation des comptes',
          }}
        />
        <MainStackNavigator.Screen
          name={'Accounts'}
          component={AccountsListScreen}
          options={{
            title: 'Comptes',
          }}
        />
        <MainStackNavigator.Screen
          name={'AccountDetails'}
          component={AccountDetailsScreen}
          options={{
            title: 'Détails du compte',
          }}
        />
        <MainStackNavigator.Screen
          name={'AccountCreate'}
          component={AccountCreateScreen}
          options={{
            title: 'Ajout',
          }}
        />
        <MainStackNavigator.Screen
          name={'AccountEdit'}
          component={AccountEditScreen}
          options={{
            title: 'Édition',
          }}
        />
      </MainStackNavigator.Navigator>
    </NavigationContainer>
  )
}
