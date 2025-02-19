import  {  InputHTMLAttributes } from 'react'
import Button from "./Button";
import {useState} from "react";


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
     showLabel: boolean,
     LabelI: string
     ClassName?: string,
     isPassword?: boolean,

}
export default function Input({isPassword = false , ClassName,  showLabel, LabelI, type, value  , ...other }: InputProps) {
     const [showPassword, setShowPassword] = useState(!isPassword);

     return (
          <div className={`inputContainer ${ClassName}`}>
               {showLabel && <label htmlFor="">{LabelI}</label>}
               {isPassword?  (<>
                    <div className="passWordBox">
                         <input value={value}   type={showPassword ? "text" : "password"}  {...other} />
                         <Button className="passWordBoxC" onClick={() => {
                              setShowPassword(pre=>!pre)
                         }} >
                              {showPassword ? "👁️" : "🔒"}

                         </Button>
                    </div>
               </> ) :  <input value={value}  type={type || "text"} {...other} />}

          </div>
     )
}
