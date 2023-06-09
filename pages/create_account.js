import {
    Box, HStack, VStack, Text, Heading, Button, Input, Center,
    FormControl,
    FormLabel,
    useToast,
    Select,
    Flex,
    InputGroup,
    InputRightElement,
    Switch
} from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import Head from "next/head";
import TopDrawer from '../constanst/components/drawer';
import { addData } from "../constanst/services/generic";
import moment from "moment";

export default function CreateAccount() {
    const toast = useToast();
    const router = useRouter();
    const [hidePassword, setHidePassword] = useState(true);
    const [newUser, setNewUser] = useState({})
    const [user, setUser] = useState({
        address: "",
        age: "",
        birthday: "",
        email: "",
        first_name: "",
        gender: "",
        last_name: "",
        mobile_number: "",
        password: "",
        profile_url: "",
        role: "",
        height: 0,
        weight: 0,
        bmi: ""
    })

    async function createAccount() {
        if (user.first_name != "" && user.last_name != ""
            && user.address != ""
            && user.email != "" && user.age != ""
            && user.birthday != "" && user.gender != ""
            && user.mobile_number != "" && user.password != ""
            && user.height != "" && user.weight != "") {
            var h = parseInt(user.height) / 100
            var w = parseInt(user.weight)
            var bmi = w / (h * h)
            setUser({ ...user, bmi: bmi.toFixed(2) })
            console.log(newUser)
            if (user != {}) {
                const add = await addData({ path: "users", data: { ...user, bmi: bmi.toFixed(2), status: "Active" } })
                router.reload(window.location.pathname);
                toast({
                    title: "Created successful",
                    description: add.message,
                    status: "success",
                    duration: 2500,
                    isClosable: true,
                    position: "bottom-right",
                });
            }
        }
    }

    const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const filteredValue = inputValue.replace(/[^a-zA-Z]/g, ''); // Remove any non-letter characters

    event.target.value = filteredValue;
  }

    return (
        <>
            <Head>
                <title>Create Account</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <VStack h={'100%'} minH={'100vh'} minW={'760px'} bg={"#D9D9D9"}>
                <TopDrawer />
                <Center mt="2%">
                    <Box w="60vw" minH="730px" borderRadius={"xl"} shadow="lg" minW={'590px'} bg="#97392F">
                        <FormControl isRequired
                            padding={15}
                            justifyContent="center"
                            color="white">
                            <VStack alignItems={"center"} spacing="1vw" padding={"4"}>
                                <Heading size={"lg"}>Create User Account</Heading>
                                <HStack alignItems={"stretch"} alignSelf={"flex-start"} spacing="20">
                                    <Box>
                                        <FormLabel variant="floating">First Name</FormLabel>
                                        <Input placeholder="First Name" bg="white" color={"black"} w="25vw" minW={'150px'} onChange={(e) => {
                                            handleInputChange(e)
                                            setUser({ ...user, first_name: e.target.value });
                                        }} />
                                    </Box>
                                    <Box>
                                        <FormLabel variant="floating">Last Name</FormLabel>
                                        <Input placeholder="Last Name" bg="white" color={"black"} w="25vw" minW={'150px'} onChange={(e) => {
                                             handleInputChange(e)
                                            setUser({ ...user, last_name: e.target.value });
                                        }} />
                                    </Box>
                                </HStack>

                                <HStack alignItems={"stretch"} alignSelf={"flex-start"} spacing="20">
                                    <Box>
                                        <FormLabel variant="floating">Address</FormLabel>
                                        <Input placeholder="Address" bg="white" color={"black"} w="25vw" minW={'150px'} onChange={(e) => {
                                            setUser({ ...user, address: e.target.value });
                                        }} />
                                    </Box>
                                    <Box>
                                        <FormLabel variant="floating">Mobile Number</FormLabel>
                                        <Input type='number' placeholder="Mobile Number" bg="white" color={"black"} w="25vw" minW={'150px'} onChange={(e) => {
                                            setUser({ ...user, mobile_number: e.target.value });
                                        }} />
                                    </Box>
                                </HStack>

                                <HStack alignItems={"stretch"} alignSelf={"flex-start"} spacing="20">
                                    <Box>
                                        <FormLabel variant="floating">Role</FormLabel>
                                        <Select
                                            bg="white"
                                            color="black"
                                            w="25vw" minW={'150px'}
                                            placeholder='Select Position'
                                            onChange={(e) => {
                                                setUser({ ...user, role: e.target.value });
                                            }}>
                                            <option>Admin</option>
                                            <option>User</option>
                                        </Select>
                                    </Box>
                                    <Box>
                                        <FormLabel variant="floating">Gender</FormLabel>
                                        <Select
                                            bg="white"
                                            color="black"
                                            w="25vw" minW={'150px'}
                                            placeholder='Select Gender'
                                            onChange={(e) => {
                                                setUser({ ...user, gender: e.target.value });
                                            }}>
                                            <option>Male</option>
                                            <option>Female</option>
                                        </Select>
                                    </Box>
                                </HStack>

                                <HStack alignItems={"stretch"} alignSelf={"flex-start"} spacing="20">
                                    <Box>
                                        <FormLabel variant="floating">Date of Birth</FormLabel>
                                        <Input placeholder="Birthday" bg="white" type="date" color={"black"} w="25vw" minW={'150px'} onChange={(e) => {
                                            setUser({ ...user, birthday: e.target.value });
                                        }} />
                                    </Box>
                                    <Box>
                                        <FormLabel variant="floating">Age</FormLabel>
                                        <Input placeholder="Age" bg="white" type="number" color={"black"} w="25vw" minW={'150px'} onChange={(e) => {
                                            setUser({ ...user, age: e.target.value });
                                        }} />
                                    </Box>
                                </HStack>

                                <HStack alignItems={"stretch"} alignSelf={"flex-start"} spacing="20">
                                    <Box>
                                        <FormLabel variant="floating">Email</FormLabel>
                                        <Input placeholder="Email" bg="white" color={"black"} w="25vw" minW={'150px'} onChange={(e) => {
                                            setUser({ ...user, email: e.target.value });
                                        }} />
                                    </Box>
                                    <Box>
                                        <FormLabel variant="floating">Password</FormLabel>
                                        <InputGroup>
                                            <Input placeholder="password" bg="white" color={"black"} w="25vw" type={hidePassword ? "password" : "text"} minW={'150px'} onChange={(e) => {
                                                setUser({ ...user, password: e.target.value });
                                            }} />
                                            <InputRightElement>
                                                <Switch
                                                    me='5'
                                                    colorScheme={"cyan"}
                                                    size={"lg"}
                                                    onChange={() => setHidePassword(!hidePassword)}
                                                />
                                            </InputRightElement>
                                        </InputGroup>
                                    </Box>
                                </HStack>
                                <HStack alignItems={"stretch"} alignSelf={"flex-start"} spacing="20">
                                    <Box>
                                        <FormLabel variant="floating">Height</FormLabel>
                                        <Input placeholder="Height in Centimeter" type="number" bg="white" color={"black"} w="25vw" minW={'150px'} onChange={(e) => {
                                            setUser({ ...user, height: e.target.value });
                                        }} />
                                    </Box>
                                    <Box>
                                        <FormLabel variant="floating">Weight</FormLabel>
                                        <Input placeholder="Weight in KG" bg="white" type="number" color={"black"} w="25vw" minW={'150px'} onChange={(e) => {
                                            setUser({ ...user, weight: e.target.value });
                                        }} />
                                    </Box>
                                </HStack>



                                <Button
                                    mt="2vh"
                                    w="25vw"
                                    bgColor="#F04141"
                                    colorScheme=""
                                    minW={'180px'}
                                    type="submit"
                                    onClick={createAccount}
                                >Register</Button>
                            </VStack>
                        </FormControl>
                    </Box>
                </Center>
            </VStack>
        </>
    );

}