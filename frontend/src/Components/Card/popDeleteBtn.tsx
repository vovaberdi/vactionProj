import { useDisclosure, Button, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, PopoverFooter, ButtonGroup } from "@chakra-ui/react";
import axios from "axios";
import { store } from "../../store/store";
import Vication from "../../models/vicationModel";
import { login } from "../../store/user-state";
import { Icon } from '@iconify/react';
import { render } from "react-dom";




function PopDeleteBtn(props: Vication): JSX.Element {
    const { isOpen, onToggle, onClose } = useDisclosure()
    // setStudent(student.filter(singleStudent => singleStudent.id !== id))

    
    const token = localStorage.getItem('token');

    const deleteId = (id:any) => {
      // store.dispatch(login(id));
      const url = `http://localhost:3001/vication/${id}`;
      axios.delete(url,{
          headers: {authorization: `Bearer ${token}`,
          }
      })
     .then((response) => {console.log(response.data);
     }).catch((error) => {console.log("error", error);});
     
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
            Are you sure you want to delete?
          </PopoverBody>
          <PopoverFooter display='flex' justifyContent='flex-end'>
            <ButtonGroup size='sm'>
              <Button bg='purple.500' onClick={onClose} variant='outline'>Cancel</Button>
              <Button bg='purple.500' onClick={()=>{deleteId(props.id)}} >Apply</Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
        </div>
    );
}

export default PopDeleteBtn;
