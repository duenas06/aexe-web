import Head from 'next/head'
import {
  Heading,
  Center,
  Button,
  Stack,
  HStack,
  VStack,
  Text,
  Box,
  useDisclosure,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialog,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
} from "@chakra-ui/react";
import { Avatar } from '@chakra-ui/react'
import React, { useEffect, useState, useContext } from "react";
import { Textarea } from '@chakra-ui/react'
import { Card, CardBody, CardFooter } from '@chakra-ui/react'
import { TextareaAutosizeProps } from 'react-textarea-autosize';
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth, db, } from "../firebase";
import { addDoc, collection, onSnapshot, serverTimestamp } from 'firebase/firestore';
import TopDrawer from '../constanst/components/drawer';
import UserDataContext from '../context/UserDataContext';
import { DeleteIcon, Icon, SmallCloseIcon } from '@chakra-ui/icons';
import removeData, { addData } from '../constanst/services/generic';


export default function Dashboard() {
  const [url, setUrl] = useState(null);
  const [Posts, setPost] = useState([]);
  const [newPost, setNewPost] = useState("")
  const userDataContext = useContext(UserDataContext);
  const toast = useToast();
  const cancelRef = React.useRef();
  const [removeId, setRemoveId] = useState("")
  const onAlertModal = useDisclosure();
  useEffect(() => {
    setTimeout(() => {
      userDataContext.data ?
        getProfileData(userDataContext.data.profile_url)
        :
        // Router.push("/");
        console.log("no")
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

  useEffect(
    () =>
      onSnapshot(collection(db, "announce"), (snapshot) =>
        setPost(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );
  const createPost = async () => {
    const user_data = JSON.parse(localStorage.getItem("email"))
    const newP = { newPost, timestamp: serverTimestamp(), user: user_data };
    const result = await addData({ path: "announce", data: newP })
    if (result.success) {
      toast({
        title: "Data added Successfully",
        description: result.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Data Operation Failed",
        description: result.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setNewPost("");

  };

  const processRemoveData = async (props) => {
    const dataRef = await removeData({ path: "announce", id: props });

    if (dataRef.success) {
      toast({
        title: "User Removed Successfully",
        description: dataRef.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onAlertModal.onClose()
    } else {
      toast({
        title: "User Operation Failed",
        description: dataRef.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      onAlertModal.onClose()
    }
  };


  return (
    <>
      <Head>
        <title>Announcement</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/aexelogo.png" />
      </Head>

      <Box as="section" pb={{ base: '12', md: '24' }} bg="#ffffff" maxW="100vw" minH="100vh">

        <TopDrawer />

        <Center>
          <Box w="60vw" mt="5vh" p="5em" height="fit-content" minW="500px" borderRadius="md">
            <Center>
              <VStack>
                <Card
                  width="35vw"
                  direction={{ base: 'column', sm: 'row' }}
                  overflow='hidden'
                  bg="#97302F"
                  variant="outline"
                  shadow="base"
                  outlineColor="gray.900"
                  mt="-15%"
                >
                  <Stack>
                    <CardBody bg="#97302F">
                      <Heading size='md' color={"white"} >Post Announcements</Heading>
                      <Center>
                        <Textarea
                          onChange={(event) => { setNewPost(event.target.value) }}
                          input type="text"
                          background={"white"}
                          width="32vw"
                          color={"black"}
                          value={newPost}
                          as={TextareaAutosizeProps} mt="5"
                          minRows={3} resize="none"
                          placeholder="Create post..." />
                      </Center>
                    </CardBody>

                    <CardFooter bg="#97302F">
                      <VStack>
                        <Button
                          bgColor="#E1CBA5"
                          onClick={createPost}
                          className='button'
                          //type="submit"
                          variant='solid'
                          color="white"
                        >Post</Button>
                      </VStack>
                    </CardFooter>
                  </Stack>
                </Card>

                {Posts === undefined ? (<>
                </>)
                  :
                  (Posts.map((data, index) => {
                    return (
                      <Card
                        key={index}
                        width="35vw"
                        direction={{ base: 'column', sm: 'row' }}
                        overflow='hidden'
                        bg="gray.100"
                        variant="outline"
                        shadow="base"
                        outlineColor="gray.900"
                        marginTop="5vh"
                      >
                        <VStack>
                          <CardBody padding={"1em"} paddingTop={"2em"} w={'35vw'}>
                            <HStack justifyContent={'space-between'} >
                              <HStack>
                                <Avatar
                                  src={url}
                                  bg='teal.500'
                                  size="sm" align="center"
                                  marginTop="1"></Avatar>
                                <Heading size='md' color={"black"}>{data?.user?.first_name} {data?.user?.last_name}</Heading>
                                <Text fontSize={10}>{data?.timestamp?.toDate().toDateString()}</Text>
                              </HStack>

                              <Button justifySelf={'flex-end'} colorScheme='red' onClick={() => { onAlertModal.onOpen(), setRemoveId(data?.id) }}><DeleteIcon /></Button>
                            </HStack>

                            <VStack padding={"2em"}>
                              <Text alignSelf={"flex-start"}>{data?.newPost}</Text>
                            </VStack>
                          </CardBody>
                        </VStack>
                      </Card>
                    )
                  }))
                }
              </VStack>

              {/* <Container> 
                    {Posts.map (p => (
                    <span key={p.id}> {p.Posts}, {p.timestamp} </span>))}
                    </Container>*/}
            </Center>
          </Box>
        </Center>
      </Box>

      < AlertDialog
        isOpen={onAlertModal.isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertModal.onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
            >
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              {
                "Are you sure? You can't undo this action afterwards."
              }
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onAlertModal.onClose}
              >
                Cancel
              </Button>
              <Button
                backgroundColor={"#F56565"}
                _hover={{ backgroundColor: "#FC8181" }}
                onClick={() => processRemoveData(removeId)}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog >
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