import {useState, useEffect, useCallback} from 'react'
import Header from "../component/Header.tsx";
import {Link, Outlet} from 'react-router-dom';
import {useSession} from "../Hook/useSession.ts";
import Button from "../component/UI/Button.tsx";
import DialogPopover from "../component/UI/DialogPopover";
import axios from "axios";


type Note = {
    id: string;
    text: string;
    folderID: string;
    userId: string;
}
type Folder = {
    name: string,
    id: string,
    userId: string;

}

type changeDispatcher = {
    changeOcr: boolean,
    userNote: { method: "add" | "delete" | "update", data: INote }[],
    userFolder: { method: "add" | "delete" | "update", data: IFolder }[],
}


export default function Home() {
    const {isLoading, session} = useSession();
    const [openDialog, setOpenDialog] = useState(false)
    const [notes, setNotes] = useState<Note[]>([]);
    const [mounted, setMounted] = useState(false);
    const [folders, setFolders] = useState<Folder[]>([]);
    const [chanege, setChanege] = useState<changeDispatcher>({
        changeOcr: false,
        userFolder: [],
        userNote: [],

    });
    const [currentNote, setCurrentNote] = useState<Note | null>(null);
    const [newItem, setnewItem] = useState<{ note: Note | null, folders: Folder | null  , SelectedFolder:string |null}>({
        note: null,
        folders: null,
        SelectedFolder: null,
    });

    useEffect(() => {
        if (!mounted) {
            //    get the user data from the bd
            //     add the user note and folder to the state
            //   add the correspondent file to the folder


            //  set
            setMounted(true);

        } else {
            // if any new item has been added by comparing it
            if (chanege.changeOcr) {

                setChanege(pre => ({...pre, changeOcr: false, chanegeItem: []}));


            }
            //     send a dispatcher to the therapist with an array of object, one for the note and one for the folder

        }


    }, [chanege.changeOcr]);


    const updateNote = async () => {
        try {

            if (chanege.changeOcr && session) {
                const response = await axios.post("http://localhost:3000/api/UpdateUserData", {
                    userID: session.user.id,
                    userNote: chanege.userNote,
                    userFolder: chanege.userFolder,

                })
                const {data, error} = response.data;
                if (data) {
                    setNotes(data.notes);
                    setFolders(data.folders);

                    setChanege(per => ({...per, chanegeItem: [], changeOcr: false}));


                }
            }

        } catch (e) {
            console.log(e)

        }

    }

    function addNote(idFolder: string) {
        if (newItem.note && session) {
            const note = newItem.note;
            setChanege(pre => ({
                ...pre,
                changeOcr: true,
                userNote: [...pre.userNote, {
                    method: "add", data: {
                        userID: session.user.id,
                        text: note.text,
                        title: newItem.note,
                        folderID: idFolder,
                    }
                }]
            }))

            setnewItem(pre => ({
                ...pre,
                note: null,
                changeOcr: false,
            }))


        }

    }


    function addFolder() {
        if (newItem.folders) {
            const folder = newItem.folders;
            setChanege(pre => ({
                ...pre,
                changeOcr: true,
                userFolder: [...pre.userFolder, {method: "add", data: folder}]
            }))

            setnewItem(pre => ({
                ...pre,
                folders: null,
                changeOcr: false,
            }))


        }

    }


    function selectNote(id: string) {
        const foundNote = notes.find(note => note.id === id)
        if (foundNote) {
            setCurrentNote(foundNote)
        }

    }


    return (
        <div className='ROOTCONPONENT'>
            <DialogPopover isOpen={openDialog} onClose={() => setOpenDialog(false)}>
                <h1>Dialog</h1>
                <p>This is a dialog</p>
            </DialogPopover>
            <Header userDate={{name: "sdsd", id: "881094381-9h9fdfud9f-kjbdfsj", img: undefined}}/>
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
            <footer className='FOOTER'>

                <h1>FOOTER</h1>
                <Outlet/>


            </footer>


        </div>
    )
}
