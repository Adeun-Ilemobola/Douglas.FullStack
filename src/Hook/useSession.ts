import {useState, useEffect, useCallback} from "react";
import {useLocation, useNavigate,} from 'react-router-dom';
import axios from "axios";
import {Session} from "../TYPE";


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

            console.log(
                "getActiveSession in session: ",
                getActiveSession
            )
            // if the browser does not have   the user Session send the user back to the login
            if (!getActiveSession) {
                console.log("getActiveSession: no activeSession");
                setSession(null);
                navigate("/Login");
                return;

            }


            const response = await axios.post(
                "https://nodevap.onrender.com/api/Session",
                getActiveSession
            );
            const {data, error} = response.data;

            if (error) {
                setSession(null);
                console.log("Session not found-1");
                setSession(null);
                navigate("/Login");

            }
            if (data) {
                console.log(data);
                setSession(data || null);

            }


        } catch (e) {
            if (axios.isCancel(e)) {
                console.log("Session validation cancelled.");

            } else {

                console.log(e)
            }

        } finally {
            setIsLoading(false);
        }

    }

    useEffect(() => {
        if (!session) {
            fetchSession();
        }
    }, [session ]);


    const refreshSession = useCallback(()=>{
        fetchSession()
    },[])


    async function Login({username, password}: { username: string, password: string }) {
        setIsLoading(true)
        try {
            const response = await axios.post("https://nodevap.onrender.com/api/login", {
                username: username.trim(),
                password: password.trim(),
            })

            console.log("Response:", response.data);
            const {error, data} = response.data; // Extract fields directly
            if (error) {
                console.log("Login Error:", error);
                return;
            }
            if (data) {
                sessionStorage.setItem("activeSession", JSON.stringify(data || null));
                refreshSession()
                navigate("/");

            }


        } catch (e) {

            console.log(e)
        } finally {
            setIsLoading(false)
        }


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