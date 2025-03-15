import "./login.css"
import { useState , useEffect} from "react";
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

    useEffect(() => {
        const timer = setTimeout(() => {
            setError("")
        },2000)

        return () => {clearTimeout(timer)}

    },[error])



    return (
        <div className='ROOTX LOGIN'>

            {error && <div className="alert alert-danger position-absolute top-0 start-100 m-3" role="alert">
                {error}
            </div>}

                <Input
                    LabelI={"Username"}
                    showLabel={true}
                    type='text'
                    placeholder='Username'
                    value={loginInfo.username}
                    className={"loginForm__input"}
                    onChange={(e)=>{setLoginInfo(pre=>({...pre , username: e.target.value}))}} />
                <Input
                    isPassword={true}
                    LabelI={"Password"}
                    showLabel={true}
                    type='password'
                    placeholder='Password'
                    value={loginInfo.password}
                    className={"loginForm__input"}

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

            <Link to="/Register">
                <p>Register</p>

            </Link>

        </div>
    );
}

export default Login;