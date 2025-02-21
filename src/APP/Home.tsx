import {useState, useEffect, useCallback} from 'react'
import Header from "../component/Header";
import { Outlet} from 'react-router-dom';
import {useSession} from "../Hook/useSession";
import Button from "../component/UI/Button";
import DialogPopover from "../component/UI/DialogPopover";
import axios from "axios";
import Input from "../component/UI/Input";
import BoxCard from "../component/Box";


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

// type changeDispatcher = { Structure
//     changeOcr: boolean,
//     userNote: { method: "add" | "delete" | "update", data: Note }[],
//     userFolder: { method: "add" | "delete" | "update", data: Folder }[],
// }


// API access == https://nodevap.onrender.com/api/
type  StructureX ={
    name: string,
    id: string,
    Children:{name: string, id: string}[],

}
export default function Home() {
    const {isLoading, session, Logout} = useSession();
    const [openDialogFolder, setOpenDialogFolder] = useState(false)
    const [openDialogNote, setOpenDialogNote] = useState(false)

    const [Notes, setNotes] = useState<Note[]>([]);
    const [Loading, setLoading] = useState<boolean>(false);
    const [Folders, setFolders] = useState<Folder[]>([]);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    const [newItem, setNewItem] = useState<{ name: string, selectedFolder: string | null }>({
        name: "",
        selectedFolder: null,
    });

    const [StructureData, setStructureData] = useState<StructureX[]>([
        // {
        //     name: "Folder 1",
        //     id: "sdfsdfsdfsdfsdf",
        //     Children: [
        //         {
        //             name: "Note 1",
        //             id: "36478yrqfufhjda",
        //         },
        //         {
        //             name: "Note 2",
        //             id: "98765trgfdytcfy",
        //         },
        //     ],
        // },
        // {
        //     name: "Folder 2",
        //     id: "asdasdqweqweqwe",
        //     Children: [
        //         {
        //             name: "Note 3",
        //             id: "qwe1234asdzxc",
        //         },
        //         {
        //             name: "Note 4",
        //             id: "987654zxcvbnm",
        //         },
        //         {
        //             name: "Note 5",
        //             id: "rtyrty4567dfgh",
        //         },
        //     ],
        // },
        // {
        //     name: "Folder 3",
        //     id: "zxczxczxcvbnm",
        //     Children: [
        //         {
        //             name: "Note 6",
        //             id: "lkjhgf2345678",
        //         },
        //     ],
        // },
        // {
        //     name: "Folder 4",
        //     id: "mnbvcxzlkjhgf",
        //     Children: [
        //         {
        //             name: "Note 7",
        //             id: "09876ytrewqasdf",
        //         },
        //         {
        //             name: "Note 8",
        //             id: "11223lkjhgfdsa",
        //         },
        //         {
        //             name: "Note 9",
        //             id: "00987mnbvcxz",
        //         },
        //         {
        //             name: "Note 10",
        //             id: "22334plokmijn",
        //         },
        //     ],
        // },
    ]);

    const Refresh = useCallback(async () => {
        try {
            setLoading(true);
            if (session) {
                console.log("Refresh")
                const {data: response} = await axios.post("https://nodevap.onrender.com/api/userCollection", {userID: session.user.id})
                const {data} = response
                const {notesA, folderA, struct} = data
                setNotes(notesA);
                setFolders(folderA);
                setStructureData(struct)


            }


        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false);
        }

    }, [session])


    function handleIput(value: string) {
        setNewItem(prev => ({
            ...prev,
            name: value,
        }))

    }


    const AddNode = useCallback(async () => {
        try {
            setLoading(true);
            if (!session) {
                setLoading(false);
                return;
            }
            ;
            if (!newItem.selectedFolder) {
                alert(" please select a folder or collection you want to create this note in")
                setLoading(false);
                return;

            }

            const {data} = await axios.post("https://nodevap.onrender.com/api/userNote",
                {
                    method: "add",
                    userID: session.user.id,
                    name: newItem.name,
                    folderID: newItem.selectedFolder,
                    id:"",
                    text:""
                }
            )
            const {error} = data;
            if (error) {
                alert(error);
                return;
            }
            Refresh()
            setNewItem({
                name: "",
                selectedFolder: null,
            })
            setOpenDialogNote(false)


        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false);
        }
    }, [newItem, session])


    const AddFoder = useCallback(async () => {
        try {
            setLoading(true);
            if (!session) return;
            const {data} = await axios.post("https://nodevap.onrender.com/api/userFolder",
                {
                    method: "add",
                    userID: session.user.id,
                    name: newItem.name,
                    id:""

                }
            )
            const {error} = data;
            if (error) {
                alert(error);
                return;
            }
            Refresh()
            setNewItem({
                name: "",
                selectedFolder: null,
            })
            setOpenDialogFolder(false)


        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false);
        }
    }, [newItem, session])




    const startSave = useCallback(async () => {
        if (!selectedNote){
            console.log(" no selection")
            return false;
        }
        try {

            console.log(`Saving note... ID: ${selectedNote.id}, Name: ${selectedNote.name}`);
            const response = await axios.post("https://nodevap.onrender.com/api/userNote", {
                    method: "update",
                    userID: "",
                    name: selectedNote.name,
                    folderID: "",
                    id: selectedNote.id,
                    text: selectedNote.text,
                });
            console.log("Response received from API:", response);

            if (response.data.error) {
                console.error("API returned an error:", response.data.error);
                return false;
            }

            return true;



        } catch (err) {
            console.error("Error saving note:", err);
            return false;
        }
    }, [selectedNote]);

  async  function Select(id: string, type: "note" | "folder") {
        try {
            console.log("data id: " , id , "   type:", type)
            if (type === "note") {

                if (selectedNote && selectedNote.id !== id) {
                    console.log("Saving current note before switching...");
                    const savedSuccessfully = await startSave();
                    console.log(savedSuccessfully)
                    if (!savedSuccessfully) {
                        console.log("Failed to save, but proceeding to switch selection.");
                    }
                }

                console.log("Refreshing notes before selecting new note...");
                await Refresh();



                setTimeout(() => {
                    console.log("Setting new selection:", id);
                    const getNewSelection = Notes.find(op => op.id === id);
                    if (getNewSelection) {
                        setSelectedNote(getNewSelection);
                    } else {
                        console.log("Note not found in Notes state.");
                    }
                }, 50); // Small delay to ensure state update





            } else if (type === "folder") {
                setNewItem(prevState => ({
                    ...prevState,
                    selectedFolder: id,
                }))
                setOpenDialogNote(true)

            }




        } catch (err) {
            console.log(err)
        }
    }





    function Delete(id: string, type: "note" | "folder") {
        if (type === "note") {
            console.log("id :", id , "   type:", type)

        }else if (type === "folder") {
            console.log("id :", id , "   type:", type)

        }

    }
    useEffect(()=>{
        Refresh()
    },[ Refresh])



   if(isLoading){
       return (<div className={"LoadingPage"}>Loading...</div>)
   }




    return (
        <div className='ROOTCONPONENT'>
            <DialogPopover isOpen={openDialogFolder} onClose={() => setOpenDialogFolder(false)}>
                <Input showLabel={true} LabelI={"name"} value={newItem.name}
                       onChange={(e) => handleIput(e.target.value)}/>
                <Button onClick={() => {AddFoder()}} disabled={Loading}>
                    {Loading  ?"Loading...":"Create folder" }
                </Button>
            </DialogPopover>

            <DialogPopover isOpen={openDialogNote} onClose={() => {
                setOpenDialogNote(false)
                setNewItem(prevState => ({
                    ...prevState,
                    selectedFolder: null,
                }))

            }}>
                <h2>add [{newItem.name}] at [{
                    Folders.filter(o=>o.id=== newItem.selectedFolder)[0]
                        ? Folders.filter(o=>o.id=== newItem.selectedFolder)[0].name
                        :
                        "null"
                }]</h2>
                <Input showLabel={true} LabelI={"name"} value={newItem.name}
                       onChange={(e) => handleIput(e.target.value)}/>
                <Button onClick={() => {
                    if (newItem.selectedFolder) {
                        AddNode()
                    }

                }} disabled={Loading}>
                    {Loading  ?"Loading...":"Create Note" }
                </Button>
            </DialogPopover>


            <Header userDate={{
                name: session ? session.user.username : "",
                id: session ? session.user.id : "",
                img: undefined
            }}
                    endSession={() => {
                        Logout()
                    }}
            />
            <main className='MAIN'>
                <div className="sideBar">
                    <Button onClick={()=>setOpenDialogFolder(true)}>
                        Add folder
                    </Button>


                    <div className={"sideBar-List"}>
                        {StructureData.map((item, index) => (
                            <div key={index} className="Structure">
                                <BoxCard name={item.name} id={item.id} type={"folder"} Select={Select} Delete={Delete}/>
                                {item.Children.map((itemc, indexc) => (
                                    <BoxCard key={indexc} name={itemc.name} id={itemc.id} type={"note"} Select={Select} Delete={Delete}/>
                                ))}


                            </div>
                        ))}

                    </div>

                </div>
                <div className="noteArea">
                    {selectedNote ? (<>
                        <h1>{selectedNote.name}</h1>
                           <textarea value={selectedNote.text} className={"note"} placeholder={"start the note "}
                                     onChange={(e) => {
                                         setSelectedNote(prevState => {
                                             if (!prevState) return null;
                                             return { ...prevState, text: e.target.value };

                                         })
                                     }}
                           >

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
