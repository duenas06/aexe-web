import Head from 'next/head'
import {
  Heading,
  Center,
  Flex,
  Button,
  Stack,
  HStack,
  VStack,
  StackDivider,
  Text,
  Input,
  Box,
  Image,
  Switch,
  IconButton,
  useColorModeValue,
  useBreakpointValue,
  Container,
  useDisclosure,
  Divider
} from "@chakra-ui/react";
import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  AiOutlineUser,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel
} from '@chakra-ui/react'
import React, { useEffect, useState, useContext } from "react";
//import Router from 'react'
import { FiMenu, FiSquare } from 'react-icons/fi'
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
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { useAuth, storage } from "../firebase";
import TopDrawer from '../constanst/components/drawer';
import HomeNav from '../constanst/components/home_nav';


export default function UserInquiries() {
  const currentUser = useAuth();
  const isDesktop = useBreakpointValue({ base: false, lg: true })
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Head>
        <title>User Inquiries</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/aexelogo.png" />
      </Head>

      <Box bgColor="#ffffff" w="100%" h="300%">
        <HomeNav />
        <Center>
          <Box mt="5vh">
            <Card
              size='md'
              align="center"
              variant="outline"
              marginTop="5%"
              shadow="2xl"
              marginBottom="5%">
              <CardHeader>
                <Heading
                  size='md'
                  textAlign="center" fontSize={'3xl'} color={'#97392F'}>Frequently Asked Questions (FAQs)</Heading>
                <Divider borderColor="gray" mt="3%" />
                <Image src='/faq.jpg' alt='log' h="50vh" w="100%" mt="5%" />
                <Divider borderColor="gray" mt="5%" />
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider />} spacing='4' w="40vw">
                  <Accordion allowToggle >
                    <AccordionItem>
                      <h2>
                        <AccordionButton _expanded={{ bg: 'red.500', color: 'white' }}>
                          <Box flex='1' textAlign='left' fontWeight="semibold">
                            Where is the gym located?
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel>
                        The gym can be found in the 47 CRJM PILAR MORNING BREEZE
                        Brgy.085, District 1, Caloocan City, Philippines, 1400
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>

                  <Accordion allowToggle >
                    <AccordionItem>
                      <h2>
                        <AccordionButton _expanded={{ bg: 'red.500', color: 'white' }}>
                          <Box flex='1' textAlign='left' fontWeight="semibold">
                            Gym opening and closing hours
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel>
                        It will start at 8am onwards and will be closed at 5pm
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>

                  <Accordion allowToggle >
                    <AccordionItem>
                      <h2>
                        <AccordionButton _expanded={{ bg: 'red.500', color: 'white' }}>
                          <Box flex='1' textAlign='left' fontWeight="semibold">
                            How much rates do the Gym offer?
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel>
                        The gym rates if the customer where onsite exercising it cost 50 pesos per day
                        and the customers can use all the equipment. A customer will pay a cost of 500
                        per month if they would like to avail the membership and paying for a cost of 30
                        pesos per day instead of 50 pesos for using a gym. They can request guidance
                        from an instructor, it is only for free.
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>

                  <Accordion allowToggle>
                    <AccordionItem>
                      <h2>
                        <AccordionButton _expanded={{ bg: 'red.500', color: 'white' }}>
                          <Box flex='1' textAlign='left' fontWeight="semibold">
                            How can I purchase a membership?
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel>
                        In purchasing a membership, they can ask on the admin in applying a membership
                        and provide information about membership. Only official members can use the application.
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>

                  <Accordion allowToggle>
                    <AccordionItem>
                      <h2>
                        <AccordionButton _expanded={{ bg: 'red.500', color: 'white' }}>
                          <Box flex='1' textAlign='left' fontWeight="semibold">
                            Does the Gym have an age restriction or gender exception?
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel>
                        Anyone can use the gym and exercise except for the age below 15-10 years old.
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>

                  <Accordion allowToggle>
                    <AccordionItem>
                      <h2>
                        <AccordionButton _expanded={{ bg: 'red.500', color: 'white' }}>
                          <Box flex='1' textAlign='left' fontWeight="semibold">
                            What is Augmented Reality For?
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel>
                        Augmented Reality is used to either visually alter natural environments or to provide
                        users with additional information and possibilities visual changes. The primary
                        advantage of AR is that it blends digital and three-dimensional (3D) components
                        with a persons perception of the real world. Analyzing your surroundings and using
                        triggers to display relevant information in the appropriate location in your field of view.
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>

                  <Accordion allowToggle>
                    <AccordionItem>
                      <h2>
                        <AccordionButton _expanded={{ bg: 'red.500', color: 'white' }}>
                          <Box flex='1' textAlign='left' fontWeight="semibold">
                            How can we assure that the app has security providing personal info?
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel>
                        Based on Republic Act 10173, the Data Privacy Act of 2012.
                        AN ACT PROTECTING INDIVIDUAL PERSONAL INFORMATION IN INFORMATION
                        AND COMMUNICATIONS SYSTEMS IN THE GOVERNMENT AND THE PRIVATE SECTOR,
                        CREATING FOR THIS PURPOSE A NATIONAL PRIVACY COMMISSION, AND FOR OTHER PURPOSES.
                        Yes, application has a privacy policy which can be found when registering.
                        We assure that it is only between the system and the customer’s matter.
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>

                  <Accordion allowToggle>
                    <AccordionItem>
                      <h2>
                        <AccordionButton _expanded={{ bg: 'red.500', color: 'white' }}>
                          <Box flex='1' textAlign='left' fontWeight="semibold">
                            Contact Information
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel>
                        Contact us thru our phone number (09062447988) and our
                        email at zamorafitnessdrive@gmail.com
                        or inform us on our social media account, facebook.com/zamorafitnessdriveandwellnesscenter.
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>



                </Stack>



              </CardBody>
            </Card>





          </Box>
        </Center>


      </Box>

    </>
  )
}

const styleProps = {
  indexWrapper: {
    height: "100vh",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    bgColor: "#22202A",
  },
  formWrapper: {
    borderRadius: "xl",
    width: "54vh",
    height: "50vh",
    flexDirection: "column",
    alignItems: "center",
    padding: "2vh",
    color: "white",
    bgColor: "#E1CBA5",


  }
}