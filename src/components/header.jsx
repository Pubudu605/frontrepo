import { useState } from "react";
import { BiCart, BiStore } from "react-icons/bi";
import { GiHamburger, GiHamburgerMenu } from "react-icons/gi";
import { HiHome } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

export default function Header(){
    const navigate = useNavigate()
    const [isOpen,setisOpen]=useState(false)
    return(
        <header className="h-[100px] bg-accent flex justify-center items-center relative"> 
        {/* {isOpen &&
            <div className="fixed  top-0 right-0 w-[100vw] h-[100vh] bg-[#00000050] flex flex-col">
                <div className="w-full h-[100px] bg-primary flex pl^[px] flex-row justify-center ">
                    <GiHamburgerMenu className="text-white text-4xl left-[40px] " onClick={()=>{
                        setisOpen(close)
                    }}/>
                    <img className="w-[200px] h-[100px] object-cover cursor-pointer" src="/logo06.jpg" alt="Logo" onClick={()=>{navigate("/")}}/>
                </div>
                <div className="w-full h-full flex flex-col p-[45px] items-start">
                    <button className="text-2xl text-accent flex flex-row items-center" onClick={()=>{
                        setisOpen(false)
                        navigate("/")
                    }}>
                        <HiHome className="text-accent text-2xl mr-2"/>
                        Home

                     </button>

                     <button className="text-2xl text-accent flex flex-row items-center" onClick={()=>{
                        setisOpen(false)
                        navigate("/products")
                    }}>
                        <BiStore className="text-accent text-2xl mr-2"/>
                        Products

                     </button>

                     <button className="text-2xl text-accent flex flex-row items-center" onClick={()=>{
                        setisOpen(false)
                        navigate("/cart")
                    }}>
                        <BiStore className="text-accent text-2xl mr-2"/>
                        Cart

                     </button>

                 </div>
            </div>
            
        } */}
        {/* <GiHamburgerMenu className="text-white text-4xl left-[40px] " onClick={()=>{
                        setisOpen(true)
                    }}/> */}
        
        <img className="w-[200px] h-[100px] object-cover absolute left-0 cursor-pointer" src="/logo06.jpg" alt="Logo" onClick={()=>{navigate("/")}}/>
        
            <Link to="/" className="text-white text-xl"> Home</Link>
            <Link to="/products" className="text-white text-xl ml-4">Products</Link>
            <Link to="/reviews" className="text-white text-xl ml-4">Reviews</Link>
            <Link to="/about-us" className="text-white text-xl ml-4">About Us</Link>
            <Link to="/contact-us" className="text-white text-xl ml-4">Contact Us</Link>
            <Link to="/cart" className="absolute right-[80px]">
                <BiCart className="text-white text-3xl ml-4"/>
            </Link>
        </header>
    )
}