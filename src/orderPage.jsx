import { useEffect, useState } from "react"
import axios from 'axios'
import Paginator from "./components/paginator"
import toast from "react-hot-toast"

export default function OrdersPageAdmin(){
    const [order,setOrders]=useState([])
    const [loading,setLoading]=useState(true)
    const [page,setPage]=useState(1)
    const [totalPages,setTotalPages]=useState(0)
    const [limit,setLimit]=useState(10)
    const [popupVisible, setPopupVisible]=useState(false)
    const [clickedOrder, setClickedOrder]=useState(null)
    const [orderStatus, setOrderStatus]=useState("pending") //pending, completed, cancelled
    const [orderNotes, setOrderNotes]=useState("")

    useEffect(()=>{
        // const token=localStorage.getItem("token")
        // if(token==null){
        //     window.location.href="/login"
        //     return
        // }
        if (loading){
           axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${page}/${limit}`,
            {headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
           }}).then(
          (res)=>{
          setOrders(res.data.orders)
          setTotalPages(res.data.totalPages)
          setLoading(false)
          console.log(res.data)
      }
    ).catch((err)=>{console.error(err)})
        
      
     
    }
    }, [loading,page,limit] //If change again will be refreshed and new values will be taken
    )

    return(
        <div className="w-full h-full flex flex-col justify-between">
            <table className="w-full border-[3px]">
                <thead>
                    <tr>
                        <th className="p-[10px]">Order ID</th>
                        <th className="p-[10px]">Email</th>
                        <th className="p-[10px]">Name</th>
                        <th className="p-[10px]">Address</th>
                        <th className="p-[10px]">Phone</th>
                        <th className="p-[10px]">Status</th>
                        <th className="p-[10px]">Date</th>
                        <th className="p-[10px]">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        order.map((order,index)=>{
                            return(
                            <tr key={index} className="border-b-[1px] hover:bg-blue-600 hover:text-white" 
                            onClick={()=>{
                                setOrderStatus(order.status);
                                setOrderNotes(order.notes);
                                setClickedOrder(order);
                                setPopupVisible(true);
                            }}>
                                <td className="p-[10px]">{order.orderID}</td>
                                <td className="p-[10px]">{order.email}</td>
                                <td className="p-[10px]">{order.name}</td>
                                <td className="p-[10px]">{order.address}</td>
                                <td className="p-[10px]">{order.phone}</td>
                                <td className="p-[10px]">{order.status}</td>
                                <td className="p-[10px]">{new Date(order.date).toLocaleDateString()}</td>
                                <td className="p-[10px] text-end">{order.total.toLocaleString('en-us',{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
                            </tr>
                            )
                        })
                    }
                </tbody>
            </table>




           {
  popupVisible && clickedOrder && (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50">
      <div className="w-[700px] max-h-[90vh] bg-white rounded-xl shadow-lg overflow-y-auto relative p-6">
        {
            (orderStatus!=clickedOrder.status || orderNotes!=clickedOrder.notes) && <button className="absolute top-40 right-2 bg-blue-500 text-white p-2 rounded-lg" 
            onClick={async ()=>{
                setPopupVisible(false);
                try{
                    await axios.put(
                      `${import.meta.env.VITE_BACKEND_URL}/api/orders/${clickedOrder.orderID}`,
                          {
                            status: orderStatus,
                            notes: orderNotes,
                          },
                    {
                            headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    }
                    )

                    
                    toast.success("Order updated successfully")
                    setLoading(true)
                }catch(err){
                    console.error(err)
                    toast.error("Failed to update order")
                }
            }}>
            Save Changes
            </button>
        }
        {/* Close Button */}
        <button
          className="absolute w-[35px] h-[35px] flex items-center justify-center bg-red-600 text-white rounded-full top-3 right-3 cursor-pointer hover:bg-transparent hover:text-red-600 border border-red-600 transition"
          onClick={() => setPopupVisible(false)}
        >
          ✕
        </button>

        {/* Order Header */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Order Details - <span className="text-indigo-600">{clickedOrder.orderID}</span>
        </h2>

        {/* Customer Info */}
        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <div>
            <p><span className="font-semibold">Name:</span> {clickedOrder.name}</p>
            <p><span className="font-semibold">Email:</span> {clickedOrder.email}</p>
            <p><span className="font-semibold">Phone:</span> {clickedOrder.phone}</p>
          </div>
          <div>
            <p><span className="font-semibold">Address:</span> {clickedOrder.address}</p>
            <p><span className="font-semibold">Status:</span> 
              <span className={`ml-2 px-2 py-1 rounded text-xs font-medium 
                ${clickedOrder.status === "pending" ? "bg-yellow-100 text-yellow-700" : 
                  clickedOrder.status === "completed" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                {clickedOrder.status}
              </span>
              <select className="ml-4 p-1 border rounded" value={orderStatus} onChange={(e)=>setOrderStatus(e.target.value)}
                >
                    <option value="Pendind">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>

              </select>
            </p>
            <p><span className="font-semibold">Date:</span> {new Date(clickedOrder.date).toLocaleString()}</p>
          </div>
        </div>

        {/* Notes */}
        <div className="mb-6">
          <p className="font-semibold text-sm text-gray-700">Notes:</p>
          {/* <p className="text-gray-600 text-sm">{clickedOrder.notes || "No additional notes"}</p> */}
        </div>
        <textarea className="w-full h-[50px] p-2 border rounded mt-2" value={orderNotes} onChange={(e)=>{setOrderNotes(e.target.value)}} ></textarea>

        {/* Items List */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Items</h3>
          <div className="space-y-3">
            {clickedOrder.items.map((item) => (
              <div key={item._id} className="flex items-center gap-4 p-3 border rounded-lg hover:shadow">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md border" />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">Product ID: {item.productId}</p>
                  <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                </div>
                <p className="font-semibold text-gray-800">
                  {(item.price * item.qty).toLocaleString("en-US", {
                    style: "currency",
                    currency: "LKR",
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="mt-6 text-right">
          <p className="text-lg font-bold text-gray-800">
            Total: {clickedOrder.total.toLocaleString("en-US", { style: "currency", currency: "LKR" })}
          </p>
          
        </div>
        
        
      </div>
    </div>
  )
}
            <Paginator currentPage={page} totalPages={totalPages} setCurrentPage={setPage} limit={limit} setLimit={setLimit} setLoading={setLoading}/>
        </div>
    )
}