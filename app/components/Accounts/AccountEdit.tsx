import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, FormControl, Input, VStack } from 'native-base'
import { AccountEditProps } from '@/components/Accounts/AccountEdit.types'
import { Alert } from 'react-native'
import { AccountStoreContext } from '@/contexts/AccountStoreContextProvider'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { MainStackNavigatorParams } from '@/Router'
import { Account } from '@/types/Account'
import Loading from '@/components/Loading'

export default function AccountEdit({ id }: AccountEditProps): JSX.Element {
  const accountStoreContext = useContext(AccountStoreContext)
  const navigation = useNavigation<NavigationProp<MainStackNavigatorParams>>()
  const [account, setAccount] = useState<Account | undefined>()

  const [ownerName, setOwnerName] = useState<string | undefined>(undefined)
  const [ownerNameErrorMessage, setOwnerNameErrorMessage] = useState<
    string | undefined
  >(undefined)
  const [balance, setBalance] = useState<number | undefined>(undefined)
  const [balanceErrorMessage, setBalanceErrorMessage] = useState<
    string | undefined
  >(undefined)

  const [isUpdating, setIsUpdating] = useState<boolean>(false)

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

  useEffect(() => {
    if (account === undefined) return

    setBalance(account.balance)
    setOwnerName(account.ownerName)
  }, [account])

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

    setIsUpdating(true)

    accountStoreContext
      .update(id, {
        balance,
        ownerName,
      })
      .then(_ => {
        navigation.goBack()
      })
      .catch(_ => {
        setIsUpdating(false)
      })

    navigation.goBack()
  }

  const onCancel = () => {
    navigation.goBack()
  }

  if (account === undefined || isUpdating) return <Loading />

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
            Confirmer
          </Button>
          <Button onPress={onCancel} backgroundColor={'secondary.500'}>
            Annuler
          </Button>
        </Button.Group>
      </Box>
    </VStack>
  )
}
