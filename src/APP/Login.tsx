import "./login.css"
import {useEffect, useState} from "react";
import Input from "../component/UI/Input.tsx";
import Button from "../component/UI/Button.tsx";
import {useSession} from "../Hook/useSession.ts";
import {Link} from "react-router-dom";
function Login() {
    // const stack = [...onther];
    // while (stack > 0 ){
    //     const folder = stack.pop;
    //     if (folder){
    //         const file;
    //         const foldeKid;
    //         folder.kid =[...file , ...foldeKid]
    //         stack.push(...foldeKid);
    //     }
    //
    //
    // }
     const {Login} = useSession();
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: "",
    })



    return (
        <div className='ROOTX LOGIN'>

                <Input
                    LabelI={"Username"}
                    showLabel={true}
                    type='text'
                    placeholder='Username'
                    value={loginInfo.username}
                    ClassName="loginForm__input"
                    onChange={(e)=>{setLoginInfo(pre=>({...pre , username: e.target.value}))}} />
                <Input
                    isPassword={true}
                    LabelI={"Password"}
                    showLabel={true}
                    type='password'
                    placeholder='Password'
                    value={loginInfo.password}
                    ClassName="loginForm__input"
                    onChange={(e)=>{setLoginInfo(pre=>({...pre , password: e.target.value}))}} />
                <Button
                    className="loginButton"
                    onClick={() => {
                        console.log("Button clicked!");  // Debugging
                        if (loginInfo.username && loginInfo.password) {
                            console.log(loginInfo)
                             Login(loginInfo)


                            setLoginInfo({
                                username: "",
                                password: "",
                            })

                        }
                    }}
                > Login</Button>
            <Link to="/Register">
                <p>Register</p>

            </Link>

        </div>
    );
}

export default Login;