import React, {  InputHTMLAttributes } from 'react'


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
     showLabel: boolean,
     LabelI: string


}
export default function Input({ showLabel, LabelI, ...other }: InputProps) {
     return (
          <div className='inputContainer'>
               {showLabel && <label htmlFor="">{LabelI}</label>}
               <input type="text" {...other} />
          </div>
     )
}
