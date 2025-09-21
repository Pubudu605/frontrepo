import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../../components/loader"
import ProductCard from "../../components/productCard"

export default function ProductsPage(){
    const [products,setProducts]=useState([])
    const [loading,setLoading]=useState(true)
    const [query,setquery]=useState("")
    
    useEffect(
        ()=>{
            if(loading){ {/*Get the data while loading*/}

                if(query==""){
                    axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products").then(
                        (res)=>{
                            //console.log(res.data)
                            setProducts(res.data)
                            setLoading(false)
                        }
                    )
            }else{
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products/search/"+query,)
                .then(
                        (res)=>{
                            //console.log(res.data)
                            setProducts(res.data)
                            setLoading(false)
                        }
                    )
            }
        }

        },[loading] //function will run again and again when the value change
    )
    return(
        <div className="w-full h-full">
            <div className="w-full h-[100px] flex justify-center items-center">
                <input type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => { setquery(e.target.value); setLoading(true); }}
                className="w-[400px] h-[40px] border-gray-900 rounded-lg p-2" />
            </div>
            {
                // loading?<Loader/>:<h1>Items Loaded</h1>
                loading?<Loader/>:
                <div className="w-full flex flex-wrap gap-[40px] just items-center">
                    {
                        products.map((Product)=>{
                            return(
                                <ProductCard key={Product.productId} Product={Product}/>
                            )

                        })
                    }

                </div>
            }
            

        </div>
    )
}