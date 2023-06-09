import NextLink from 'next/link'
import { Center, Box, Button, Input, VStack, Heading } from '@chakra-ui/react'
import Router, { useRouter } from "next/router";
import Head from 'next/head';


export default function forgotpw() {

    return (
        <>
            <Head>
                <title>Forgot Password</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/aexelogo.png" />
            </Head>
            <Center>
                <Box bg="#8FAADC" w="1550%" h="100vh" >
                    <Center>
                        <Box bg="#E1CBA5" w="400px" h="400px"
                            mt="15vh" rounded="2xl" boxShadow="md">

                            <Button
                                textColor="white"
                                bg='red'
                                rounded='2xl'
                                mt="5%"
                                ml="3%"
                                onClick={() => { Router.push("/") }}
                            >Back</Button>

                            <VStack mt="12%" spacing="6%">

                                <Heading size='md'
                                    textColor="white">
                                    Enter Email
                                </Heading>

                                <Box>
                                    <Input
                                        mt="5"
                                        shadow={"inner"}
                                        bg={"white"}
                                        color={"black"}
                                        width="15vw"
                                        placeholder={"Email"}
                                    />
                                </Box>

                                <Button
                                    mt="10"
                                    textColor="white"
                                    bg='red'
                                    rounded='xl'
                                >Send Email Configuration</Button>

                            </VStack>
                        </Box>


                    </Center>
                </Box>
            </Center>


        </>
    )
}