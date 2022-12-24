import { Box, SimpleGrid, Wrap } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Vication from "../../../models/vicationModel";
import Cards from "../../Card/Card";
import Cards2 from "../../Card/Card2";
import "./ListPlaces.css";


function ListPlaces(): JSX.Element {

    const [vication, setVication] = useState<Vication[]>();
    

    const token = localStorage.getItem('token');
    useEffect(() => {
        const url = "http://localhost:3001/vication/all";
        axios.get(url,{
            headers: {authorization: `Bearer ${token}`,
            }
        })
       .then((response) => {console.log(response.data);
  
        setVication(response.data);
  
       }).catch((error) => {console.log("error", error);});
   }, []);
   
  
      
    return (
        <div className="ListPlaces">
            <Box  display="flex"  alignItems="center" justifyContent="space-between">
            <SimpleGrid  columns={{ sm: 2, md: 4 }} spacing='8' p='10' textAlign='center' rounded='lg' color='gray.400'>

             {vication?.map(item=><Cards2 key={item.id} id={item.id} price={item.price} end_date={item.end_date} start_date={item.start_date} imageName={item.imageName} description={item.description} destenation={item.destenation} followers={item.followers}/>)}
             
            </SimpleGrid>
            </Box>
         


        </div>
    );
}

export default ListPlaces;





