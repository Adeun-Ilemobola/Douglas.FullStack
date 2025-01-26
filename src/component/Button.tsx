import React , {ButtonHTMLAttributes, ReactNode} from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
     children: ReactNode;
   }

export default function Button({ children , ...other}:ButtonProps) {
  return (
     <button {...other}>
          {children}

     </button>
  )
}
