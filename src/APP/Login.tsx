import "./login.css"
import { useState} from "react";
import Input from "../component/UI/Input";
import Button from "../component/UI/Button";
import {useSession} from "../Hook/useSession";
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
    const [error, setError] = useState<string |null>(null)



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
                             Login(loginInfo).then((data)=>{
                                 setError(data);

                             })


                            setLoginInfo({
                                username: "",
                                password: "",
                            })

                        }else {
                            setError(" please enter valid data")
                        }

                    }}
                > Login</Button>
            {error && <p>{error}</p>}
            <Link to="/Register">
                <p>Register</p>

            </Link>

        </div>
    );
}

export default Login;