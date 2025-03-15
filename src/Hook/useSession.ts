import {useState, useEffect, useCallback} from "react";
import {useLocation, useNavigate,} from 'react-router-dom';
import axios, { AxiosError } from "axios";

import {Session} from "../TYPE";
import {devMode2} from "../lib/db";


export function useSession() {
    const [session, setSession] = useState<Session | null>(null);
    const url = useLocation();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const fetchSession = async () => {
        console.log(url.pathname);
        try {
            setIsLoading(true);
            const getActiveSession: Session | null = JSON.parse(
                sessionStorage.getItem("activeSession") || "null"
            );


            // if the browser does not have   the user Session send the user back to the login
            if (!getActiveSession) {
                setSession(null);
                if (!url.pathname.includes("Register") ) {
                    navigate("/Login");
                }

                return;

            }

            const response = await axios.post(
                devMode2("render" , "Session"),
                getActiveSession
            )

            const {data} = response.data;


            if (data)  {

                setSession(data);
                if (url.pathname.includes("/Login") || url.pathname.includes("/Register")) {
                    navigate("/");

                }


            }else {
                setSession(null);
                navigate("/Login");

            }



        } catch (e) {
           const {response} = e as AxiosError<{ error: string |null, data: object |null}>

            console.log(response?.data)
            setSession(null);
            navigate("/Login");

        } finally {
            setIsLoading(false);
        }

    }

    useEffect(() => {
        fetchSession();
    }, []);


    const refreshSession = useCallback(()=>{
        fetchSession()
    },[fetchSession])


    async function Login({username, password}: { username: string, password: string }): Promise<string | null> {
        setIsLoading(true)
        try {
            const response = await axios.post(devMode2("render" , "Login"), {
                username: username.trim(),
                password: password.trim(),
            })

            const {data} = response.data; // Extract fields directly
            if (data) {
                sessionStorage.setItem("activeSession", JSON.stringify(data || null));
                refreshSession()
                navigate("/");

            }



        } catch (e) {
            if (axios.isAxiosError(e)){
                const err =  e as AxiosError;

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                return err.response.data.error ? err.response.data.error : null;
            }else {
                console.log("Unexpected Error:", e);
            }


        } finally {
            setIsLoading(false)
        }
        return null

    }

    async function Logout() {
        setIsLoading(true);
        setSession(null);
        sessionStorage.setItem("activeSession", JSON.stringify(null));
        navigate("/Login");
       setIsLoading(false);


    }

    return {
        isLoading,
        session,
        Login,
        Logout,
        refreshSession
    }

}