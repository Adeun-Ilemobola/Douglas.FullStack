import React from 'react';
import { useNavigate , useLocation  , useParams } from "react-router";
import {useSession} from "../Hook/useSession";

const Settings = () => {
    const {isLoading, session, Logout} = useSession();


    const navigate = useNavigate();
    const url =useLocation();
    const {username , id} = useParams();
    if (isLoading) {
        return (<div className={"LoadingPage"}>Loading...</div>)
    }
    return (
        <div className='ROOTCONPONENT'>

            <h1>Settings</h1>
            <h1>{url.search}</h1>
            <h1>{url.pathname}</h1>
            <h1>{username}</h1>
            <h1>{id}</h1>

        </div>
    );
};

export default Settings;