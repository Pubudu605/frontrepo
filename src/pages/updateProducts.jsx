import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import uploadFile from "../utils/mediaUpload";


export default function UpdateProductPage(){ //To get recent change values
    const location=useLocation()//This will give a JSON
    const [productId,setProductId]=useState(location.state.productId)
    const [productName,setProductName]=useState(location.state.name)
    const [alternativeNames,setAlternativeNames]=useState(location.state.alternatives.join(","))
    const [labelledPrice,setLabelledPrice]=useState(location.state.labelled)
    const [price,setPrice]=useState(location.state.price)
    const [images,setImages]=useState([]) //Should start as an empty array
    const [description,setDescription]=useState(location.state.description)
    const [stock,setStock]=useState(location.state.stock)
    const [isAvailable,setIsAvailable]=useState(location.state.isAvailable)
    const [category,setCategory]=useState(location.state.category)

    const navigate= useNavigate()
   
    // console.log(location.state)

    async function handleSubmit(){
        
        const promisesArray = [] //Promises array

        for (let i=0; i<images.length; i++){
            const promise = uploadFile(images[i])
            promisesArray[i]=promise
            //console.log(images[i])
        } 
        
        const responses = await Promise.all(promisesArray) //All prmises will run and response will be given as an array
        console.log(responses)
        
        
        const altNamesInArray=alternativeNames.split(",") //To get alternative names in array format seperated by comma
        const productData = {
            productId: productId,
            name: productName ,
            alternatives: altNamesInArray,
            labelled:labelledPrice , 
            price: price,
            images: responses ,  
            description: description,
            stock: stock,
            isAvailable: isAvailable,
            category: category
        }

        if(responses.length==0){
            productData.images=location.state.images
        }

        console.log(productData)
    

    const token = localStorage.getItem("token")
    if(token==null){
        window.location.href="/login"
        return
    }
    axios.put(import.meta.env.VITE_BACKEND_URL +"/api/products/"+productId,productData,
        {
            headers:{
                Authorization: "Bearer "+token
                
            }
        }
    ).then(
        (res)=>{
            console.log("Product added successfully")
            console.log(res.data)
            toast.success("Product added successfully")
            navigate("/admin/products")
            

        }

    ).catch( 
        (error)=>{
            console.error("Error adding product:",error)
            toast.error("Failed to add product")
            
        }

    )

    }

    return(
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-[600px] h-auto border-[3px] rounded-[15px] flex flex-wrap flex-row justify-between p-[40px]">
                <div className="w-[200px] flex flex-col gap-[5px]">
                    <label className="text-sm font-semibold">Product ID</label>
                    <input disabled value={productId}  onChange={(e)=>{setProductId(e.target.value)}} type="text" className="w-full border-[1px] h-[40px] rounded-md"/>
                </div>

                <div className="w-[300px] flex flex-col gap-[5px]">
                    <label className="text-sm font-semibold">Product Name</label>
                    <input value={productName} onChange={(e)=>{setProductName(e.target.value)}} type="text" className="w-full border-[1px] h-[40px] rounded-md"/>
                </div>

                <div className="w-[500px] flex flex-col gap-[5px]">
                    <label className="text-sm font-semibold">Alternative Names</label>
                    <input value={alternativeNames} onChange={(e)=>{setAlternativeNames(e.target.value)}} type="text" className="w-full border-[1px] h-[40px] rounded-md"/>
                </div>

                <div className="w-[200px] flex flex-col gap-[5px]">
                    <label className="text-sm font-semibold">Labelled Price</label>
                    <input value={labelledPrice} onChange={(e)=>{setLabelledPrice(e.target.value)}} type="number" className="w-full border-[1px] h-[40px] rounded-md"/>
                </div>

                <div className="w-[200px] flex flex-col gap-[5px]">
                    <label className="text-sm font-semibold">Price</label>
                    <input value={price} onChange={(e)=>{setPrice(e.target.value)}} type="number" className="w-full border-[1px] h-[40px] rounded-md"/>
                </div>

                <div className="w-[500px] flex flex-col gap-[5px]">
                    <label className="text-sm font-semibold">Images</label>
                    <input multiple onChange={(e)=>{
                        //console.log(e.target.files)
                        setImages(e.target.files)


                    }}
                    type="file" className="w-full border-[1px] h-[40px] rounded-md"/>
                </div>

                <div className="w-[500px] flex flex-col gap-[5px]">
                    <label className="text-sm font-semibold">Description</label>
                    {/* <input type="text" className="w-full border-[1px] h-[100px] rounded-md"/> */}
                    <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} type="text" className="w-full border-[1px] h-[100px] rounded-md"/> {/*Instead of input textarea is used to enable the enter button*/}
                </div>

                <div className="w-[200px] flex flex-col gap-[5px]">
                    <label className="text-sm font-semibold">Stocks</label>
                    <input value={stock} onChange={(e)=>{setStock(e.target.value)}} type="number" className="w-full border-[1px] h-[40px] rounded-md"/>
                </div>

                <div className="w-[200px] flex flex-col gap-[5px]">
                    <label className="text-sm font-semibold">Is Available</label>
                    <select value={isAvailable} onChange={
                        (e)=>{
                            //setIsAvailable(e.target.value)
                            setIsAvailable(e.target.value=="true")
                        }
                    }className="w-full border-[1px] h-[40px] rounded-md">
                        <option value={true}>Available</option>
                        <option value={false}>Not Available</option>
                    </select>
                </div>

                <div className="w-[200px] flex flex-col gap-[5px]">
                    <label className="text-sm font-semibold">Category</label>
                    <select value={category} onChange={
                        (e)=>{
                            setCategory(e.target.value)
                            
                        }
                    }className="w-full border-[1px] h-[40px] rounded-md">
                        {/*Cream, Face Wash, Soap, Fragrance */}
                        <option value="cream">Cream</option>
                        <option value="face wash">Face Wash</option>
                        <option value="soap">Soap</option>
                        <option value="fragrance">Fragrance</option>
                    </select>
                </div>

                <div className="w-[500px] flex justify-center flex-row py-[20px]">
                    <Link to={"/admin/products"} className="w-[200px] h-[50px] bg-white justify-center items-center border-[2px] text-black flex rounded-md">Cancel</Link>
                    <button onClick={handleSubmit} className="w-[200px] h-[50px] bg-black justify-center items-center border-[2px] text-white flex rounded-md ml-[20px]">
                        Update
                    </button>
                </div>

                



            </div>

        </div>

    )
}