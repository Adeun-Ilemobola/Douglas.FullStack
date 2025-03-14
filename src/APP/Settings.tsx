import React, {useEffect, useState} from 'react';
import { useParams } from "react-router";
import z from "zod"
import {useSession} from "../Hook/useSession";
import Input from "../component/UI/Input";
import axios , {AxiosError} from "axios";
import {devMode} from "../lib/db";
import Button from "../component/UI/Button";
// {username:string , password:string , email:string , newPassword:string , oldPassword:string , passwordConfirm:string , isNewpassword:boolean}
const Settings = () => {
    const URL = devMode("render")

    const {isLoading} = useSession();
    const [formInfo  , setFormIfo] = useState({
        username: "",
        email: "",
        newPassword:"",
        oldPassword:"",
        passwordConfirm:"",
        isNewpassword: false,

    });
    const [onChange , setChange] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)

    const {username , id} = useParams();
    const Z_FormInfo = z.object({
        username: z.string().min(3, 'Username must be at least 3 characters long').max(50, 'Username must be under 50 characters'),
        email: z.string().email('Invalid email address'),
        newPassword: z.string().min(8, 'New password must be at least 8 characters long').optional(),
        oldPassword: z.string().min(8, 'Old password must be at least 8 characters long').optional(),
        passwordConfirm: z.string().optional(),
        isNewpassword: z.boolean(),
    }).refine((data) => {
        if (data.isNewpassword) {
            return data.newPassword === data.passwordConfirm;
        }
        return true;
    }, {
        message: 'Passwords do not match',
        path: ['passwordConfirm'],
    });
    useEffect(() => {
        const timer = setTimeout(() => {
            setError("")
        },1500)

        return () => {clearTimeout(timer)}

    },[error])

    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccess("")
        },2000)

        return () => {clearTimeout(timer)}

    },[success])



    if (isLoading) {
        return (<div className={"LoadingPage"}>Loading...</div>)
    }

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        const {value , name} = e.target;
        if (name === "newPassword" || name === "passwordConfirm" || name === "oldPassword") {
            if (value.length >0){
                setFormIfo(prevState => ({...prevState, isNewpassword: true }));

            }
        }
        setFormIfo(prevState => ({...prevState, [name]: value }));
        setChange(true)

    }
    async function Send() {
        if (onChange) {
            const validForm = Z_FormInfo.safeParse(formInfo)
            if (validForm.error) {
                setError(validForm.error.errors[0].message)

                return;
            }
            if (validForm.data){
                setError("");
                try {
                    const {data} = await axios.put(
                        `${URL}user/${id}`,
                        {
                            ...validForm.data
                        }
                    )

                    if (data){
                        console.log(data)
                        setSuccess(" successfully updated account")
                    }

                }catch(e){
                    const {response} = e as AxiosError<{error:string |null ,data:object |null }>;
                    if (response && response.data.error ){
                        setError(response.data.error)
                        console.log(response.data.error)

                    }else {
                        setError(" something went wrong")

                    }
                }

            }

        }

        setLoading(false);


    }


    return (
        <div className='ROOTCONPONENT'>
            {error && <div className="alert alert-danger position-absolute top-0 start-0 m-3" role="alert">
                {error}
            </div>}



            <main className='MAINPAGE Settings'>
                <h1> settings for {username ? username : ""}</h1>
                <form className={"formX"} onSubmit={(e)=>{
                    e.preventDefault();
                    setLoading(true)
                    Send()
                }}>
                    <Input disabled={loading}  className={"w-55"}   showLabel={true} LabelI="username" name="username" onChange={handleInput} />
                    <Input disabled={loading}  className={"w-55"}   showLabel={true} LabelI="email" name="email" onChange={handleInput} />
                    <Input disabled={loading} className={"w-55"}    showLabel={true} LabelI="newPassword" name="newPassword" onChange={handleInput} isPassword={true} />
                    <Input disabled={loading}  className={"w-55"}   showLabel={true} LabelI="oldPassword" name="oldPassword" onChange={handleInput} isPassword={true} />
                    <Input disabled={loading}  className={"w-55"}   showLabel={true} LabelI="passwordConfirm" name="passwordConfirm" onChange={handleInput} isPassword={true} />

                    <Button disabled={loading} type={"submit"}>{loading ? "loading" : "update"} </Button>


                </form>

            </main>


        </div>
    );
};

export default Settings;