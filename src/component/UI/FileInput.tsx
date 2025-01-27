import { useState } from 'react'



type file = {
     name: string,
     bs64: string
}
type FileInputProps = {
     id: string,
     fileList: file[];
     setFileList: React.Dispatch<React.SetStateAction<file[] | []>>
}


export default function FileInput({ id, fileList, setFileList }: FileInputProps) {
     const [dragOver, setDragOver] = useState(false)


     function OnChange(e: React.ChangeEvent<HTMLInputElement>) {
          if (!e.target.files) return; 
          const files = Array.from(e.target.files)

          if (files){
               const newFiles: file[] = files.map(file => ({
                    name: file.name,
                    bs64: URL.createObjectURL(file)
               }))

               setFileList([...fileList,...newFiles])
               console.log(fileList);
          }

     }

     return (
          <label
               onDragLeave={() => setDragOver(false)}
               onDrop={(e) => {
                    e.preventDefault()
                    setDragOver(false)

                    const files = Array.from(e.dataTransfer.files)

                    const newFiles: file[] = files.map(file => ({
                         name: file.name,
                         bs64: URL.createObjectURL(file)
                    }))

                    setFileList([...fileList, ...newFiles])
                    console.log(fileList);

               }}

               onDragOver={(e) => { setDragOver(true); e.preventDefault() }}
               className={`INPUTFILE ${dragOver ? "INPUTFILE--DriveOver" : " "}`}
               htmlFor={id}
          >
               {dragOver ? (<>

               </>) : (
                    <>
                         <div className="file-table-container">
                              <table className="file-table">
                                   <tbody>
                                        {fileList &&
                                             fileList.map((value, index) => (
                                                  <tr onClick={(e)=>{e.preventDefault(); e.stopPropagation()}} key={index}>
                                                       <td>{value.name}</td>
                                                       <td className="base64-cell">{value.bs64}</td>
                                                  </tr>
                                             ))}
                                   </tbody>
                              </table>
                         </div>
                    



                    </>)
}



<input onChange={(e) => OnChange(e)} id={id} type="file" style={{ display: "none" }} />
          </label >
     )
}
