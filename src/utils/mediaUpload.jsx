import { createClient } from "@supabase/supabase-js"

const url= "https://xpyimdheeoqicgdbnkbb.supabase.co"

const key= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhweWltZGhlZW9xaWNnZGJua2JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNDYxMzgsImV4cCI6MjA2ODgyMjEzOH0.3lbwS-OqhSUIeKoPz3HKUot7VogIiMTdIWzWIbp-aew"

const supabase = createClient(url,key) //To connect with supabase


export default function uploadFile(file){

    const promise = new Promise(
        (resolve,reject)=>{
            if(file==null){
                reject("Please select a file to upload")
                return

            }

            const timeStamp = new Date().getTime()
            const fileName = timeStamp+"-"+file.name //To get unique file name to avoid conflicts

            supabase.storage.from("images").upload(fileName,file,{
                cacheControl:"3600",
                upsert:false
            }).then(
                ()=>{
                    const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl
                    // console.log("File public URL:", publicUrl)
                    resolve(publicUrl)
                }
            ).catch(
                ()=>{
                    
                    reject("Failed to upload file")
                }
            )
        }
        
    )
    return promise

}