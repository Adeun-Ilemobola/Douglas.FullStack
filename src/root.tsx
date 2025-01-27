import  {useState } from 'react'
import Input from './component/UI/Input'
import Button from './component/UI/Button'
import DialogPopover from './component/UI/DialogPopover'
import FileInput from './component/UI/FileInput'
import ThemeToggle from './component/UI/ThemeToggle'

type file = {
     name: string,
     bs64: string
}

export default function Root() {
     const  [openDialog ,setOpenDialog ] = useState(false)
     const [ fileList , setFileList] = useState<file[]| []>([])

    
     

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
               <Input showLabel={true} LabelI='name' placeholder='name'/>
               <Button  onClick={()=>setOpenDialog(pre=>!pre)}> {openDialog ? "Close": "Open"}</Button>



               <FileInput id='dfdfdfdf' setFileList={setFileList} fileList={fileList} />



               </main>
               <footer className='FOOTER' >

               <h1>FOOTER</h1>

               </footer>



          </div>
     )
}
