import  {  InputHTMLAttributes } from 'react'
import Button from "./Button";
import {useState} from "react";


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
     showLabel: boolean,
     LabelI: string
     isPassword?: boolean,


}
export default function Input({ isPassword = false ,  showLabel, LabelI, type, value  , ...other }: InputProps) {
     const [showPassword, setShowPassword] = useState(!isPassword);
     const { className: ignoredInputClass, ...inputProps } = other;

     return (
          <div className={`inputContainer ${ignoredInputClass||""}`}>
               {showLabel && <label htmlFor="">{LabelI}</label>}
               {isPassword?  (<>
                    <div className="passWordBox">
                         <input value={value}     type={showPassword ? "text" : "password"}  {...inputProps} />
                         <Button className="passWordBoxC" onClick={() => {
                              setShowPassword(pre=>!pre)
                         }} >
                              {showPassword ? "👁️" : "🔒"}

                         </Button>
                    </div>
               </> ) :  <input value={value}  type={type || "text"}  {...inputProps} />}

          </div>
     )
}
