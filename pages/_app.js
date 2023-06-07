import { ChakraProvider, Flex, useMediaQuery } from "@chakra-ui/react";
import THEME_DATA from "../constanst/data/themes/theme_data";
import { UserDataContextProvider } from '../context/UserDataContext';
//import { useAuthState } from 'react-firebase-hooks/auth';
//import { auth } from "../firebaseconfig";
//import {Spinner, Center } from "@chakra-ui/react";
import '@coreui/coreui/dist/css/coreui.min.css'



function MyApp({ Component, pageProps }) {
  const [isLargerThan1280, isLargerThan480] = useMediaQuery([
    '(min-width: 1280px)',
    '(min-width: 480px)',
  ]);

  return (
    <ChakraProvider theme={THEME_DATA}>
      <UserDataContextProvider>
        <Component {...pageProps} />
      </UserDataContextProvider>
    </ChakraProvider>



  );
}

export default MyApp;
