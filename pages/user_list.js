import Head from "next/head";
import {
  Heading,
  Center,
  Flex,
  Button,
  HStack,
  VStack,
  Text,
  Input,
  Box,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Checkbox,
  InputRightElement,
  Switch,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  cancelRef,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  Select,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import React, { useEffect, useState, useContext, useRef } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Textarea, Divider, Header } from "@chakra-ui/react";
import Router from "next/router";
import { db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { useAuth } from "../firebase";
import {
  AttachmentIcon,
  DeleteIcon,
  EditIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import TopDrawer from "../constanst/components/drawer";
import removeUser from "../constanst/services/users/remove_user";
import removeData, {
  getDataWithParam,
  getDatas,
  makeid,
  updateData,
} from "../constanst/services/generic";
import ReusableModal from "../constanst/components/modal";
import moment from "moment/moment";

export default function Dashboard() {
  const [Users, setUsers] = useState([]);
  const cancelRef = React.useRef();
  const [id, setId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [viewUser, setViewUser] = useState({});
  const [hidePassword, setHidePassword] = useState(true);
  const effectRan = useRef(false);
  const toast = useToast();
  const [userId, setUserId] = useState("");
  const onViewModal = useDisclosure();
  const onEditModal = useDisclosure();
  const {
    //modal for registration
    isOpen: isOpenAlertModal,
    onOpen: onOpenAlertModal,
    onClose: onCloseAlertModal,
  } = useDisclosure();
  const {
    //modal for terms and condition
    isOpen: isOpenCheckModal,
    onOpen: onOpenCheckModal,
    onClose: onCloseCheckModal,
  } = useDisclosure();

  const [Posts, setPost] = useState([]);

  const [updateUser, setUpdateUser] = useState({
    address: "",
    age: "",
    birthday: "",
    email: "",
    first_name: "",
    gender: "",
    last_name: "",
    mobile_number: "",
    role: "",
    height: "",
    weight: "",
    bmi: "",
  });
  const [user, setUser] = useState({
    email: "",
    first_name: "",
    last_name: "",
    gender: "",
    birthday: "",
    age: "",
    address: "",
    mobile_number: "",
    password: "",
  });

  useEffect(() => {
    if (effectRan.current === false) {
      getUsersData();
      effectRan.current = true;
    }
    console.log(Users);
  }, []);

  async function getUsersData() {
    setUsers([]);

    const data = await getDatas({ path: "users" });

    setUsers(data);
  }

  async function register() {
    const user_id = makeid(7);
    const docRef = doc(db, "users", user_id);
    await setDoc(docRef, { ...user, id: user_id, role: "customer" });
    toast({
      title: "Register Successfully", //register banner chuchu
      description: "Please Login...",
      status: "success",
      duration: 2500,
      isClosable: true,
      position: "bottom-right",
    });
    Router.reload(window.location.pathname);
  }

  async function editUser() {
    var data = updateUser;
    const updateRef = await updateData({
      path: "users",
      id: data.id,
      data: data,
    });
    toast({
      title: "Data Update",
      description: updateRef.message,
      status: "success",
      duration: 2500,
      isClosable: true,
      position: "bottom-right",
    });
    setUpdateUser({});
    setUserId("");
    onEditModal.onClose();
    getUsersData();
  }

  const processRemoveUser = async (props) => {
    const removeUserAccount = await removeData({ path: "users", id: props });

    if (removeUserAccount.success) {
      toast({
        title: "User Removed Successfully",
        description: removeUserAccount.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onCloseAlertModal();
    } else {
      toast({
        title: "User Operation Failed",
        description: removeUserAccount.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      onCloseAlertModal();
    }
  };

  async function getPosts(props) {
    console.log(props.email);
    const email = props?.email || "jerikadeguzman@gmail.com";
    const data = [];
    const result = await getDataWithParam({ path: "posts", email: email });
    console.log(result);
    setPost(result);
  }

  //props.order, props.status
  async function updateStatus(props) {
    var status = props?.status;
    if (status != "") {
      const userData = { ...props.user, status: status };
      const update = await updateData({
        path: "users",
        id: props?.user?.id,
        data: userData,
      });
      console.log(update.message);
      toast({
        title: "Data Update",
        description: update.message,
        status: "success",
        duration: 2500,
        isClosable: true,
        position: "bottom-right",
      });
    } else {
      toast({
        title: "Data Update",
        description: "Please Select a Status",
        status: "success",
        duration: 2500,
        isClosable: true,
        position: "bottom-right",
      });
    }
    getUsersData();
  }

  const statusOpts = [
    { name: "Active", status: "Active" },
    { name: "Inactive", status: "Inactive" },
  ];
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/aexelogo.png" />
      </Head>

      <Box
        as="section"
        pb={{ base: "12", md: "24" }}
        bg="#D9D9D9"
        maxW="100vw"
        minH="100vh"
      >
        <TopDrawer />
        <Center mt="2%">
          <VStack>
            <VStack>
              <HStack justifyContent="space-between" w="70vw" mt="2%" px="2">
                <Heading color={"#97392F"}>Gym Members</Heading>
                {/* <Button onClick={onOpen} w="10vw" bg="#97392F" colorScheme='cyan' color="white">Create Account</Button> */}
              </HStack>

              <Box
                bg="#ffffff"
                w="100%"
                h="100%"
                padding={5}
                borderRadius={"xl"}
                borderColor={"#97392F"}
                overflowY="auto"
              >
                <TableContainer>
                  <Table variant="simple" fontWeight={"bold"} mt="2%">
                    <Thead position={"sticky"}>
                      <Tr>
                        <Th>User ID</Th>
                        <Th>Name</Th>
                        <Th>Role</Th>
                        <Th>Status</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {Users.length != 0 ? (
                        Users.map((user, index) => {
                          if(user?.status === "Active")
                          return (
                            <Tr key={index}>
                              <Td>{user?.id}</Td>
                              <Td>
                                {user?.first_name + " " + user?.last_name}
                              </Td>
                              <Td>{user?.role}</Td>
                              <Td>{user?.status}</Td>
                              <Td>
                                <HStack>
                                  <Button
                                    bg="green.400"
                                    onClick={() => {
                                      onViewModal.onOpen(),
                                        setViewUser(user),
                                        getPosts(user);
                                    }}
                                  >
                                    <ViewIcon />
                                  </Button>

                                  <Button
                                    bg="cyan.400"
                                    onClick={() => {
                                      onEditModal.onOpen();
                                      setUpdateUser(user);
                                      setUserId(user?.id);
                                    }}
                                  >
                                    <EditIcon />
                                  </Button>

                                  <Button
                                    bg="red.400"
                                    onClick={() => {
                                      setId(user?.id);
                                      onOpenAlertModal();
                                    }}
                                  >
                                    <DeleteIcon />
                                  </Button>

                                  <Select
                                    bg="white"
                                    color="black"
                                    // w='26.5vw'
                                    minW={"180px"}
                                    placeholder="Select Status"
                                    onChange={(e) =>
                                      updateStatus({
                                        user: user,
                                        status: e.target.value,
                                      })
                                    }
                                  >
                                    {statusOpts.map((item) => {
                                      return (
                                        <>
                                          {" "}
                                          <option>{item.name}</option>
                                        </>
                                      );
                                    })}
                                  </Select>
                                </HStack>
                              </Td>
                            </Tr>
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </VStack>
            
            <VStack>
              <HStack justifyContent="space-between" w="70vw" mt="2%" px="2">
                <Heading color={"#97392F"}>Archived Accounts</Heading>
                {/* <Button onClick={onOpen} w="10vw" bg="#97392F" colorScheme='cyan' color="white">Create Account</Button> */}
              </HStack>

              <Box
                bg="#ffffff"
                w="100%"
                h="100%"
                padding={5}
                borderRadius={"xl"}
                borderColor={"#97392F"}
                overflowY="auto"
              >
                <TableContainer>
                  <Table variant="simple" fontWeight={"bold"} mt="2%">
                    <Thead position={"sticky"}>
                      <Tr>
                        <Th>User ID</Th>
                        <Th>Name</Th>
                        <Th>Role</Th>
                        <Th>Status</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {Users.length != 0 ? (
                        Users.map((user, index) => {
                          if(user?.status === "Inactive")
                          return (
                            <Tr key={index}>
                              <Td>{user?.id}</Td>
                              <Td>
                                {user?.first_name + " " + user?.last_name}
                              </Td>
                              <Td>{user?.role}</Td>
                              <Td>{user?.status}</Td>
                              <Td>
                                <HStack>
                                  <Button
                                    bg="green.400"
                                    onClick={() => {
                                      onViewModal.onOpen(),
                                        setViewUser(user),
                                        getPosts(user);
                                    }}
                                  >
                                    <ViewIcon />
                                  </Button>

                                  <Select
                                    bg="white"
                                    color="black"
                                    // w='26.5vw'
                                    minW={"180px"}
                                    placeholder="Select Status"
                                    onChange={(e) =>
                                      updateStatus({
                                        user: user,
                                        status: e.target.value,
                                      })
                                    }
                                  >
                                    {statusOpts.map((item) => {
                                      return (
                                        <>
                                          {" "}
                                          <option>{item.name}</option>
                                        </>
                                      );
                                    })}
                                  </Select>
                                </HStack>
                              </Td>
                            </Tr>
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </VStack>
          </VStack>
        </Center>
      </Box>

      <ReusableModal
        header={"Update User"}
        component={
          <>
            <VStack width={"100%"} alignItems={"flex-start"}>
              <HStack
                alignItems={"stretch"}
                alignSelf={"flex-start"}
                spacing="20"
                width={"100%"}
              >
                <Box>
                  <FormLabel variant="floating">First Name</FormLabel>
                  <Input
                    placeholder="First Name"
                    bg="white"
                    color={"black"}
                    minW={"180px"}
                    w={"15vw"}
                    onChange={(e) => {
                      setUpdateUser({
                        ...updateUser,
                        first_name: e.target.value,
                      });
                    }}
                  />
                </Box>
                <Box>
                  <FormLabel variant="floating">Last Name</FormLabel>
                  <Input
                    placeholder="Last Name"
                    bg="white"
                    color={"black"}
                    minW={"180px"}
                    w={"15vw"}
                    onChange={(e) => {
                      setUpdateUser({
                        ...updateUser,
                        last_name: e.target.value,
                      });
                    }}
                  />
                </Box>
              </HStack>

              <HStack
                alignItems={"stretch"}
                alignSelf={"flex-start"}
                spacing="20"
              >
                <Box>
                  <FormLabel variant="floating">Address</FormLabel>
                  <Input
                    placeholder="Address"
                    bg="white"
                    color={"black"}
                    w={"15vw"}
                    minW={"180px"}
                    onChange={(e) => {
                      setUpdateUser({ ...updateUser, address: e.target.value });
                    }}
                  />
                </Box>
                <Box>
                  <FormLabel variant="floating">Mobile Number</FormLabel>
                  <Input
                    placeholder="Mobile Number"
                    type="number"
                    bg="white"
                    color={"black"}
                    w={"15vw"}
                    minW={"180px"}
                    onChange={(e) => {
                      setUpdateUser({
                        ...updateUser,
                        mobile_number: e.target.value,
                      });
                    }}
                  />
                </Box>
              </HStack>

              <HStack
                alignItems={"stretch"}
                alignSelf={"flex-start"}
                spacing="20"
              >
                <Box>
                  <FormLabel variant="floating">Role</FormLabel>
                  <Select
                    bg="white"
                    color="black"
                    w={"15vw"}
                    minW={"180px"}
                    placeholder="Select Position"
                    onChange={(e) => {
                      setUpdateUser({ ...updateUser, role: e.target.value });
                    }}
                  >
                    <option>Admin</option>
                    <option>User</option>
                  </Select>
                </Box>
                <Box>
                  <FormLabel variant="floating">Gender</FormLabel>
                  <Select
                    bg="white"
                    color="black"
                    w={"15vw"}
                    minW={"180px"}
                    placeholder="Select Gender"
                    onChange={(e) => {
                      setUpdateUser({ ...updateUser, gender: e.target.value });
                    }}
                  >
                    <option>Male</option>
                    <option>Female</option>
                  </Select>
                </Box>
              </HStack>

              <HStack
                alignItems={"stretch"}
                alignSelf={"flex-start"}
                spacing="20"
              >
                <Box>
                  <FormLabel variant="floating">Date of Birth</FormLabel>
                  <Input
                    placeholder="Birthday"
                    bg="white"
                    type="date"
                    color={"black"}
                    w={"15vw"}
                    minW={"180px"}
                    onChange={(e) => {
                      setUpdateUser({
                        ...updateUser,
                        birthday: e.target.value,
                      });
                    }}
                  />
                </Box>
                <Box>
                  <FormLabel variant="floating">Age</FormLabel>
                  <Input
                    placeholder="Age"
                    bg="white"
                    type="number"
                    color={"black"}
                    w={"15vw"}
                    minW={"180px"}
                    onChange={(e) => {
                      setUpdateUser({ ...updateUser, age: e.target.value });
                    }}
                  />
                </Box>
              </HStack>

              <HStack
                alignItems={"stretch"}
                alignSelf={"flex-start"}
                spacing="20"
              >
                <Box>
                  <FormLabel variant="floating">Email</FormLabel>
                  <Input
                    placeholder="Email"
                    bg="white"
                    color={"black"}
                    w={"15vw"}
                    minW={"180px"}
                    onChange={(e) => {
                      setUpdateUser({ ...updateUser, email: e.target.value });
                    }}
                  />
                </Box>
                <Box>
                  <FormLabel variant="floating">Password</FormLabel>
                  <InputGroup>
                    <Input
                      placeholder="password"
                      bg="white"
                      color={"black"}
                      w={"15vw"}
                      type={hidePassword ? "password" : "text"}
                      minW={"180px"}
                      onChange={(e) => {
                        setUpdateUser({
                          ...updateUser,
                          password: e.target.value,
                        });
                      }}
                    />
                    <InputRightElement>
                      {" "}
                      <Switch
                        me="5"
                        colorScheme={"cyan"}
                        size={"lg"}
                        onChange={() => setHidePassword(!hidePassword)}
                      />{" "}
                    </InputRightElement>
                  </InputGroup>
                </Box>
              </HStack>
              <HStack
                alignItems={"stretch"}
                alignSelf={"flex-start"}
                spacing="20"
              >
                <Box>
                  <FormLabel variant="floating">
                    Height (in Centimeter)
                  </FormLabel>
                  <Input
                    placeholder="Height in Centimeter"
                    type="number"
                    bg="white"
                    color={"black"}
                    w={"15vw"}
                    minW={"180px"}
                    onChange={(e) => {
                      setUpdateUser({ ...updateUser, height: e.target.value });
                    }}
                  />
                </Box>
                <Box>
                  <FormLabel variant="floating">Weight</FormLabel>
                  <Input
                    placeholder="Weight in KG"
                    bg="white"
                    type="number"
                    color={"black"}
                    w={"15vw"}
                    minW={"180px"}
                    onChange={(e) => {
                      setUpdateUser({ ...updateUser, weight: e.target.value });
                    }}
                  />
                </Box>
              </HStack>
            </VStack>
          </>
        }
        footer={
          <>
            <Button bg="green" colorScheme="blue" mr={3} onClick={editUser}>
              Save
            </Button>
            <Button
              colorScheme="cyan"
              color={"white"}
              onClick={() => {
                onEditModal.onClose(), setUpdateUser({});
              }}
            >
              Close
            </Button>
          </>
        }
        isOpen={onEditModal.isOpen}
        onClose={() => {
          onEditModal.onClose(), setUpdateUser({});
        }}
      />

      <ReusableModal
        header={"User Details"}
        component={
          <>
            <VStack
              spacing={"1vh"}
              width={"100%"}
              alignItems={"flex-start"}
              fontWeight={"bold"}
              fontSize={"xl"}
              padding={"3%"}
            >
              <Text alignSelf={"flex-end"}>
                {"Date Joined: " + moment(viewUser?.createdAt).format("LL")}
              </Text>
              <HStack>
                <Text>{"Name: "}</Text>
                <Text>{viewUser?.first_name}</Text>
                <Text>{viewUser?.last_name}</Text>
              </HStack>

              <HStack justifyContent={"space-between"} w="100%">
                <Text>
                  {"Birthday: " + moment(viewUser?.birthday).format("LL")}
                </Text>
                <Text>{"Age: " + viewUser?.age + " y.o."}</Text>
                <Text>{"Gender: " + viewUser?.gender}</Text>
              </HStack>

              <HStack>
                <Text>{"Address: "}</Text>
                <Text>{viewUser?.address}</Text>
              </HStack>

              <HStack>
                <Text>{"Email Address: "}</Text>
                <Text>{viewUser?.email}</Text>
              </HStack>

              <Divider></Divider>
              <HStack>
                <Text
                  alignSelf={"flex-start"}
                  fontSize={"3xl"}
                  fontWeight={"bold"}
                >
                  {viewUser?.first_name + "'s Posts"}
                </Text>
              </HStack>

              <HStack>
                <VStack overflowY={"scroll"} minH="30vh" h="25vh" w="30vw">
                  {Posts?.map((item, index) => {
                    return (
                      <>
                        <HStack
                          key={index}
                          color="black"
                          bg={"white"}
                          padding={"1vw"}
                          height={"9vh"}
                          borderRadius={"lg"}
                          width={"25vw"}
                        >
                          <Text fontSize={"1.2vw"} fontWeight={"semibold"}>
                            {item?.caption}
                          </Text>
                        </HStack>
                      </>
                    );
                  })}
                </VStack>
              </HStack>
            </VStack>
          </>
        }
        footer={
          <>
            <Button
              colorScheme="green"
              onClick={() => {
                onViewModal.onClose(), setViewUser({}), setPost([]);
              }}
            >
              Close
            </Button>
          </>
        }
        isOpen={onViewModal.isOpen}
        onClose={() => {
          onViewModal.onClose(), setViewUser({}), setPost([]);
        }}
      />

      <AlertDialog
        isOpen={isOpenAlertModal}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlertModal}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              {"Are you sure? You can't undo this action afterwards."}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseAlertModal}>
                Cancel
              </Button>
              <Button
                backgroundColor={"#F56565"}
                _hover={{ backgroundColor: "#FC8181" }}
                onClick={() => processRemoveUser(id)}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            align="Center" //MODAL NUMBER 1 FOR REGISTRATION
            fontSize="25px"
          >
            Create your account
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Box
              borderwidth="4px"
              borderRadius="lg"
              p={4}
              align="center"
              mt={4}
            >
              <FormControl isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  placeholder="First Name"
                  onChange={(e) =>
                    setUser({ ...user, first_name: e.target.value })
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  placeholder="Last Name"
                  onChange={(e) =>
                    setUser({ ...user, last_name: e.target.value })
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel spacing={3}>Gender</FormLabel>
                <Select
                  placeholder="Select Gender"
                  onChange={(e) => setUser({ ...user, gender: e.target.value })}
                >
                  <option>Female</option>
                  <option>Male</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <HStack spacing={3} paddingTop="3">
                  <FormLabel>Birthdate</FormLabel>
                  <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="date"
                    onChange={(e) =>
                      setUser({ ...user, birthday: e.target.value })
                    }
                  />
                  <FormLabel>Age</FormLabel>
                  <Input
                    placeholder="Age"
                    type="number"
                    onChange={(e) => setUser({ ...user, age: e.target.value })}
                  />
                </HStack>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder={"Email/Username"}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel marginTop={3}>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={"password"}
                    placeholder="Enter password"
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </InputGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel marginTop={3}>Address</FormLabel>
                <Input
                  placeholder="Address"
                  onChange={(e) =>
                    setUser({ ...user, address: e.target.value })
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel marginTop={3}>Phone Number</FormLabel>
                <InputGroup>
                  <InputLeftAddon>+63</InputLeftAddon>
                  <Input
                    type="phone"
                    roundedLeft="0"
                    placeholder="phone number"
                    onChange={(e) =>
                      setUser({ ...user, mobile_number: e.target.value })
                    }
                  />
                </InputGroup>
              </FormControl>

              <Center>
                <Checkbox paddingTop="3" alignContent="center">
                  {" "}
                  I agree to the
                  <Button
                    colorScheme="blackAlpha"
                    variant="link"
                    marginLeft={1}
                    onClick={onOpenCheckModal}
                  >
                    Terms and Condition
                  </Button>
                </Checkbox>
              </Center>
            </Box>
          </ModalBody>

          <ModalFooter>
            <HStack direction="row" spacing={4}>
              <Button
                colorScheme="red" //FOR THE BUTTON OF REGISTRATION
                width={"7vw"}
                alignSelf={"flex-start"}
                type="submit"
                isDisabled={
                  user.email === "" ||
                  user.first_name === "" ||
                  user.last_name === "" ||
                  user.gender === "" ||
                  user.birthday === "" ||
                  user.age === "" ||
                  user.address === "" ||
                  user.mobile_number === "" ||
                  user.password === ""
                    ? true
                    : false
                }
                onClick={() => {
                  register();
                  onClose();
                }}
              >
                Sign Up
              </Button>
              <Button
                colorScheme="red"
                width={"7vw"}
                alignSelf={"flex-end"}
                gap="4"
                onClick={onOpenAlertModal}
              >
                Cancel
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenCheckModal} onClose={onCloseCheckModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader //MODAL NUMBER 2 FOR TERMS AND CONDITION
            textAlign="center"
          >
            Terms and Condition & Privacy Policy
          </ModalHeader>
          <ModalBody>
            <Text as="b"> Privacy Policy </Text>
            <Text marginTop={2} spacing={3} textAlign="justify" lineHeight={6}>
              Methods of Research Aexe: An Augmented Reality Instructor Mobile
              Application On A Vigorous Lifestyle For Zamora Fitness Drive and
              Wellness Center built as a free application for Zamora Fitness
              Drive and Wellness Center customers.
            </Text>
            <Text marginTop={2} spacing={3} textAlign="justify" lineHeight={6}>
              This page is to inform visitors about the policies for collecting,
              using, and disclosing Personal Information if they choose to use
              Aexe application. If the user uses this application Aexe, then the
              user agrees to the collection and use of data in accordance with
              this policy. The application collects Personal Information in
              order to provide and improve the Service. Except as specified in
              this Privacy Policy, the application does not use or share the
              users information with anyone else. Unless otherwise defined in
              this Privacy Policy, the terminology used in this Privacy Policy
              have the same meaning as in our Terms and Conditions, which are
              available at Aexe.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                onCloseCheckModal();
              }}
            >
              I Agree
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
