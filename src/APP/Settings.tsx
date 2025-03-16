import React, {useEffect, useState} from 'react';
import { useParams } from "react-router";
import z from "zod"
import {useSession} from "../Hook/useSession";
import Input from "../component/UI/Input";
import axios , {AxiosError} from "axios";
import {devMode2} from "../lib/db";
import Button from "../component/UI/Button";
import Toast from "../component/Toast";

type Meg ={
    message: string,
    show: boolean,
    type:"danger"|"success"|"warning"|"default"

}
// {username:string , password:string , email:string , newPassword:string , oldPassword:string , passwordConfirm:string , isNewpassword:boolean}
const Settings = () => {


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
    const [message, setMessage] = useState<Meg>({
        message: "",
        type:"default",
        show: false
    });
    const [loading, setLoading] = useState(false)

    const {username , id} = useParams();
    const Z_FormInfo = z.object({
        username: z.string().min(3, 'Username must be at least 3 characters long').max(50, 'Username must be under 50 characters'),
        email: z.string().email('Invalid email address'),
        newPassword: z.string().min(8, 'New password must be at least 8 characters long').optional().or(z.literal('')),
        oldPassword: z.string().min(5, 'Old password must be at least 8 characters long').optional().or(z.literal('')),
        passwordConfirm: z.string().optional().or(z.literal('')),
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
        const get = async ()=>{
            try {
                setLoading(true);
                const {data: response} = await axios.get(devMode2("render" ,`user/${id}`));
                const { data} = response;
                if (data){
                    console.log(data)
                    setFormIfo(prevState =>({
                        ...prevState,
                        username: data.username,
                        email: data.email
                    }) )
                }

            }catch (e) {
                if (axios.isAxiosError(e)){
                    const {response} = e as AxiosError<{ error: string |null, data: object |null}>
                    setMessage({
                        message:response?.data.error || "something went wrong",
                        type:"danger",
                        show: true
                    })
                }

            }finally {
                setLoading(false);
            }
        }
        get();
    }, []);

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


    if (isLoading ) {
        return (<div className={"LoadingPage"}>Loading...</div>)
    }

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        const {value , name} = e.target;
        if (name === "newPassword" || name === "passwordConfirm" || name === "oldPassword") {

            setFormIfo(prevState => {
                const updatedState = { ...prevState, [name]: value };

                if (name === "newPassword" || name === "passwordConfirm" || name === "oldPassword") {
                    updatedState.isNewpassword = !!(
                        updatedState.newPassword || updatedState.passwordConfirm || updatedState.oldPassword
                    );
                }

                return updatedState;
            });


        }
        setFormIfo(prevState => ({...prevState, [name]: value }));
        setChange(true)

    }
    async function Send() {
        if (onChange) {
            const validForm = Z_FormInfo.safeParse(formInfo)
            if (validForm.error) {
                setMessage({
                    message:validForm.error.errors[0].message,
                    type:"danger",
                    show: true
                })
                setLoading(false);
                return;
            }
            if (validForm.data){

                try {
                    const {data} = await axios.put(
                        devMode2("render" ,`user/${id}`),
                        {
                            ...validForm.data
                        }
                    )

                    if (data){
                        console.log(data)
                        setMessage({
                            message:"successfully updated account",
                            type:"default",
                            show: true
                        })

                    }

                }catch(e){
                    const {response} = e as AxiosError<{error:string |null ,data:object |null }>;
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
                }

            }

        }else {
            setMessage({
                message:" change has not been made",
                type:"danger",
                show: true

            })
        }

        setLoading(false);


    }


    return (
        <div className='ROOTCONPONENT'>
            {message.show && <Toast type={message.type} value={message.message} />}




            <main className='MAINPAGE Settings'>
                <h1> settings for {username ? username : ""}</h1>
                <form className={"formX"} onSubmit={(e)=>{
                    e.preventDefault();
                    setLoading(true)
                    Send()
                }}>
                    <Input disabled={loading}  className={"w-55"}   showLabel={true} LabelI="username" name="username" value={formInfo.username} onChange={handleInput} />
                    <Input disabled={loading}  className={"w-55"}   showLabel={true} LabelI="email" name="email" value={formInfo.email} onChange={handleInput} />
                    <Input disabled={loading} className={"w-55"}    showLabel={true} LabelI="newPassword" name="newPassword" value={formInfo.newPassword} onChange={handleInput} isPassword={true} />
                    <Input disabled={loading}  className={"w-55"}   showLabel={true} LabelI="oldPassword" name="oldPassword" value={formInfo.oldPassword} onChange={handleInput} isPassword={true} />
                    <Input disabled={loading}  className={"w-55"}   showLabel={true} LabelI="passwordConfirm" name="passwordConfirm" value={formInfo.passwordConfirm} onChange={handleInput} isPassword={true} />

                    <Button disabled={loading} type={"submit"}>{loading ? "loading" : "update"} </Button>


                </form>

            </main>


        </div>
    );
};

export default Settings;