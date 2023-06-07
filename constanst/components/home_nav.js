import { Box, Button, Flex, HStack, IconButton, Image } from "@chakra-ui/react";
import React from "react";
import NextLink from 'next/link'
import Router from "next/router";

export default function HomeNav() {
    return (
        <Box as="nav" bg="#97392F" padding={"2vh"} >
            <Flex>
                <HStack w="100vw" maxW="100vw" justifyContent='space-between' paddingRight={16}>
                    <IconButton
                        icon={<Image src="/aexelogo.png" />}
                        w="10px"
                        isRound={true}
                        aria-label="Homepage"
                        onClick={() => Router.push("/")}
                    />
                    <HStack>
                        <NextLink href={"/aexe_app"} passHref>
                            <Button as="a"
                                variant="solid"
                                colorScheme='transparent'
                                aria-label="Dashboard"
                                textColor='white'
                                fontWeight={'bold'}
                                _hover={{
                                    transitionDuration: ".2s",
                                    transform: "scale(1.1)",
                                    overflow: "hidden",
                                }}>AEXE App
                            </Button>
                        </NextLink>
                        <NextLink href={"/signin"} passHref>
                            <Button as="a"
                                variant="solid"
                                fontWeight={'bold'}
                                colorScheme='transparent'
                                aria-label="Dashboard"
                                textColor='white'
                                _hover={{
                                    transitionDuration: ".2s",
                                    transform: "scale(1.1)",
                                    overflow: "hidden",
                                }}>Sign In
                            </Button>
                        </NextLink>
                    </HStack>
                </HStack>
            </Flex>
        </Box>
    )
}