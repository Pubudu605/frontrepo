import {Link, Routes, Route, useNavigate } from 'react-router-dom'
import { PiPlus } from "react-icons/pi";
import { TbH1, TbH3 } from 'react-icons/tb';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { BiEdit, BiTrash } from 'react-icons/bi';
import toast from "react-hot-toast";
import Loader from './components/loader';

// const sampleProducts = [
    
//   {
//     productId: "COSM001",
//     name: "Organic Face Cream",
//     alternatives: ["Aloe Vera Moisturizer", "Herbal Night Cream"],
//     labelled: 1999,
//     price: 1499.99,
//     images: [
//       "/images/products/organic_face_cream.jpg",
//       "/images/products/organic_face_cream_side.jpg"
//     ],
//     description: "A natural, organic face cream suitable for all skin types. Enriched with aloe vera and essential oils.",
//     stock: 120,
//     isAvailable: true,
//     category: "Cosmetics"
//   },
//   {
//     productId: "COSM002",
//     name: "Charcoal Face Wash",
//     alternatives: ["Deep Cleanser", "Oil Control Wash"],
//     labelled: 999,
//     price: 799,
//     images: [
//       "/images/products/charcoal_face_wash.jpg"
//     ],
//     description: "Deep cleansing face wash with activated charcoal for oily and acne-prone skin.",
//     stock: 80,
//     isAvailable: true,
//     category: "Cosmetics"
//   },
//   {
//     productId: "COSM003",
//     name: "Vitamin C Serum",
//     alternatives: ["Brightening Serum", "Antioxidant Serum"],
//     labelled: 1499,
//     price: 1299,
//     images: [
//       "/images/products/vitamin_c_serum.jpg"
//     ],
//     description: "Powerful antioxidant serum with 20% vitamin C for brighter, even-toned skin.",
//     stock: 60,
//     isAvailable: true,
//     category: "Cosmetics"
//   },
//   {
//     productId: "COSM004",
//     name: "Cocoa Body Butter",
//     alternatives: ["Shea Body Cream", "Ultra Moisturizing Lotion"],
//     labelled: 799,
//     price: 699,
//     images: [
//       "/images/products/cocoa_body_butter.jpg"
//     ],
//     description: "Rich body butter with cocoa and shea for intense skin hydration.",
//     stock: 90,
//     isAvailable: true,
//     category: "Cosmetics"
//   },
//   {
//     productId: "COSM005",
//     name: "Sunscreen SPF 50",
//     alternatives: ["Daily UV Block", "Matte Finish Sunscreen"],
//     labelled: 999,
//     price: 899,
//     images: [
//       "/images/products/sunscreen_spf50.jpg"
//     ],
//     description: "Broad spectrum sunscreen with SPF 50 for full-day protection. Water-resistant.",
//     stock: 70,
//     isAvailable: true,
//     category: "Cosmetics"
//   }

// ]

export default function ProductAdminPage(){
    const [products,setProduct] = useState([]) //Need to give an empty array
    const [isLoading,setIsLoading]=useState(true)
    useEffect(()=>{ //useEffect hook is needed to stop run the useState function again and again
      if(isLoading){ //If it is only loading run this. This is to stop the looping of setIsLoading
         axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products").then(
          (res)=>{
          setProduct(res.data)
          setIsLoading(false)
      }
    )
        
      }
     
    }, [isLoading] //Giving this array is a must Dependency array //Can give a variable //if this variable value change, function will run again
  )
    //Data retrieval from backend
    //setProducts()
    
    const navigate= useNavigate()

    return(
        <div className="w-full h-full border-[3px]">
            {/* <button className="fixed right-[60px] bottom-[60px] text-white bg-black p-[15px] rounded-full shadow-3xl cursor-pointer">
                <PiPlus className="text-3xl"/>
            </button> */}
            {isLoading?(<Loader/>):<table> {/*If isLoading true show Loading..otherwise ahow the table*/}
                <thead>
                    <tr>
                        <th className='p-[10px]'>Image</th>
                        <th className='p-[10px]'>Product ID</th> {/*th is used instead of td to get bold*/}
                        <th className='p-[10px]'>Name</th>
                        <th className='p-[10px]'>Price</th>
                        <th className='p-[10px]'>Labelled Price</th>
                        <th className='p-[10px]'>Category</th>
                        <th className='p-[10px]'>Stock</th>
                        <th className='p-[10px]'>Action</th>
                        
                    </tr>
                </thead>
                {/* <tbody>
                    <tr>
                        <td className='p-[10px]'>COSM001</td>
                        <td className='p-[10px]'>Hydrating Face Cram</td>
                        <td className='p-[10px]'>2499</td>
                        <td className='p-[10px]'>Cosmatics</td>
                        <td className='p-[10px]'>120</td>
                    </tr>    
                </tbody> */}
                <tbody>
                    {
                        products.map(
                            (Product,index)=>{
                                console.log(index)
                                return(
                                <tr key={index}> {/*Need to give key to avoid error*/}
                                    <td className='p-[10px]'>
                                        <img src={[Product.images[0]]} alt={Product.name} className='w-[50px] h-[50px] object-cover'/>
                                    </td>
                                    <td className='p-[10px]'>{Product.productId}</td> 
                                    <td className='p-[10px]'>{Product.name}</td>
                                    <td className='p-[10px]'>{Product.price}</td>
                                    <td className='p-[10px]'>{Product.labelled}</td>
                                    <td className='p-[10px]'>{Product.category}</td>
                                    <td className='p-[10px]'>{Product.stock}</td>
                                    <td className='p-[10px] flex flex-row justify-center items-center'>
                                      <BiTrash className='bg-red-500 p-[5px] text-3xl rounded-full text-white shadow-2xl shadow-red-500 cursor-pointer' onClick={
                                        ()=>{
                                          const token=localStorage.getItem("token")
                                          if(token==null){
                                            navigate("/login")
                                            return
                                          }
                                          axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/products/" + Product.productId,{
                                            headers:{
                                              Authorization: `Bearer ${token}`
                                            }
                                          }).then(
                                            (res)=>{
                                              console.log("Product deleted successfully")
                                              console.log(res.data)
                                              toast.success("Product deleted successfully")
                                              setIsLoading(isLoading+1)//useEffect function will run again
                                              //setProduct(products.filter(p=>p.productId !== products.productId))
                                            }
                                          ).catch(
                                            (error)=>{
                                              console.error("Error deleting product",error)
                                              toast.error("Failed to delete product")
                                            }
                                          )
                                          
                                        }
                                      }/>
                                      <BiEdit onClick={
                                        ()=>{
                                          navigate("/admin/updateProduct",
                                          {
                                            state : Product //To bring the data with navigating
                                          })
                                        }
                                      } className='bg-blue-500 p-[7px] text-3xl rounded-full text-white shadow-2xl shadow-black cursor-pointer ml-[10px]'/>
                                    </td>
                                    
                                </tr>
                                )

                            }
                        )
                    }
                </tbody>
            </table>}
            {/* {
                sampleProducts.map(
                    (product)=>{
                        console.log(product)
                        return <div>
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p>{product.price}</p>
                            <p>{product.stock}</p>
                            <p>{product.category}</p>
                        </div> //What is returned here will display in web page
                    }) //To map arra of product
            } */}
            <Link to="/admin/newProduct" className="fixed right-[60px] bottom-[60px] text-white bg-black p-[15px] rounded-full shadow-3xl">
                <PiPlus className="text-3xl"/>
            </Link>
        </div>
    )
}