import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box, Button, Center, Image, Spacer, Text, VStack } from "native-base";

export default function HomeScreen({
  navigation,
}: NativeStackScreenProps<any>) {
  return (
    <VStack m={2} flex={1} height={'full'}>
      <Text fontSize={'lg'}>
        Bienvenue sur l'application de consultation des comptes de la seule et
        unique banque quantique.
      </Text>
      <Text my={4} fontSize={'md'}>
        Ici l'argent des clients existe dans notre base de données, tout en
        n'existant pas réellement. Comme vous, le reste de l'équipe est
        convaincue de ce concept d'avenir, bien qu'à l'image de la concurrence
        non-quantique, nous ne nous ne pratiquons pas de charité.
      </Text>

      <Box p={2} bg={'blue.500'} rounded={'md'}>
        <Text color={'white'} textAlign={'center'}>
          La BanQ™ renouvelle son engagement exceptionnel en faveur des hôpitaux
          : veillez à appliquer des taux d'intérêts à 59% au lieu des 60%
          habituels.
        </Text>
      </Box>

      <Center p={4}>
        <Image
          size={'2xl'}
          resizeMode={'contain'}
          borderRadius={50}
          source={require('@/assets/images/atom.jpg')}
          alt={'BanQ'}
        />
      </Center>

      <Spacer />
      <Button onPress={() => navigation.navigate('Accounts')}>
        Voir les comptes
      </Button>
    </VStack>
  )
}
