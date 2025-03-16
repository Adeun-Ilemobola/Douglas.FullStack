import React, {useState} from 'react';
import {useSession} from "../Hook/useSession";
import Input from "../component/UI/Input";
import Button from "../component/UI/Button";
import axios, {AxiosError} from "axios";
import Toast from "../component/Toast";
import { useNavigate,} from 'react-router-dom';



function Register() {
    const navigate = useNavigate();
    useSession();
    const [signStart , setSignStart] = useState<boolean>(false);
    const [error, setError] = useState("");
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: "",
        email: "",
        password2: "",
    })
    return (
        <div className={"ROOTX Register"}>
            {error && <Toast type={"danger"} value={error} />}
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
            <Input
                isPassword={true}
                LabelI={"Password"}
                showLabel={true}
                type='password'
                placeholder='Password'
                value={loginInfo.password2}
                disabled={signStart}
                className={"w-55"}
                onChange={(e)=>{setLoginInfo(pre=>({...pre , password2: e.target.value}))}}


            />
            <Button
                className="loginButton"
                onClick={ async () => {
                    if (loginInfo.username && loginInfo.password && loginInfo.password2  && loginInfo.email && loginInfo.password2) {
                        console.log(loginInfo)
                        setSignStart(true)
                         await axios.post("https://nodevap.onrender.com/api/Register", {
                             username: loginInfo.username.trim(),
                             password: loginInfo.password.trim(),
                             email: loginInfo.email.trim(),


                         }).then((data)=>{
                            console.log(data);
                            navigate("/login");
                        }).catch((err)=>{
                             const {response} = err as AxiosError<{ error: string |null, data: object |null}>
                             console.log(response?.data.error);
                             setError(response?.data.error||"");
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