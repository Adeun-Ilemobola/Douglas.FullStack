import  {useState , useEffect } from 'react'
// import Input from './component/UI/Input'
// import Button from './component/UI/Button'
// import DialogPopover from './component/UI/DialogPopover'
// import FileInput from './component/UI/FileInput'
import Header from "./component/Header.tsx";
import Button from "./component/UI/Button.tsx";
import {idGen} from "./uty.ts";

type Note = {
    id: string;
    text: string;
    folderID: string;
}
type Folder ={
    name: string,
    id : string,

}

type changeDispatcher = {
    changeOcr:boolean,
    chanegeItem:{method:"add"|"delete"| "update" , type:"note"|"folder" , data:Note |Folder}[]
}


export default function Root() {
     const  [openDialog ,setOpenDialog ] = useState(false)
    const [notes, setNotes] = useState<Note[]>([]);
     const [mounted, setMounted] = useState(false);
    const [folders, setFolders] = useState<Folder[]>([]);
    const [chanege, setChanege] = useState<changeDispatcher>({
        changeOcr:false,
        chanegeItem:[],

    });
    const [currentNote, setCurrentNote] = useState<Note | null>(null);
    const  [newItem, setnewItem] = useState<{note:Note | null , folders:Folder | null}>({
        note:null,
        folders:null
    });

    useEffect(() => {
        if(!mounted) {
        //    get the user data from the bd
        //     add the user note and folder to the state
        //   add the correspondent file to the folder


        //  set
        setMounted(true);

        }else {
            // if any new item has been added by comparing it
            if (chanege.changeOcr){


            }
        //     send a dispatcher to the therapist with an array of object, one for the note and one for the folder

        }


    }, [notes , folders]);

    function addNote() {
        if (newItem.note){
            const note = newItem.note;
            setChanege(pre=>({
                ...pre ,
                changeOcr: true,
                chanegeItem:[...pre.chanegeItem ,{method:"add" ,type:"note" , data:note}]
            }))

            setnewItem(pre=>({
                ...pre,
                note:null
            }))


        }

    }



    function addFolder() {
        if (newItem.folders){
            const folder = newItem.folders;
            setChanege(pre=>({
                ...pre ,
                changeOcr: true,
                chanegeItem:[...pre.chanegeItem ,{method:"add" ,type:"folder" , data:folder}]
            }))

            setnewItem(pre=>({
                ...pre,
                folders:null
            }))


        }

    }


    function selectNote(id : string) {
        const foundNote  = notes.find(note => note.id === id)
        if (foundNote) {
            setCurrentNote(foundNote)
        }

    }


     return (
          <div className='ROOTCONPONENT'>
               {/*<DialogPopover isOpen={openDialog} onClose={()=>setOpenDialog(false)}>*/}
               {/*     <h1>Dialog</h1>*/}
               {/*     <p>This is a dialog</p>*/}
               {/*</DialogPopover>*/}
               <Header userDate={{name:"sdsd" , id:"881094381-9h9fdfud9f-kjbdfsj" , img:undefined}}/>
               <main className='MAIN'>
                   <div className="sideBar">

                   </div>
                   <div className="noteArea">
                       {currentNote ? (<>
                           <textarea className={"note"} placeholder={"start the note "}>

                       </textarea>
                       </>) : <h1> select Notes</h1>}

                   </div>

               </main>
               <footer className='FOOTER' >

               <h1>FOOTER</h1>


               </footer>



          </div>
     )
}
