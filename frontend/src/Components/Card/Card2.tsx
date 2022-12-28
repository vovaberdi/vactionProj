import { Badge, Box, Image,  } from "@chakra-ui/react";
import Vication from "../../models/vicationModel";
import "./Card2.css";
import PopDeleteBtn from "./popDeleteBtn";
import EditModal from "./EditModal";
import LikeButton from "./likeButton/likeButton";
import { useEffect, useState } from "react";
import { store } from "../../store/store";






function Cards2(props:Vication): JSX.Element {
  const [currUser, setCurrUser] = useState("");

    
  const getUser = () => {
      const loggedInUser:any = localStorage.getItem("user")
      setCurrUser(loggedInUser);
  };
  
    useEffect(() => {
      getUser();
    }, [store.getState().userState.user]);
  


  const property = {
    imageUrl: `http://localhost:3001/vication/images/${props.imageName}`,
    imageAlt: 'Rear view of modern home with pool',
    from: `${props.start_date}`.toString().split('T')[0],
    to: `${props.end_date}`.toString().split('T')[0],
    description: `${props.description}`,
    formattedPrice: `$ ${props.price}`,
    followers: `${props.followers}`,
    rating: 4,
  }

    return (
        <div className='card-container'>
          <Box  boxShadow='dark-lg' maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Image src={property.imageUrl} alt={property.imageAlt} />
      <Box p='6'>
        <Box display='flex' alignItems='baseline'>
          <Badge borderRadius='full' px='2' colorScheme='teal'>
            {props.destenation}
          </Badge>
          <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
          >
            from {property.from} &bull; to {property.to} 
          </Box>
        </Box>

        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          noOfLines={4}
        >
          {property.description}
        </Box>

        <Box>
          {property.formattedPrice}
          <Box as='span' color='gray.600' fontSize='sm'>
            / wk
          </Box>
        </Box>

        <Box display='flex' mt='2' alignItems='center'>
          
          <Box as='span' ml='2' color='gray.600' fontSize='sm'>
            {property.followers} followers
          </Box>
          <Box>
          {currUser !== "admin" ? <LikeButton  vication_id={props.id}/>
          : <Box display="grid" gridGap={3} gridAutoFlow="row dense"><button><EditModal id={props.id} imageName={props.imageName} description={props.description} destenation={props.destenation} start_date={props.start_date} end_date={props.end_date} price={props.price} image={props.image} followers={props.followers}/></button>  <button><PopDeleteBtn followers={props.followers} id={props.id}/></button> </Box>
          }
          </Box>
          
        </Box>
        



      </Box>
    </Box>
   
       </div>
    );
}

export default Cards2;
