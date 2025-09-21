import { useState } from 'react'

import { useGoogleLogin } from '@react-oauth/google'



// export default function LoginPage(){
//     const [password,setPassword]=useState("")
//     const [email, setEmail] = useState("")
//     const navigate = useNavigate() //navigat is a function this is a hook can go easily
//     const googleLogin = useGoogleLogin({
//         onSuccess:(response)=>{
//             axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/google-login",{
//                 token:rsponse.access_token
//             }).then(
//                 (response)=>{
//                     console.log(response.data)
//                     localStorage.setItem("token",response.data.token)
//                     toast.success("Login successful")
//                     if(response.data.role=="admin"){
//                         navigate("/admin")
//                     }else if(response.data.role=="user"){
//                         navigate("/")
//                     }

//                 }
//             ).catch(
//                 (error)=>{
//                     toast.error("Google login failed")
//                 }
//             )
//         }
//     })


import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



import { Link } from "react-router-dom";

export default function LoginPage() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const googleLogin = useGoogleLogin({
        onSuccess: (response) => {
            axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/google-login", {
                token: response.access_token
            }).then(
                (response) => {
                    console.log(response.data)
                    localStorage.setItem("token", response.data.token)
                    toast.success("Login successful")
                    if (response.data.role == "admin") {
                        navigate("/admin")
                    } else if (response.data.role == "user") {
                        navigate("/")
                    }
                }
            ).catch(
                (error) => {
                    toast.error("Google login failed")
                }
            )
        }
    });

    function login() { {/*Axios is used to call backend as a http request*/}
        console.log(email, password)
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", {
            email: email,
            password: password
        }).then(
            (response) => {
                console.log(response.data)
                localStorage.setItem("token", response.data.token)//To store the token
                //const token =localStorage.getItem("token") //To read the token

                toast.success("Login Successful")
                if (response.data.role == "admin") {
                    //Go to the admin page
                    //window.location.href="/admin"
                    navigate("/admin")

                } else if (response.data.role == "user") {
                    //Go to the user page
                    //window.location.href="/user"
                    navigate("/")
                }
            }
        ).catch(
            (error) => {
                console.log(error)
                toast.error("Invalid email or password")
            }
        )
    }
    return (
        <div className="w-full h-screen bg-[url(./loginbg.jpg)] bg-center bg-cover flex justify-center items-center">
            <div className="w-[500px] h-[500px] gap-[20px] backdrop-blur-xl shadow-2xl rounded-[30px] flex flex-col items-center justify-center relative">
                <h1 className="absolute top-[20px] text-3xl font-bold text-center my-5">Login</h1>
                <div className="w-[350px] flex flex-col">
                    <span className="text-lg">Email</span>
                    <input onChange={(e) => {
                        setEmail(e.target.value)
                        console.log("Email is changed")
                    }}
                        className="w-[350px] h-[40px] border border-black-500 rounded-xl" type="text" />
                </div>

                <div className="w-[350px] flex flex-col">
                    <span className="text-lg">Password</span>
                    <input onChange={
                        (e) => { {/*This is a function which pass the event new event value can be read*/}
                            // console.log(e.target.value) 
                            setPassword(e.target.value)
                            console.log("Password is changed")
                        }
                    }
                        type="password" className="w-[350px] h-[40px] border border-black-500 rounded-xl" />
                </div>

                <button onClick={login} className="w-[350px] h-[40px] bg-blue-500 rounded-xl text-white text-lg mt-5 hover:bg-blue-600 transition-all duration-300">
                    Login
                </button>
                <button onClick={googleLogin} className="w-[350px] h-[40px] bg-blue-500 rounded-xl text-white text-lg mt-5 hover:bg-blue-600 transition-all duration-300">
                    Google Login
                </button>
                <p>Don't have an account? <Link to="/register" className='text-blue-500'>Sign up</Link> from here</p>
                <p>Forget Password <Link to="/forget" className='text-blue-500'>Reset Password</Link> from here</p>

            </div>
        </div>
    )
}




