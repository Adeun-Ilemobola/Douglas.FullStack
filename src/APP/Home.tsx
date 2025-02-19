import {useState, useEffect, useCallback} from 'react'
import Header from "../component/Header.tsx";
import {Link, Outlet} from 'react-router-dom';
import {useSession} from "../Hook/useSession.ts";
import Button from "../component/UI/Button.tsx";
import DialogPopover from "../component/UI/DialogPopover";
import axios from "axios";
import Input from "../component/UI/Input";


type Note = {
    name: string,
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

// type changeDispatcher = {
//     changeOcr: boolean,
//     userNote: { method: "add" | "delete" | "update", data: Note }[],
//     userFolder: { method: "add" | "delete" | "update", data: Folder }[],
// }


// API access == https://nodevap.onrender.com/api/

export default function Home() {
    const {isLoading, session} = useSession();
    const [openDialogFolder, setOpenDialogFolder] = useState(false)
    const [Notes, setNotes] = useState<Note[]>([]);
    const [Folders, setFolders] = useState<Folder[]>([]);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [newItem, setNewItem] = useState<{ name: string, selectedFolder: string | null }>({
        name: "",
        selectedFolder: null,
    });

    const Refresh = useCallback(async () => {
        try {
            if (session) {
                const {data} = await axios.post("https://nodevap.onrender.com/api/userCollection", {userID: session.user.id})
                const {notesA, folderA} = data
                setNotes(notesA);
                setFolders(folderA);

            }


        } catch (err) {
            console.log(err)
        }

    }, [newItem , session])


    function handleIput(value: string) {
        setNewItem(prev => ({
            ...prev,
            name: value,
        }))

    }


    const AddNode = useCallback(async () => {
        try {
            if (!session) return;
            if (!newItem.selectedFolder) {
                alert(" please select a folder or collection you want to create this note in")
                return;

            }

            const {data} = await axios.post("https://nodevap.onrender.com/api/userNote",
                {
                    method:"add",
                    userID: session.user.id,
                    name: newItem.name,
                    foderID: newItem.selectedFolder
                }
            )
            const {error} = data;
            if (error) {
                alert(error);
                return;
            }
            Refresh()


        } catch (err) {
            console.log(err)
        }
    }, [newItem , session])



    const AddFoder = useCallback(async () => {
        try {
            if (!session) return;
            const {data} = await axios.post("https://nodevap.onrender.com/api/userFolder",
                {
                    method:"add",
                    userID: session.user.id,
                    name: newItem.name,

                }
            )
            const {error} = data;
            if (error) {
                alert(error);
                return;
            }
            Refresh()


        } catch (err) {
            console.log(err)
        }
    }, [newItem , session])






    return (
        <div className='ROOTCONPONENT'>
            <DialogPopover isOpen={openDialogFolder} onClose={() => setOpenDialogFolder(false)}>
                <Input showLabel={true} LabelI={"name"} value={newItem.name}
                       onChange={(e) => handleIput(e.target.value)}/>
                <Button onClick={() => {AddFoder()}}>
                    Create folder
                </Button>
            </DialogPopover>


            <Header userDate={{
                name: session ? session.user.username : "",
                id: session ? session.user.id : "",
                img: undefined
            }}/>
            <main className='MAIN'>
                <div className="sideBar">
                    <Button>
                        Add folder
                    </Button>


                    <div className={"sideBar-List"}>

                    </div>

                </div>
                <div className="noteArea">
                    {selectedNote ? (<>
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
