import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStackNavigatorParams } from '@/Router'
import AccountDetails from '@/components/Accounts/AccountDetails'
import { Box } from 'native-base'

export default function AccountDetailsScreen({
  route,
  navigation,
}: NativeStackScreenProps<
  MainStackNavigatorParams,
  'AccountDetails'
>): JSX.Element {
  if (route.params.id === undefined || typeof route.params.id !== 'string') {
    navigation.navigate('Accounts')
    return <></>
  }

  return (
    <Box m={2}>
      <AccountDetails id={route.params.id} />
    </Box>
  )
}
