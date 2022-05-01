import React, { useContext, useState } from 'react'
import { Box, Button, FormControl, Input, VStack } from 'native-base'
import { AccountStoreContext } from '@/contexts/AccountStoreContextProvider'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { MainStackNavigatorParams } from '@/Router'
import Loading from '@/components/Loading'

export default function AccountCreate(): JSX.Element {
  const accountStoreContext = useContext(AccountStoreContext)
  const navigation = useNavigation<NavigationProp<MainStackNavigatorParams>>()

  const [ownerName, setOwnerName] = useState<string | undefined>(undefined)
  const [ownerNameErrorMessage, setOwnerNameErrorMessage] = useState<
    string | undefined
  >(undefined)
  const [balance, setBalance] = useState<number | undefined>(undefined)
  const [balanceErrorMessage, setBalanceErrorMessage] = useState<
    string | undefined
  >(undefined)

  const [isCreating, setIsCreating] = useState<boolean>(false)

  const onConfirm = () => {
    let error = false

    if (ownerName === undefined || ownerName.length === 0) {
      setOwnerNameErrorMessage('Veuillez renseigner un nom')
      error = false
    }

    if (balance === undefined || Number.isNaN(balance)) {
      setBalanceErrorMessage('Veuillez renseigner un solde valide')
      error = false
    }

    if (error) return

    setIsCreating(true)
    accountStoreContext
      .create({
        balance,
        ownerName,
      })
      .then(_ => {
        navigation.goBack()
      })
      .catch(_ => {
        setIsCreating(false)
      })

    navigation.goBack()
  }

  const onCancel = () => {
    navigation.goBack()
  }

  if (isCreating) return <Loading />

  return (
    <VStack space={2}>
      <FormControl isInvalid={ownerNameErrorMessage !== undefined}>
        <FormControl.Label>Nom</FormControl.Label>
        <Input
          placeholder="Entrez un nom"
          value={ownerName}
          onChangeText={newValue => setOwnerName(newValue)}
        />
        {ownerNameErrorMessage !== undefined ? (
          <FormControl.ErrorMessage>
            {ownerNameErrorMessage}
          </FormControl.ErrorMessage>
        ) : (
          <></>
        )}
      </FormControl>
      <FormControl isInvalid={balanceErrorMessage !== undefined}>
        <FormControl.Label>Solde</FormControl.Label>
        <Input
          placeholder="Entrez le solde"
          keyboardType={'number-pad'}
          value={
            balance !== undefined && !Number.isNaN(balance)
              ? balance.toString()
              : ''
          }
          onChangeText={newValue => setBalance(parseFloat(newValue))}
        />
        {balanceErrorMessage !== undefined ? (
          <FormControl.ErrorMessage>
            {balanceErrorMessage}
          </FormControl.ErrorMessage>
        ) : (
          <></>
        )}
      </FormControl>

      <Box alignItems={'flex-end'}>
        <Button.Group isAttached={true}>
          <Button backgroundColor={'primary.500'} onPress={onConfirm}>
            Créer
          </Button>
          <Button onPress={onCancel} backgroundColor={'secondary.500'}>
            Annuler
          </Button>
        </Button.Group>
      </Box>
    </VStack>
  )
}
