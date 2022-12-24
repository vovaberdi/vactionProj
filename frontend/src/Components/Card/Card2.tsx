import { Badge, Box, Image,  } from "@chakra-ui/react";
import Vication from "../../models/vicationModel";
import "./Card.css";
import { Icon } from '@iconify/react';
import axios from "axios";





function Cards2(props:Vication): JSX.Element {

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
  console.log(props);

  const token = localStorage.getItem('token');

  const deleteCard = (id:number) => {
    const url = `http://localhost:3001/vication/${id}`;
    axios.delete(url,{
        headers: {authorization: `Bearer ${token}`,
        }
    })
   .then((response) => {console.log(response.data);

   }).catch((error) => {console.log("error", error);});
  }

  const like = () => {
    
  }

   const isUser = false;

    return (
        <div className='card-container'>
          <Box  boxShadow='dark-lg' maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Image   src={property.imageUrl} alt={property.imageAlt} />
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
          {isUser ? <button onClick={()=>alert(`${props.id} click`)}><Icon className="icon" icon="il:heart" /></button> 
          : <Box display="grid" gridGap={3} gridAutoFlow="row dense"><button onClick={()=>alert(`${props.id} edit`)}><Icon className="icon"  icon="ri:ball-pen-fill" /></button>   <button onClick={()=>alert(`${props.id} delete`)}><Icon className="icon"  icon="carbon:trash-can" /></button> </Box>
          }
          </Box>
        </Box>



      </Box>
    </Box>
   
       </div>
    );
}

export default Cards2;
