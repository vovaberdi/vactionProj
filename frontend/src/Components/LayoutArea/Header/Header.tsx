import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Text, Divider, IconButton, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { store } from "../../../store/store";
import { useEffect, useState } from "react";
import User from "../../../models/User";
import { login } from "../../../store/user-state";




function Header(): JSX.Element {
    const { colorMode, toggleColorMode } = useColorMode()

    const [currUser, setCurrUser] = useState("");
    const navigate = useNavigate();
  
    const getUser = async () => {
      if (localStorage.getItem("user_name")) {
        const loggedInUser = await JSON.parse(
          localStorage.getItem("user") as string
        );
        setCurrUser(loggedInUser);
      }
    };


    useEffect(() => {
      getUser();
      console.log(currUser)
    }, [store.getState().userState]);
  
    // const logOut = () => {
      // store.dispatch(logut());
    //   setCurrUser(undefined);
    //   localStorage.removeItem("user");
    //   navigate("/login");
    // };
  

    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_name");
        navigate("/login"); 
    }
    
    return (
        <div className="Header">
            <IconButton aria-label="toggle theme"rounded="full"size="xs"position="absolute"left={10}onClick={toggleColorMode}icon={colorMode === "dark" ? <FaSun /> : <FaMoon />} />
            {/* { user ? ( */}
            <><NavLink className="myPages" to="/">Home</NavLink>
            <span> | </span>
            <NavLink className="myPages" to="/ListPlaces">ListPlaces</NavLink>
            <span> | </span>
            <NavLink className="myPages" to="/AddVication">AddVication</NavLink>
            <span> | </span>
            <NavLink onClick={logOut} className="myPages" to="/Login">logOut</NavLink></>
            {/* ) : ( */}
            <NavLink className="myPages" to="/Login">logIn</NavLink>
            <span> | </span>
            <NavLink className="myPages" to="/ListPlaces">Hello: {currUser}</NavLink>
                   
            {/* )} */}
            <br/>
            <Divider boxShadow='dark-lg' mt="1rem" orientation='horizontal' />
        </div>
    );
}

export default Header;
