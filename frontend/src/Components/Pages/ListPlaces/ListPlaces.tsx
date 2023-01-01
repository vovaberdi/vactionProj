import { Box, Container, SimpleGrid, Wrap } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Vication from "../../../models/vicationModel";
import Cards2 from "../../Card/Card2";
import "./ListPlaces.css";
import ReactPaginate from "react-paginate";

const PER_PAGE = 8;

function ListPlaces(): JSX.Element {

    const [vication, setVication] = useState<Vication[]>([]);
    const [currentPage, setCurrentPage] = useState(0); 
    

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

   const handlePageClick = ({selected: selectedPage}:any) =>{
    setCurrentPage(selectedPage);
   }

   const offset = currentPage * PER_PAGE;

   const currentPageData = vication
   .slice(offset, offset + PER_PAGE)
   .map(item=> <Cards2 key={item.id} id={item.id} price={item.price} end_date={item.end_date} start_date={item.start_date} imageName={item.imageName} description={item.description} destenation={item.destenation} followers={item.followers}/>)

   const pageCount = Math.ceil(vication.length / PER_PAGE);
   
  
      
    return (
        <div className="ListPlaces">
            <Box alignItems="center" justifyContent="space-between">
             <ReactPaginate 
                previousLabel={"⬅️Previous"}
                nextLabel={"Next➡️"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"Pagination"}
                previousLinkClassName={"pagination_link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
                />
                </Box>
            <Box  display="flex"  alignItems="center" justifyContent="space-between">
                
            <SimpleGrid  columns={{ sm: 2, md: 4 }} spacing='8' p='10' textAlign='center' rounded='lg' color='gray.400'>
            
                {currentPageData}
                
            </SimpleGrid>
            </Box>
         


        </div>
    );
}

export default ListPlaces;





