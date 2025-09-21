import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductCard from './components/productCard'
import SuperProduct from './components/superProduct'
import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminPage from './pages/adminPage'
import TestPage from './pages/testPage'
import { Toaster } from 'react-hot-toast'
import UpdateProductPage from './pages/updateProducts'
import ClientWebPage from './pages/client/clientPage'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ForgetPassword from './pages/client/forgetPassword'
import ForgetPasswordPage from './pages/client/forgetPassword'


// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <> {/*This empty tag is needed to pack several returned items*/}
//       <div className=''>
//         <SuperProduct/>
//         <ProductCard 
//         name="Samsung Galaxy S24 Ultra" 
//         price="1900$" 
//         image= "https://picsum.photos/id/3/200/300"/>

//         <ProductCard 
//         name="Apple macbook Pro" 
//         price="2500$" 
//         image= "https://picsum.photos/id/1/200/300"/>

               
//       </div>
      
//     </>
//   )
// }



// function App(){
//   return(
//     <div classname='w-full h-screen bg-green-300'>
//       <div className='w-[600px] h-[600px] bg-black flex flex-col justify-between items-center relative'> {/*flex is used to give the flexibility to black box */}

//       <div className='w-[75px] h-[75px] bg-amber-700'></div> {/*can give [] to input maunal values*/}
//       <div className='w-[75px] h-[75px] bg-red-900'></div>
//       <div className='w-[75px] h-[75px] bg-green-600 absolute right-[10px] top-[10px]'></div> {/*Absolute can be controlled than fixed by relative layout ex-black layer*/}
//       <div className='w-[75px] h-[75px] bg-purple-600 fixed right-[10px] top-[10px] rounded-full'></div> {/*Fixed is used to place at disired location relative to computer screen*/}
//       <div className='w-[75px] h-[75px] bg-pink-600 fixed left-[50%] top-[50%] z-[50]'></div> {/*Z index to take the layer up 0-9990*/}
//       <div className='w-[75px] h-[75px] bg-yellow-600 fixed left-[calc(50%-37.5px)] top-[calc(50%-37.5px)]'></div> {/*To get exactly into center when fixed*/}

//       </div>

     

//      </div>

      
//    )
//  }



const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
const googleClientSecret = import.meta.env.VITE_GOOGLE_CLIENT_SECRET


function App(){

  return(
    <BrowserRouter>  {/*To go to the routers*/}
    <GoogleOAuthProvider clientId={clientId}>
      <div className='w-full h-screen flex justify-center items-center bg-primary text-secondary'>
        <Toaster position='top-right'/>
        <div className='w-[calc(100vw-35px)] h-[calc(100vh-15px)] border-red-700'>
          <Routes path="/">
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/test" element={<TestPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/admin/*" element={<AdminPage/>}/> {/*Star is used to get anything after admin*/}
            <Route path="/forget" element={<ForgetPasswordPage/>}/>
            <Route path="/*" element={<ClientWebPage/>}/> {/*To get useres*/}

            
          </Routes>

        </div>
      </div>
    </GoogleOAuthProvider>
    </BrowserRouter>
 

      
    
      
  )
}

export default App
