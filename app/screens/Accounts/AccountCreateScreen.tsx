import React from 'react'
import { Box, Text, VStack } from 'native-base'
import AccountCreate from '@/components/Accounts/AccountCreate'

export default function AccountCreateScreen(): JSX.Element {
  return (
    <VStack m={2} space={2} justifyItems={'between'}>
      <AccountCreate />
      <Box p={2} bg={'primary.500'} rounded={'md'}>
        <Text color={'white'} textAlign={'center'}>
          Le solde de départ doit être raisonnable pour les nouveaux clients.
        </Text>
      </Box>
    </VStack>
  )
}
