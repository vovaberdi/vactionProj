import {Box,Button,Checkbox,Container,Divider,FormControl,FormLabel,Heading,HStack,Input,Stack,Text,useBreakpointValue,useColorModeValue,} from '@chakra-ui/react'
  import { Logo } from './Logo'
  import { OAuthButtonGroup } from './OAuthButtonGroup'
  import { PasswordField } from './PasswordField'
  import "./Login.css";
import { useForm } from 'react-hook-form';
import User from '../../../models/User';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { store } from '../../../store/store';
import { login } from '../../../store/user-state';
import userCredentials from '../../../models/credentialsModel';
import Register from '../../Register/Register';

function Login(): JSX.Element {

    const {register, handleSubmit} = useForm<User>();
    const navigat = useNavigate();


    const send = async (credentials:userCredentials) =>{
        localStorage.setItem("user_name", credentials.user_name);
          //  store.dispatch(login(credentials));

        const url = "http://localhost:3001/user/auth/login";
        await axios.post(url, credentials).then((response)=>{ 
          console.log(response);
          localStorage.setItem("token", response.data);
          navigat("/ListPlaces")
            // console.log(store.getState());
        })
        .catch(error =>{console.log(error);});
        navigat("/");
    }

    
    return (
        <div className="Login">
			<Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
    <Stack spacing="8">
      <Stack spacing="6">
        <Logo />
        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
          <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
            Log in to your account
          </Heading>
          <HStack spacing="1" justify="center">
            <Text color="muted">Don't have an account?</Text>
            <Button onClick={()=>{navigat("/Register")}} variant="link" colorScheme="blue">
              Sign up
            </Button>
          </HStack>
        </Stack>
      </Stack>
      <Box
        py={{ base: '0', sm: '8' }}
        px={{ base: '4', sm: '10' }}
        bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
        boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
        borderRadius={{ base: 'none', sm: 'xl' }}
      >
        <Stack spacing="6">
          <Stack spacing="5">
          <form onSubmit={handleSubmit(send)}>
            <FormControl>
              <FormLabel htmlFor="user_name">user_name</FormLabel>
              <Input {...register("user_name")} id="user_name" type="user_name" />
            </FormControl>
            <PasswordField {...register("password")}/>
            <Button mt={4} type='submit' colorScheme='purple' variant="solid">Sign in</Button>
            </form>
          </Stack>
          <HStack justify="space-between">
            <Checkbox defaultChecked>Remember me</Checkbox>
            <Button variant="link" colorScheme="blue" size="sm">
              Forgot password?
            </Button>
          </HStack>
          <Stack spacing="6">
            <HStack>
              <Divider />
              <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                or continue with
              </Text>
              <Divider />
            </HStack>
            <OAuthButtonGroup />
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Container>
        </div>
    );
}

export default Login;
