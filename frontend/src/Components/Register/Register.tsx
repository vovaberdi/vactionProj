import { Button, Container, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import User from "../../models/User";
import { store } from "../../store/store";
import { login } from "../../store/user-state";
import "./Register.css";

function Register(): JSX.Element {

    const {register, handleSubmit} = useForm<User>();
    const navigat = useNavigate();

   
    const send = async (newUser:User) =>{

        // store.dispatch(login(newUser));

        const url = "http://localhost:3001/user/auth/register";
        await axios.post(url, newUser).then((response)=>{
            const token:any = response.headers.authorization;
            localStorage.setItem("token", token);
            localStorage.setItem("user", response.data);
            store.dispatch(login(response.data));
    })
        .catch(error =>{console.log(error);});
        navigat("/ListPlaces");
    }

    return (
        <div className="Register">
             <Container maxW='md'rounded='md'   bgGradient={['linear(to-tr, teal.300, yellow.400)','linear(to-t, blue.200, teal.500)','linear(to-b, orange.100, purple.300)',]} boxShadow='dark-lg' bg='gray.50' color='black'>
            <form onSubmit={handleSubmit(send)}>
            <FormControl isRequired>

            <FormLabel>first_name</FormLabel>
            <Input {...register("f_name")} placeholder='first_name' />

            <FormLabel>last_name</FormLabel>
            <Input {...register("l_name")} placeholder='last_name' />

            <FormLabel>user_name</FormLabel>
            <Input {...register("user_name")} placeholder='personal_id' />

            <FormLabel>password</FormLabel>
            <Input {...register("password")} placeholder='tel' />

            </FormControl>
            <Button mt={4} onClick={()=>send} mb={4} colorScheme='teal' type='submit'> Submit</Button>
          </form>
          </Container>
        </div>
    );
}

export default Register;
