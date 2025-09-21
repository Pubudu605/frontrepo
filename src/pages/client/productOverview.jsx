import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Loader from "../../components/loader"
import ImageSlider from "../../components/imageSlider"
import { addToCart, getCart } from "../../utils/card"

export default function ProductOverviewPage(){
    const params = useParams()
    const [product, setProduct]=useState(null)
    const navigate = useNavigate()
    //const [loading, setLoading]=useState(true)
    const [status, setStatus]=useState("loading") //The reason of not usign boolean There are three states loading, loading is ok and can get the data, something is wrong
    useEffect(
        ()=>{
            if(status==="loading"){
                axios.get(import.meta.env.VITE_BACKEND_URL+`/api/products/${params.productId}`).then(
                    (res)=>{
                        // console.log(res.data)
                        setProduct(res.data)
                        setStatus("success")

                    }
                ).catch(
                    (error)=>{
                        // toast.error("Failed to fetch product details")
                        setStatus("error")
                    }
                )
            }

        },[status]
    )
    
    return(
        <div className="w-full h-full">

            {/* <h1 className="text-3xl mb-4">Product Overview Page</h1>
            <p className="text-xl">Product ID:{params.productId}</p> */}
            {
                status == "loding" && <Loader/>
            }
            {
                status == "success" && <div className="w-full h-full flex flex-row">
                    <div className="w-[49%] h-full flex flex-col justify-center items-center">
                        <ImageSlider images={product.images}/>

                    </div>
                    <div className="w-[49%] h-full flex flex-col items-center pt-[50px]">
                        <h1 className="text-2xl font-bold">{product.name} <span className="font-light">{product.alternatives.join(" | ")}</span></h1>
                        <p className="text-lg mt-[20px]">{product.description}</p>
                        <div className="w-full flex flex-col items-center mt-[20px]">
                            {
                                product.labelled>product.price?<div>
                                    <span className="text-2xl font-semibold mr-[20px] line-through">{product.labelled.toLocaleString('en-us',{minimumFractionDigits:2,maximumFractionDigits:2})}</span>
                                    <span className="text-2xl font-bold ">{product.price.toLocaleString('en-us',{minimumFractionDigits:2,maximumFractionDigits:2})}</span>

                                </div>:<div>
                                    <span className="text-2xl font-bold ">{product.price.toLocaleString('en-us',{minimumFractionDigits:2,maximumFractionDigits:2})}</span>

                                </div>
                            }
                        </div>
                        <div className="w-full flex flex-row justify-center items-center mt-[20px] gap-[10px]">
                            <button onClick={()=>{
                                navigate("/checkout",{state:{items:[{
                                    productId: product.productId,
                                    quantity:1,
                                    name:product.name,
                                    image: product.images[0],
                                    price:product.price
                                }]}})
                            }}  className="w-[150px] h-[30px] cursor-pointer rounded-xl shadow-2xl text-white bg-blue-900 border-[3px] border-blue-900 hover:bg-white hover:text-blue-900">Buy Now</button>
                            <button className="w-[150px] h-[30px] cursor-pointer rounded-xl shadow-2xl text-white bg-blue-600 border-[3px] border-blue-600 hover:bg-white hover:text-blue-600" onClick={
                                ()=>{
                                    //localStorage.setItem("cart","[]")
                                    addToCart(product,1) //Ask to add 1 qty
                                    toast.success("Product added to cart")
                                    console.log(getCart())
                                }
                            }>Add to Cart</button>
                        </div>
                    </div>
                </div>
            }
            {
                status == "error" &&  <div>Error Loading Product</div>
            }
            

        </div>
    )
}