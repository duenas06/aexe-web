import Head from 'next/head'
import {
  Heading,
  Flex,
  Button,
  HStack,
  Box,
  Image,
  Switch,
  IconButton,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure
} from "@chakra-ui/react";
import { Avatar } from '@chakra-ui/react'
import { ref, getDownloadURL, } from 'firebase/storage';
import { storage } from "../../firebase";
import React, { useContext, useEffect, useState, } from "react";
import { FiMenu } from 'react-icons/fi'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import NextLink from 'next/link'

import Router from "next/router";
import UserDataContext from '../../context/UserDataContext';
import { EmailIcon } from '@chakra-ui/icons';

export default function TopDrawer() {
  const userDataContext = useContext(UserDataContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [url, setUrl] = useState(null);
  const btnRef = React.useRef();

  useEffect(() => {
    setTimeout(() => {
      userDataContext.data ?
        getProfileData(userDataContext.data.profile_url)
        :
        // Router.push("/");
        console.log("no data");

    }, []);
  }, []);

  async function getProfileData() {
    const imageURL = ref(storage, `/files/${imageURL}`);
    await getDownloadURL(imageURL).then((url) => {
      setUrl(url);
      console.log(url)
    }).catch(error => {
      console.log(error.message, "error");
    })
  }

  const tabs = [
    { name: "Create Account", path: "/create_account", icon: <EmailIcon /> },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Profile", path: "/profile" },
    { name: "AR Instructor", path: "/exercise" },
    { name: "Announcement", path: "/announcement" },
    { name: "User List", path: "/user_list" },
    { name: "Settings", path: "/settings" },
  ]

  return (
    <Box as="nav" bg="#97392F" boxShadow={useColorModeValue('sm', 'sm-dark')} w="100%" maxW={'100vw'} padding={"1vh"}>
      <Flex>
        <IconButton
          color="white"
          ref={btnRef}
          icon={<FiMenu fontSize="1.25rem" />}
          onClick={onOpen}
          aria-label="Open Menu"
          bg="#97392F"
        />
        <IconButton
          icon={<Image src="/aexelogo.png" />}
          w="5px"
          isRound={true}
          aria-label="Homepage"
          onClick={() => Router.push("/dashboard")}
        />

        <Avatar
          src={url}
          bg='teal.500'
          size="sm" align="center"
          marginLeft="90%"
          marginTop="1"></Avatar>

        <Drawer
          isOpen={isOpen}
          placement="left"
          colorScheme={"blue"}
          onClose={onClose}
          finalFocusRef={btnRef}>

          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />

            <DrawerHeader bgColor='#97392F'>
              <HStack>
                <Heading
                  as='h4'
                  size='md'
                  color='whiteAlpha.900'>Welcome Admin</Heading>
              </HStack>
            </DrawerHeader>

            <DrawerBody bgColor='#ffffff '>
              {tabs.map(data => {
                return (
                  <Flex flexDir="column" align="center">
                    <NextLink href={data.path} passHref>
                      <Button as="a"
                        variant="ghost"
                        aria-label="Dashboard"
                        my={5} w="100%"
                        textColor='#696969'
                        color="blue" >{data.name}
                      </Button>
                    </NextLink>
                  </Flex>
                )
              })}

            </DrawerBody>

            <DrawerFooter bgColor='#ffffff'>
              <Button colorScheme='red'
                onClick={() => {
                  Router.push("/")
                  userDataContext.setUserData({
                    dataObject: null
                  })
                }}>Logout</Button>
            </DrawerFooter>

          </DrawerContent>
        </Drawer>

      </Flex>
    </Box>

  )
}