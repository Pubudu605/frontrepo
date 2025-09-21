// import { useState } from "react"

import { useState } from "react"

// export default function TestPage(){

//     // const[a,b]=useState() //Two values will be returened by useState hook function a is a variable and b is a functtion
    
//     // let count =1  //We have to use following method instead of this

//     const[count,setCount]=useState(0) //Starting value can be written inside the useState
//     const[name, setName]=useState("Amal") //Example 
       

//     function increment(){
//         // count = count +1 
//         // console.log(count)
//         setCount(count+1)
//     }

//     function decrement(){
//         // count = count -1 
//         // console.log(count)
//         setCount(count-1)
//     }

//     return(
//         <div className="w-full h-screen bg-amber-200 flex justify-center items-center">
//             <div className="w-[400px] h-[400px] bg-white flex flex-col justify-center items-center">
//                 <h1 className="text-5xl font-bold">{count}</h1>
//                 <div className="w-full flex justify-center items-center border h-[100px]">
//                     <button onClick={decrement} className="w-[100px] bg-blue-500 h-[45px] text-4xl mx-2 flex justify-center items-center text-white rounded-full">
//                         -
//                     </button>
//                     <button onClick={increment} className="w-[100px] bg-blue-500 h-[45px] text-4xl mx-2 flex justify-center items-center text-white rounded-full">
//                         +
//                     </button>
//                 </div>


//             </div>

//         </div>
//     )
// }


//Image upload test
// Supabase url and key
// https://xpyimdheeoqicgdbnkbb.supabase.co
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhweWltZGhlZW9xaWNnZGJua2JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNDYxMzgsImV4cCI6MjA2ODgyMjEzOH0.3lbwS-OqhSUIeKoPz3HKUot7VogIiMTdIWzWIbp-aew

//import { createClient } from "@supabase/supabase-js"
import toast from "react-hot-toast"
import uploadFile from "../utils/mediaUpload"
import Loader from "../components/loader"

// const url= "https://xpyimdheeoqicgdbnkbb.supabase.co"
// const key= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhweWltZGhlZW9xaWNnZGJua2JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNDYxMzgsImV4cCI6MjA2ODgyMjEzOH0.3lbwS-OqhSUIeKoPz3HKUot7VogIiMTdIWzWIbp-aew"

// const supabase = createClient(url,key) //To connect with supabase



export default function TestPage(){
    // const [file,setFile]=useState(null)
    // function handleUpload(){
    //     uploadFile(file).then(
    //         (url)=>{
    //             console.log(url)

    //         }).catch(
    //             (error)=>{
    //                 console.error("Error uploading file",error)
    //                 toast.error(error)
    //             }
        
    //     )
    // // console.log(file)
    // // if(file==null){
    // //     toast.error("Please select a file to upload")
    // //     return
    // // }
    // // supabase.storage.from("images").upload(file.name, file, {  //upload the selected file in supabse bucket
    // //     cacheControl:"3600",
    // //     upsert: false
    // // }).then(
    // //     ()=>{
    // //         toast.success("File uploaded successfully")
    // //         const publicUrl = supabase.storage.from("images").getPublicUrl(file.name).data.publicUrl
    // //         console.log(publicUrl)
    // //     }
    // // ).catch(
    // //     (error)=>{
    // //         console.error("Error Uploading file",error)
    // //         toast.error("Failed to upload file")
    // //     }
    // // )
    // }

    return(
        <div className="w-full h-screen flex justify-center items-center"> {/*accept="image"*/} {/*Images will be save as an array*/}{/*first element in the array*/}
            {/* <input type="file"  onChange={(e)=>{
                console.log(e)
                setFile(e.target.files[0]) 


            }}/>
            <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer ml-4">
                upload
            </button> */}
            <Loader/>

        </div>
    )
}