import "./AddVication.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import {FormControl, Input, Button, Container, FormLabel,} from '@chakra-ui/react'
import Vication from "../../../models/vicationModel";
import axios from "axios";
import { useState } from "react";


function AddVication(): JSX.Element {

    const {register, handleSubmit} = useForm<Vication>();
    const [file, setFile] = useState();

    const navigat = useNavigate();


 

    
    const token = localStorage.getItem('token');
    console.log(token);
    const send = async (newVication:Vication) =>{
        newVication.image = file;
        console.log(newVication.image);
        const url = "http://localhost:3001/vication/add";
        newVication.followers=0;
        await axios.post(url, newVication ,{
            headers: { authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
            }
        })
        .then((response)=>{console.log(response)
        navigat("/ListPlaces")
        })
        .catch(error =>{console.log(error);});
    }

    const handleFile = (e: any) => {
        e.preventDefault();
        setFile(e.target.files[0])
    }

    return (
        <div className="AddVication">

        <Container maxW='md'rounded='md'   bgGradient={['linear(to-tr, teal.300, yellow.400)','linear(to-t, blue.200, teal.500)','linear(to-b, orange.100, purple.300)',]} boxShadow='dark-lg' bg='gray.50' color='black'>
            <form onSubmit={handleSubmit(send)} encType="multipart/form-data">
            <FormControl isRequired>

            <FormLabel>description</FormLabel>
            <Input {...register("description")} placeholder='first_name' />

            <FormLabel>destenation</FormLabel>
            <Input {...register("destenation")} placeholder='last_name' />

            <FormLabel>image</FormLabel>
            <Input type="file"  onChange={handleFile} placeholder='image' />

            <Input mt={4} {...register("start_date")} placeholder="start_date"size="md" type="datetime-local"/>

            <Input mt={4} {...register("end_date")} placeholder="end_date"size="md" type="datetime-local"/>

            <FormLabel>price</FormLabel>
            <Input {...register("price")} placeholder='price' />

            </FormControl>
            <Button mt={4} onClick={()=>send} mb={4} colorScheme='teal' type='submit'> Submit</Button>
          </form>
          </Container>
         
        </div>
        
    );
}

export default AddVication;





