import { useEffect, useState } from "react";
import "./likeButton.css";
import { Icon } from '@iconify/react';
import axios from "axios";
import VicationToLike from "../../../models/VicationToLike";
import { store } from "../../../store/store";


function LikeButton(props: VicationToLike): JSX.Element {

    const [active, setActive] = useState(false);
    const [currUser, setCurrUser] = useState("");

    
  const getUser = () => {
      const loggedInUser:any = localStorage.getItem("user")
      setCurrUser(loggedInUser);
  };
  
    useEffect(() => {
      getUser();
    }, [store.getState().userState.user]);
  

    // const objToLive =() =>{
    //     const user_name = store.getState().userState;
    //     const vicationId = props.vication_id;
    //     const objLike = {user_name,vicationId};
    //     return objLike;
    // }



    const handleClick = () => {
        active !== true && likeClick(props)
    setActive(!active);
  };
 

    const likeClick = (userLike:VicationToLike) => {
        console.log(currUser);
        console.log(userLike.vication_id);
            // store.dispatch(login(id));
            userLike.vication_id=props.vication_id;
            userLike.user_name = currUser;
            const url = 'http://localhost:3001/vication/addLike';
            axios.post(url,userLike)
            .then((response) => {console.log(response.data);
           }).catch((error) => {console.log("error", error);});
    }

    const likeDelete = (id:number) => {
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
