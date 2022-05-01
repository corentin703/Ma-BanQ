import React, { useContext, useEffect, useState } from 'react'
import { AccountDetailsProps } from '@/components/Accounts/AccountDetails.types'
import { AccountStoreContext } from '@/contexts/AccountStoreContextProvider'
import { Account } from '@/types/Account'
import { Alert } from 'react-native'
import { Box, Button, Divider, Heading, Text, VStack } from 'native-base'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { MainStackNavigatorParams } from '@/Router'
import Loading from '@/components/Loading'

export default function AccountDetails({
  id,
}: AccountDetailsProps): JSX.Element {
  const accountStoreContext = useContext(AccountStoreContext)
  const navigation = useNavigation<NavigationProp<MainStackNavigatorParams>>()
  const [account, setAccount] = useState<Account | undefined>()

  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    accountStoreContext
      .getById(id)
      .then(res => {
        setAccount(res)
      })
      .catch(_ => {
        navigation.goBack()
      })
  }, [accountStoreContext, id, navigation])

  const onEditClick = () => {
    if (account === undefined) return

    navigation.navigate('AccountEdit', {
      id: account.id,
    })
  }

  const onDeleteClick = () => {
    if (account === undefined) return

    setIsDeleting(true)

    accountStoreContext.remove(account.id).then(_ => {
      Alert.alert(
        'Compte supprimé !',
        `Le compte appartenant à ${account.ownerName} a bien été supprimé.`,
      )
      setIsDeleting(false)
      navigation.goBack()
    })
  }

  if (account === undefined || isDeleting) return <Loading />

  return (
    <VStack space={2}>
      <Heading fontSize={'xl'}>Compte de {account.ownerName}</Heading>
      <Divider my="2" />
      <Box rounded={'lg'}>
        <Text fontSize={'md'}>Numéro BanQ : {account.id}</Text>
      </Box>
      <Box rounded={'lg'}>
        <Text fontSize={'md'}>Solde : {account.balance}</Text>
      </Box>
      <Box
        p={3}
        rounded={'sm'}
        color={'gray.50'}
        bg={account.risk === 'High' ? 'red.500' : 'green.500'}>
        <Text fontSize={'md'} color={'gray.50'}>
          Risque : {account.risk === 'High' ? 'Haut' : 'Faible'}
        </Text>
      </Box>
      <Box alignItems={'flex-end'}>
        <Button.Group isAttached={true}>
          <Button onPress={onEditClick}>Éditer</Button>
          <Button
            onPress={onDeleteClick}
            backgroundColor={'red.500'}
            color={'white'}>
            Supprimer
          </Button>
        </Button.Group>
      </Box>
    </VStack>
  )
}
