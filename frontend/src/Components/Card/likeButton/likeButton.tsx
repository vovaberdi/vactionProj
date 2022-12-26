import { useEffect, useState } from "react";
import "./likeButton.css";
import { Icon } from '@iconify/react';
import axios from "axios";
import VicationToLike from "../../../models/VicationToLike";
import { store } from "../../../store/store";


function LikeButton(props: VicationToLike): JSX.Element {

    const [active, setActive] = useState(false);

    useEffect(()=>{
        // objToLive();
    },[])

    // const objToLive =() =>{
    //     const user_name = store.getState().userState;
    //     const vicationId = props.vication_id;
    //     const objLike = {user_name,vicationId};
    //     return objLike;
    // }



    const handleClick = () => {
        // active === true ? likeDelete(id) : likeClick(props.vication_id);
    setActive(!active);
  };


 

    const likeClick = (likeBtn:VicationToLike) => {
            // store.dispatch(login(id));
            const url = `http://localhost:3001/vication/addLike`;
            axios.post(url,likeBtn)
            .then((response) => {console.log(response.data);
           }).catch((error) => {console.log("error", error);});
    }

    const likeDelete = (id:number) => {
            // store.dispatch(login(id));
            const url = `http://localhost:3001/vication/delLike/${id}`;
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
