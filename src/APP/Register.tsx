import React, {useEffect, useState} from 'react';
import {useSession} from "../Hook/useSession";
import Input from "../component/UI/Input";
import Button from "../component/UI/Button";
import axios, {AxiosError} from "axios";
import Toast from "../component/Toast";
import { useNavigate,} from 'react-router-dom';
import z from "zod";

type Meg ={
    message: string,
    show: boolean,
    type:"danger"|"success"|"warning"|"default"

}

function Register() {
    const navigate = useNavigate();
    useSession();
    const [signStart , setSignStart] = useState<boolean>(false);
    const [message, setMessage] = useState<Meg>({
        message: "",
        type:"default",
        show: false
    });
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: "",
        email: "",
    })
    const Z_loginInfo = z.object({
        username: z.string().min(3, 'Username must be at least 3 characters long').max(50, 'Username must be under 50 characters'),
        email: z.string().email('Invalid email address'),
        password: z.string().min(8, 'New password must be at least 8 characters long'),


    })
    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage({
                message:"",
                show:false,
                type:"default"
            })
        },2000)

        return () => {clearTimeout(timer)}

    },[message.show])

   async function handleSubmit() {
        const {data ,error} = Z_loginInfo.safeParse(loginInfo)
        setSignStart(true);
        if (error) {
            setMessage({
                message:error.errors[0].message,
                type:"danger",
                show: true
            })
            setSignStart(false);
            return;

        }

        if (data){
            try {
                await axios.post("https://nodevap.onrender.com/api/Register", {
                    username: loginInfo.username.trim(),
                    password: loginInfo.password.trim(),
                    email: loginInfo.email.trim(),


                })


                setLoginInfo({
                    username: "",
                    password: "",
                    email: "",

                })
                setSignStart(false);
                navigate("/login");

            }catch(err){
                const {response} = err as AxiosError<{error:string |null ,data:object |null }>;
                if (response && response.data.error ){
                    setMessage({
                        message:response.data.error,
                        type:"danger",
                        show: true
                    })


                    console.log(response.data.error)

                }else {


                    setMessage({
                        message:"something went wrong",
                        type:"danger",
                        show: true
                    })

                }
            }finally {
                setSignStart(false);
            }


        }

    }
    return (
        <div className={"ROOTX Register"}>
            {message.show && <Toast type={message.type} value={message.message} />}
            <Input
                LabelI={"Username"}
                showLabel={true}
                type='text'
                placeholder='Username'
                value={loginInfo.username}
                className={"w-55"}
                disabled={signStart}
                onChange={(e)=>{setLoginInfo(pre=>({...pre , username: e.target.value}))}} />


            <Input

                LabelI={"email"}
                showLabel={true}
                type='text'
                placeholder='email'
                value={loginInfo.email}
                disabled={signStart}
                className={"w-55"}
                onChange={(e)=>{setLoginInfo(pre=>({...pre , email: e.target.value}))}}


            />

            <Input
                isPassword={true}
                LabelI={"Password"}
                showLabel={true}
                type='password'
                placeholder='Password'
                value={loginInfo.password}
                disabled={signStart}
                className={"w-55"}
                onChange={(e)=>{setLoginInfo(pre=>({...pre , password: e.target.value}))}}


            />

            <Button
                className="loginButton"
                onClick={handleSubmit}
            > Register</Button>

        </div>
    );
}

export default Register;