import  {useState } from 'react'
import Input from './component/Input'
import Button from './component/Button'
import ThemeToggle from './component/ThemeToggle'
import DialogPopover from './component/DialogPopover'

export default function Root() {
     const [openDialog, setOpenDialog] = useState(false)

     

     return (
          <div className='ROOTCONPONENT'>
               <DialogPopover isOpen={openDialog} onClose={()=>setOpenDialog(false)}>
                    <h1>Dialog</h1>
                    <p>This is a dialog</p>
               </DialogPopover>
               <header className='HEADER'>
                    <h1>HEADER</h1>
                    <ThemeToggle/>

               </header>
               <main className='MAIN'>
               <h1>MAIN</h1>
               <Input showLabel={true} LabelI='ggggg'/>
               <Button onClick={()=>setOpenDialog(pre=>!pre)}> {openDialog ? "Close": "Open"}</Button>


               </main>
               <footer className='FOOTER' >

               <h1>FOOTER</h1>

               </footer>



          </div>
     )
}
