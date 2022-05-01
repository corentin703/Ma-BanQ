import React, { useContext, useEffect, useState } from 'react'
import { AccountStoreContext } from '@/contexts/AccountStoreContextProvider'
import { Box, Heading, HStack, Spacer, VStack, Text } from 'native-base'
import { Alert, FlatList } from 'react-native'
import { Account } from '@/types/Account'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MainStackNavigatorParams } from '@/Router'
import Loading from '@/components/Loading'

export default function AccountList(): JSX.Element {
  const accountStoreContext = useContext(AccountStoreContext)
  const [accounts, setAccounts] = useState<Account[] | undefined>(undefined)

  const navigation = useNavigation<NavigationProp<MainStackNavigatorParams>>()

  useEffect(() => {
    accountStoreContext
      .getAll()
      .then(res => {
        setAccounts(res)
      })
      .catch(err => {
        Alert.alert("Une erreur s'est produite", err)
      })
  }, [accountStoreContext])

  if (accounts === undefined) return <Loading />

  return (
    <Box>
      <Heading fontSize={'xl'} p="4" pb="3">
        Liste des comptes quantiques
      </Heading>
      <FlatList
        data={accounts}
        renderItem={({ item }) => (
          <Box
            onTouchEnd={() =>
              navigation?.navigate('AccountDetails', {
                id: item.id,
              })
            }
            borderBottomWidth="1"
            _dark={{
              borderColor: 'gray.600',
            }}
            borderColor="coolGray.200"
            pl="4"
            pr="5"
            py="2">
            <HStack space={3} justifyContent="space-between">
              <VStack>
                <Text
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  color="coolGray.800"
                  bold>
                  {item.ownerName}
                </Text>
              </VStack>
              <Spacer />
              <Text
                fontSize="xs"
                _dark={{
                  color: 'warmGray.50',
                }}
                color="coolGray.800"
                alignSelf="flex-start">
                {item.balance}
              </Text>
            </HStack>
          </Box>
        )}
        keyExtractor={item => item.id}
      />
    </Box>
  )
}
