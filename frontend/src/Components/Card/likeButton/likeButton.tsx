import { useEffect, useState } from "react";
import "./likeButton.css";
import { Icon } from '@iconify/react';
import axios from "axios";
import VicationToLike from "../../../models/VicationToLike";
import { store } from "../../../store/store";


function LikeButton(props: VicationToLike): JSX.Element {

    const [active, setActive] = useState(false);
    const [currUser, setCurrUser] = useState("");
    // const [userLikes, setUserLikes] = useState([]);



    
    const getAllLikes = (user:any) =>{
        const token = localStorage.getItem('token');
        const url = `http://localhost:3001/vicationLike/allLikes/${user}`;
        axios.get(url,{
            headers: {authorization: `Bearer ${token}`},
            })
       .then((response) => {activeLikes(response.data)
        
       }).catch((error) => {console.log("error", error);});
    }

   const activeLikes = (data: any[]) => {
    data.find((item:any) =>{ item.vication_id == props.vication_id && setActive(true)
   })
}

    
  const getUser = () => {
      const loggedInUser:any = localStorage.getItem("user")
            setCurrUser(loggedInUser);
            setTimeout(()=>{getAllLikes(loggedInUser);
           },1000) ;
  };
  
    useEffect(() => {
      getUser();
    //   getAllLikes(currUser);
    }, [store.getState().userState.user]);
  

    const handleClick = () => {
        alert(props.vication_id)
       const user_name = currUser;

        active !== true ? likeClick(props, user_name) : likeDelete(props)
    setActive(!active);
  };
 

    const likeClick = (vacation_id:any , user_name: string) => {
        const follower: VicationToLike = {
            user_name: user_name,
            vication_id: props.vication_id
        }
            const url = 'http://localhost:3001/vication/addLike';
            axios.post(url,follower)
            .then((response) => {console.log(response.data);
           }).catch((error) => {console.log("error", error);});
    }

    const likeDelete = (props:any) => {
        console.log(props.vication_id)
            // store.dispatch(login(id));
            const url = `http://localhost:3001/vication/delLike/${props.vication_id}`;
            axios.delete(url)
            .then((response) => { console.log(response.data)
            }).catch((error) => {console.log("error", error);});
    }


    return (
        <div className="likeButton">
             <button
                onClick={handleClick}
                style={{ color: active ? "red" : "" }}
             >
        <Icon className="icon" icon="il:heart" />
      </button>
			
        </div>
    );
}

export default LikeButton;
