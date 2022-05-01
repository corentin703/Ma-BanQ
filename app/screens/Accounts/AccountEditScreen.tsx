import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStackNavigatorParams } from '@/Router'
import AccountEdit from '@/components/Accounts/AccountEdit'
import { Box, Text, VStack } from 'native-base'

export default function AccountEditScreen({
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
    <VStack m={2} space={2} justifyItems={'between'}>
      <AccountEdit id={route.params.id} />
      <Box p={2} bg={'red.500'} rounded={'md'}>
        <Text color={'white'} textAlign={'center'} fontSize={'lg'}>
          ATTENTION !
        </Text>
        <Text color={'white'} textAlign={'center'}>
          Ne faites pas chambrer les atomes !
        </Text>
      </Box>
    </VStack>
  )
}
