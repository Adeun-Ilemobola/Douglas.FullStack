import React, { HTMLAttributes } from 'react'


type popoverPropsCast = {
     isOpen: boolean,
     onClose: () => void,
     children: React.ReactNode,
     popoverId?: string,
     popoverPlacement?: 'top' | 'bottom' | 'left' | 'right',


}

type PopoverProps = popoverPropsCast & HTMLAttributes<HTMLDivElement>;



export default function DialogPopover({ isOpen, onClose, children, popoverId, popoverPlacement, ...other }: PopoverProps) {
     return (
          <div onClick={() => {
               onClose()
          }} className={`POPOVERBACKDROP ${isOpen ? "POPOVERBACKDROP--visible " : " "}`}>

               <div onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
               }} className={`POPOVER ${isOpen ? "POPOVER--visible " : " "}`} {...other}>
                    {children}

               </div>

          </div>
     )
}
