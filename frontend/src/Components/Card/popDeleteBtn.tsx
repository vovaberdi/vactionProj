import { useDisclosure, Button, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, PopoverFooter, ButtonGroup, useToast, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { store } from "../../store/store";
import Vication from "../../models/vicationModel";
import { login } from "../../store/user-state";
import { Icon } from '@iconify/react';
import { render } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";




function PopDeleteBtn(props:{props: Vication}): JSX.Element {

  const [active, setActive] = useState(true);


  const navigat = useNavigate();

  const toast = useToast()

    const { isOpen, onToggle, onClose } = useDisclosure()

    const token = localStorage.getItem('token');

    const deleteId = (props:Vication) => {
      setActive(!active);
      const url = `http://localhost:3001/vication/${props.id}`;
            axios.post(url, props ,{
          headers: {authorization: `Bearer ${token}`,
          }
      })
     .then(() =>{ 
        toasti()
        setActive(!active);
        navigat("/");
        
     }).catch((error) => {console.log("error", error);});

    const toasti = () => {
      toast({title: 'deleted successfully',status: 'success',isClosable: true,})
    }

  }
    return (
        <div className="popDeleteBtn">
      <>
      <Icon onClick={onToggle} className="icon"  icon="carbon:trash-can" />
      <Popover returnFocusOnClose={false}isOpen={isOpen}onClose={onClose} placement='right-end' closeOnBlur={false}>
        <PopoverTrigger>
        <span></span>
        </PopoverTrigger>
        <PopoverContent bg='tomato' color='white'>
          <PopoverHeader fontWeight='semibold'>Confirmation</PopoverHeader>
          <PopoverArrow bg='pink.500' />
          <PopoverCloseButton bg='purple.500'/>
          <PopoverBody>
            Are you sure you want to delete? {active !== true && <Spinner /> }
          </PopoverBody>
          <PopoverFooter display='flex' justifyContent='flex-end'>
            <ButtonGroup size='sm'>
              <Button bg='purple.500' onClick={onClose} variant='outline'>Cancel</Button>
              <Button bg='purple.500' onClick={()=>{deleteId(props.props)}} >Apply</Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
        </div>
    );
}

export default PopDeleteBtn;
