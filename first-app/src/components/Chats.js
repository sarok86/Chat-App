import React , { useState, useEffect , useContext } from 'react';
import { auth } from '../firebase';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from "react-chat-engine";
import axios from "axios"


// Components
import Navbar from './Navbar';

// Styles
import styles from "./Chats.module.css"

// Context
import {AuthContext} from "../contexts/AuthContextProvider"

const Chats = () => {

    const [loading,setLoading] = useState(true);
    const user = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        if(!user){
            history.push("/");
            return;
        }

        axios.get("https://api.chatengin.io/users/me",{
            headers:{
            "project-id":"2baa621a-2a98-4dba-9cba-de0e15bdea9b",
            "user-name":user.email,
            "user-secret":user.uid
            }
        })
        .then(() => {
            setLoading(false)
        })
        .catch(() =>{})
        let formdata = new FormData();
        formdata.append("email",user.email);
        formdata.append("username",user.email);
        formdata.append("secret",user.uid);
        getFile(user.photoURL)
            .then(avatar =>{
                formdata.append("avatar",avatar,avatar.name)
                axios.post("https://api.chatengin.io/users/",formdata,{
                    headers:{
                        "private-key" :"97f3691c-e40d-4d65-bfab-d7c95a737fdf"
                    }
                })
                .then(() => setLoading(false))
                .catch(error => console.log(error))
            })
    },[user,history])

    const getFile = async (rl) =>{
        const response = await fetch(rl);
        const data = await response.blob();
        return new File ([data], "userPhoto.jpg",{type:"image/jpg"})
    }

    const logoutHandler = async() =>{
        await auth.signOut();
        history.push("/")
    }

    if (!user || loading ) return "Loading..."

    return (
        <div className={styles.container}>
           <Navbar logoutHandler={logoutHandler}/> 

           <ChatEngine 
                height="calc(100vh - 50px)"
                projectID="2baa621a-2a98-4dba-9cba-de0e15bdea9b"
                userName={user.email}
                userSecret={user.uid}
           />
        </div>
    );
};

export default Chats;