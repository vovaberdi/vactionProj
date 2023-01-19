import { Toast, Button, Container, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { Icon } from '@iconify/react';
import axios from "axios";
import { error } from "console";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Vication from "../../models/vicationModel";




function EditModal(props:{props: Vication}): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure()


    const {register, handleSubmit} = useForm<Vication>();
    const [file, setFile] = useState();

    const navigat = useNavigate();


 

    
    const token = localStorage.getItem('token');
    const send = async (upDateVication:Vication) =>{
      
        upDateVication.image = file;
        const url = `http://localhost:3001/vication/${props.props.id}`;

        upDateVication.followers=props.props.followers;
        upDateVication.imageName=props.props.imageName;

        await axios.put(url, upDateVication ,{
            headers: { authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
            }
        })
        .then((response)=>{
          onClose()
        })
        .catch(error =>{toasti(error);});
    }

    const toasti = (error:any) => {
      Toast({title: `${error}`,status: 'error',isClosable: true,})
    }

    const handleFile = (e: any) => {
        e.preventDefault();
        setFile(e.target.files[0])
    }



    return (
        <div className='EditModal'>
             <>
      <Icon onClick={onOpen} className="icon"  icon="ri:ball-pen-fill" />

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          <Container maxW='md'rounded='md'   bgGradient={['linear(to-tr, teal.300, yellow.400)','linear(to-t, blue.200, teal.500)','linear(to-b, orange.100, purple.300)',]} boxShadow='dark-lg' bg='gray.50' color='black'>
            <form onSubmit={handleSubmit(send)} encType="multipart/form-data">
            <FormControl >

            <FormLabel>description</FormLabel>
            <Input {...register("description")} defaultValue={props.props.description} placeholder='first_name' />

            <FormLabel>destenation</FormLabel>
            <Input {...register("destenation")} defaultValue={props.props.destenation} placeholder='last_name' />

            <FormLabel>image</FormLabel>
            <Input type="file"  onChange={handleFile} placeholder='image' />

            <Input mt={4} {...register("start_date")} defaultValue={props.props.start_date?.toString()} placeholder="start_date"size="md" type="datetime-local"/>

            <Input mt={4} {...register("end_date")} defaultValue={props.props.end_date?.toString()} placeholder="end_date"size="md" type="datetime-local"/>

            <FormLabel>price</FormLabel>
            <Input {...register("price")} defaultValue={props.props.price} placeholder='price' />

            </FormControl>
            <Button mt={4} onClick={()=>send} mb={4} colorScheme='teal' type='submit'> Submit</Button>
          </form>
          </Container>
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme='blue' mr={3}>
              Save
            </Button> */}
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    
       </div>
    );
}

export default EditModal;