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
    Switch, 
    useColorModeValue,
    useBreakpointValue, 
    Container, 
    useDisclosure, 
    FormControl
  } from "@chakra-ui/react";
  import { Avatar } from "@chakra-ui/react"

  const Chat = () => {
    return(
      <Flex p={3} align="center" _hover={{bg: "gray.100", cursor:"pointer"}}>
            <Avatar src="" marginEnd={3}/>
            <Text>user@gmail.com</Text>
            </Flex>
    )
  }


export default function Sidebar(){
    return(


            <Center>
              <Box bg="lavender" h="800px">
                <Flex 
                bg="#8FAADC" 
                w="300px" 
                h="800" 
                borderEnd="2px solid"
                borderColor="gray.200" 
                direction="column">

                    <Flex 
                      h="71px" 
                      w="100%"
                      align="center" 
                      padding={3}
                      borderBottom="1px solid"
                      borderColor="gray.200">
                      
                      <Flex 
                      align="center"
                      p={3}>

                        <Avatar src="" marginEnd={3}/>
                        <Text>jerika</Text>
                      </Flex>

                    </Flex>

                    <Button m={5} p={4}>New Message</Button>
                    
                    <Flex overflowX="scroll" direction="column" sx={{scrollbarWidth: "none"}} flex={1}>
                      <Chat/>
                      <Chat/>
                      <Chat/>
                      <Chat/>
                      <Chat/>
                      <Chat/>
                      <Chat/>
                      <Chat/>
                      <Chat/>
                      <Chat/>
                      <Chat/>
                      <Chat/>
                    </Flex>
                    
                  
                </Flex>
              </Box>
            </Center>
    )
}

