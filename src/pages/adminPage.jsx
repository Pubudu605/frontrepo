import {Link, Routes, Route } from 'react-router-dom'
import { FaBoxArchive } from "react-icons/fa6";
import { GiShoppingBag } from "react-icons/gi";
import { IoPeople } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import ProductsAdminPage from '../productsAdminPage';
import AddProductPage from '../addProductAdminPage';
import UpdateProductPage from './updateProducts';
import OrdersPageAdmin from '../orderPage';

export default function AdminPage(){
    return(
        <div className="w-full h-screen flex">
            {/* <span>Admin Page</span> */}
            <div className="w-[300px] h-full flex flex-col items-center">

                <span className='text-3xl font-bold my-5'>Admin Panel</span>
                
                <Link className='flex flex-row h-[60px] w-full border p-[20px] items-center text-xl gap-[5px]' to="/admin/products"><FaBoxArchive className='text-blue-700' />Products</Link>
                <Link className='flex flex-row h-[60px] w-full border p-[20px] items-center text-xl gap-[5px]' to="/admin/orders"><GiShoppingBag />Orders</Link>
                <Link className='flex flex-row h-[60px] w-full border p-[20px] items-center text-xl gap-[5px]' to="/admin/users"><IoPeople />Users</Link>
                <Link className='flex flex-row h-[60px] w-full border p-[20px] items-center text-xl gap-[5px]' to="/admin/setings"><IoSettings />Settings</Link>
                {/* <a href="/admin/products">Products with a tag</a>  */}

            </div>

            {/* <div className="w-[700px] h-full bg-blue-900"></div> */}
            <div className="w-[calc(100%-300px)] h-full">
                <Routes path="/*">
                    <Route path="/" element={<h1>Dashboard</h1>}/>
                    <Route path="/products" element={<ProductsAdminPage/>}/>
                    <Route path="/newProduct" element={<AddProductPage/>}/>
                    <Route path="/orders" element={<OrdersPageAdmin/>}/>
                    <Route path="/updateProduct" element={<UpdateProductPage/>}/>
                
                </Routes>
            </div>
        </div>
    )
}