import React from 'react';
import {FilePlus2, Trash} from "lucide-react";

type box = {
    name: string,
    id: string,
    type: "note" | "folder",
    Select: (id: string, type: "note" | "folder") =>  Promise<void>,
    Delete: (id:string , type: "note" | "folder" ) => void,
}

function BoxCard({name, id, type, Select , Delete}: box) {
    return (
        <>
            {
                type === "note" && (<div className={"noteBox"} onClick={() => {Select(id , "note")}}>
                    <h3>{name}</h3>
                    <div className={"ActionBtuContainer"}>
                        <div onClick={(e) => {
                            e.stopPropagation()
                            Delete(id , "note")
                        }} >
                            <Trash />
                        </div>

                    </div>

                </div>)
            }

            {
                type === "folder" && (<div className={"folderBox"}>
                    <h3>{name}</h3>
                    <div className={"ActionBtuContainer"}>

                        <div onClick={(e) => {
                            e.stopPropagation()
                            Select(id , "folder")
                        }} >
                            <FilePlus2 />
                        </div>
                        <div onClick={(e) => {
                            e.stopPropagation()
                            Delete(id , "folder")
                        }} >
                            <Trash />
                        </div>

                    </div>

                </div>)
            }

        </>
    );
}

export default BoxCard;