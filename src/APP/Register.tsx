import React, {useState} from 'react';
import {useSession} from "../Hook/useSession.ts";
import Input from "../component/UI/Input.tsx";
import Button from "../component/UI/Button.tsx";
import axios from "axios";

function Register() {
    const {isLoading} = useSession();
    const [signStart , setSignStart] = useState<boolean>(false);
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: "",
        email: "",
        password2: "",
    })
    return (
        <div className={"ROOTX"}>
            <Input
                LabelI={"Username"}
                showLabel={true}
                type='text'
                placeholder='Username'
                value={loginInfo.username}
                ClassName="loginForm__input"
                disabled={signStart}
                onChange={(e)=>{setLoginInfo(pre=>({...pre , username: e.target.value}))}} />


            <Input

                LabelI={"email"}
                showLabel={true}
                type='text'
                placeholder='email'
                value={loginInfo.email}
                disabled={signStart}
                ClassName="loginForm__input"
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
                ClassName="loginForm__input"
                onChange={(e)=>{setLoginInfo(pre=>({...pre , password: e.target.value}))}}


            />
            <Input
                isPassword={true}
                LabelI={"Password"}
                showLabel={true}
                type='password'
                placeholder='Password'
                value={loginInfo.password2}
                disabled={signStart}
                ClassName="loginForm__input"
                onChange={(e)=>{setLoginInfo(pre=>({...pre , password2: e.target.value}))}}


            />
            <Button
                className="loginButton"
                onClick={ async () => {
                    if (loginInfo.username && loginInfo.password && loginInfo.password2  && loginInfo.email && loginInfo.password2) {
                        console.log(loginInfo)
                        setSignStart(true)
                         await axios.post("http://localhost:3000/api/Register", {
                             username: loginInfo.username.trim(),
                             password: loginInfo.password.trim(),
                             email: loginInfo.email.trim(),


                         }).then((data)=>{
                            console.log(data);
                        }).catch((err)=>{
                            console.log(err);
                        })






                        setLoginInfo({
                            username: "",
                            password: "",
                            email: "",
                            password2: "",
                        })
                        setSignStart(false)

                    }
                }}
            > Register</Button>

        </div>
    );
}

export default Register;