import { Box, Fab, AddIcon, Spacer, VStack } from 'native-base'
import React from 'react'
import AccountList from '@/components/Accounts/AccountList'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStackNavigatorParams } from '@/Router'

export default function AccountsListScreen({
  navigation,
}: NativeStackScreenProps<MainStackNavigatorParams, 'Home'>): JSX.Element {
  const onAddClick = () => {
    navigation.navigate('AccountCreate')
  }

  return (
    <VStack m={2} flex={1} height={'full'}>
      <Box height={'100%'} pb={'5%'}>
        <AccountList />
      </Box>
      <Spacer />
      <Fab
        onPress={onAddClick}
        renderInPortal={false}
        icon={<AddIcon color={'white'} />}
        size={'lg'}
      />
    </VStack>
  )
}
