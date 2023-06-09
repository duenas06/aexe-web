import Head from "next/head";
import {
  Heading,
  Center,
  Flex,
  Button,
  Stack,
  HStack,
  VStack,
  Text,
  Input,
  Box,
  Image,
  useToast,
  FormHelperText,
  InputRightElement,
  Switch,
  useColorModeValue,
  IconButton,
  Container,
  Spacer,
  Divider,
} from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import NextLink from "next/link";
import Router, { useRouter } from "next/router";
import React from "react";
import UserDataContext from "../context/UserDataContext";
import HomeNav from "../constanst/components/home_nav";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Home() {
  const router = useRouter();
  const toast = useToast();
  const userDataContext = useContext(UserDataContext);
  useEffect(() => {
    setTimeout(() => {
      // const checkSession = localStorage.getItem("email");
      // const user_data = JSON.parse(checkSession);
      console.log(userDataContext.data);
      userDataContext.data ? Router.push("/dashboard") : Router.push("/");
    }, []);
  }, []);

  return (
    <>
      <Container maxW="window.innerWidth" p="0" color={"white"}>
        <Head>
          <title>Home</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/aexelogo.png" />
        </Head>
        <HomeNav />
        <Flex
          bgImage={
            "linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url(zamoragym.jpg)"
          }
          height="100vh"
          bgColor={"black"}
          bgSize="cover"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <VStack spacing={10}>
            <Heading fontSize={'3.2vw'} textAlign={"center"}>
              Zamora Fitness Drive and Wellness Center
            </Heading>
            <Divider orientation="horizontal" opacity={0} />
            <Divider orientation="horizontal" opacity={0} />
            <Heading textAlign={"center"} fontSize={"2vw"} w="50vw">
              47 CRJM Pilar Morning Breeze Brgy.085, District 1, Caloocan City,
              Philippines, 1400
            </Heading>
            <Heading textAlign={"center"} fontSize={"1.6vw"} w="50vw">
              09062447988
            </Heading>
            <Divider orientation="horizontal" opacity={0} />
            <Heading textAlign={"center"} fontSize={"1.5vw"} w="50vw">
              8 AM to 10 PM
            </Heading>
          </VStack>
        </Flex>
        <Center mt="5vh">
          <HStack>
            {/* <CCarousel controls indicators w='50vw'>
                            <CCarouselItem>
                                <CImage className="w-70" src={"/abs.jpg"} alt="slide 1" />
                            </CCarouselItem>
                            <CCarouselItem>
                                <CImage className="w-70" src={"/chest.png"} alt="slide 2" />
                            </CCarouselItem>
                            <CCarouselItem>
                                <CImage className="w-70" src={"/fullbody.jpg"} alt="slide 3" />
                            </CCarouselItem>
                        </CCarousel> */}

            <Carousel autoPlay>
              <div>
                <img src="/firstslide.jpg" />
              </div>
              <div>
                <img src="/secondslide.jpg" />
              </div>
              <div>
                <img src="/thirdslide.jpg" />
              </div>
              <div>
                <img src="/fourthslide.jpg" />
              </div>
              <div>
                <img src="/fifthslide.jpg" />
              </div>
            </Carousel>
          </HStack>
        </Center>
        <Flex
          paddingTop="10"
          height="100vh"
          bgSize="cover"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Center>
            <VStack spacing={10}>
              <Image
                boxSize={"25vw"}
                w="90vw"
                objectFit={"contain"}
                src={"/zamoragym.jpg"}
              ></Image>

              <HStack justifyContent={"space-between"} w="67.4vw">
                <VStack alignItems={"left"}>
                  <Heading size="2xl" color={"#97392F"} noOfLines={1}>
                    About Us
                  </Heading>
                  <Divider orientation="horizontal" opacity={0} />
                  <Text w="35vw" color={"CaptionText"} fontSize={"20px"}>
                    Zamora Fitness Drive and Wellness Center is located at the
                    47 CRJM Morning Breeze in Brgy. 085, District 1, Caloocan
                    City. It opens around 8am to 5pm Mondays to Sundays. The
                    owner of this gym is Mr. Julian Zamora who is really into
                    exercising and martial arts. Aexe application is for the
                    customers of Zamora Fitness Drive and Wellness Center that
                    mainly uses Augmented Reality as their instructor. Aexe
                    helps the users to execute their exercises that is based on
                    their current BMI.
                  </Text>
                  {/* <Divider orientation='horizontal' h='25vh' opacity={0} /> */}
                </VStack>
                <Image
                  boxSize={"sm"}
                  borderRadius={5}
                  objectFit={"contain"}
                  src={"/owner.jpg"}
                ></Image>
              </HStack>
            </VStack>
          </Center>
        </Flex>

        <Flex
          paddingTop="50"
          height="100vh"
          bgSize="cover"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <VStack alignItems={"left"}>
            <Heading
              size="2xl"
              color={"#97392F"}
              noOfLines={1}
              paddingTop="50"
              alignItems={"left"}
            >
              Offers and Amenities
            </Heading>
            <HStack
              justifyContent={"space-between"}
              w="50vw"
              paddingTop="55"
              paddingBottom="20"
            >
              <VStack alignItems={"left"}>
                <Heading fontSize="25" textColor="black">
                  Gym Amenities
                </Heading>
                <Text textColor="#97392F" fontWeight="bold">
                  Cycling
                </Text>
                <Text textColor="#97392F" fontWeight="bold">
                  Changing Rooms
                </Text>
                <Text textColor="#97392F" fontWeight="bold">
                  Loaded and Free Weights
                </Text>
                <Text textColor="#97392F" fontWeight="bold">
                  Dumbles
                </Text>
                <Text textColor="#97392F" fontWeight="bold">
                  Comfort Rooms
                </Text>
                <Text textColor="#97392F" fontWeight="bold">
                  Complimentary Toiletries
                </Text>
                <Text textColor="#97392F" fontWeight="bold">
                  Yoga Ball
                </Text>
              </VStack>

              <VStack alignItems={"left"}>
                <Heading fontSize="25" textColor="black">
                  AEXE Exercise
                </Heading>
                <Text textColor="#97392F" fontWeight="bold">
                  Full Body Exercise
                </Text>
                <Text textColor="#97392F" fontWeight="bold">
                  Lower Body Exercise
                </Text>
                <Text textColor="#97392F" fontWeight="bold">
                  Leg and Butt Exercise
                </Text>
                <Text textColor="#97392F" fontWeight="bold">
                  ABS Exercise
                </Text>
                <Text textColor="#97392F" fontWeight="bold">
                  Chest Exercise
                </Text>
                <Text textColor="#97392F" fontWeight="bold">
                  Shoulder Exercise
                </Text>
                <Text textColor="#97392F" fontWeight="bold">
                  Senior Citizen's Exercise
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </Flex>

        <Flex height="20vh" bgSize="cover" bgColor="#97392F">
          <HStack justifyContent={"space-evenly"} w="20vw">
            <VStack alignItems={"left"}>
              <Button
                variant="link"
                textColor="White"
                onClick={() => Router.push("/terms_condition")}
              >
                Terms & Condition
              </Button>
              <Button
                variant="link"
                textColor="White"
                onClick={() => Router.push("/terms_condition")}
              >
                Privacy Policy
              </Button>
              <Button
                variant="link"
                textColor="White"
                onClick={() => Router.push("/user_inquiries")}
              >
                FAQs
              </Button>
            </VStack>
          </HStack>
        </Flex>
      </Container>
    </>
  );
}
