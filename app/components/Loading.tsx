import React from 'react'
import { Center, Container, Heading, HStack, Spinner } from 'native-base'

export default function Loading(): JSX.Element {
  return (
    <Center my={2}>
      <Container p={4} backgroundColor={'white'} rounded={'md'}>
        <HStack space={2} justifyContent="center" alignItems="center">
          <Spinner accessibilityLabel="Loading posts" size="lg" />
          <Heading color="primary.500" fontSize="xl">
            Chargement en cours
          </Heading>
        </HStack>
      </Container>
    </Center>
  )
}
