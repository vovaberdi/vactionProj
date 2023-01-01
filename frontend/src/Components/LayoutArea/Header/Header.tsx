import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Text, Divider, IconButton, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { store } from "../../../store/store";
import { useEffect, useState } from "react";
import User from "../../../models/User";
import { login, logout } from "../../../store/user-state";
import userCredentials from "../../../models/credentialsModel";




function Header(): JSX.Element {
    const { colorMode, toggleColorMode } = useColorMode()

    const [currUser, setCurrUser] = useState("");
    const navigate = useNavigate();

   
  const getUser = () => {
    if (localStorage.getItem("user")) {
      const loggedInUser:any = localStorage.getItem("user")
      console.log(loggedInUser)
  
      setCurrUser(loggedInUser);
    }
  };
  
    useEffect(() => {
      getUser();
      // console.log(store.getState().userState.user)
    }, [store.getState().userState.user]);
  
    const logOut = () => {
      store.dispatch(logout());
      setCurrUser("");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
    };
  
    //  console.log(currUser);
    // const logOut = () => {
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("user_name");
    //     navigate("/login"); 
    // }
    
    return (
        <div className="Header">
            <IconButton aria-label="toggle theme"rounded="full"size="xs"position="absolute"left={10}onClick={toggleColorMode}icon={colorMode === "dark" ? <FaSun /> : <FaMoon />} />
            {currUser ? (
            <><NavLink className="myPages" to="/">Home</NavLink>
            <span> | </span>
            <NavLink className="myPages" to="/ListPlaces">ListPlaces</NavLink>
            <span> | </span>
            {currUser == 'admin' && (
            <><NavLink className="myPages" to="/AddVication">AddVication</NavLink><span> | </span><NavLink className="myPages" to="/Chart">Chart</NavLink></>
            )}
            <NavLink style={{float:'right'}} onClick={logOut} className="myPages" to="/Login">logOut</NavLink></>
             ) : ( 
            <NavLink style={{float:'right'}} className="myPages" to="/Login">logIn</NavLink>
             )}
            {/* <span> | </span> */}
            <span style={{marginLeft:'18rem'}} className="myPages">{currUser && `Hello : ${currUser}`}</span>
            <br/>
            <Divider boxShadow='dark-lg' mt="1rem" orientation='horizontal' />
        </div>
    );
}

export default Header;
