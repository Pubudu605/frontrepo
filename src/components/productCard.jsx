// import "./ProductCard.css"
// // //Create our own tags
// // export default function ProductCard(props){ //function name first letter must be capital
// //     console.log(props) //data will be stored as a JSON. Data will be takne from the App.jsx file ProductCard
// //     return( //only one tage can be returned //Can add several classes by keeping space
// //         <div className=" "> 
// //             {/* <h1>Apple Laptop</h1>
// //             <img src="https://picsum.photos/id/1/200/300"/>
// //             <p>Price 550/=</p>
// //             <button>View More</button> */}

import { Link } from "react-router-dom"

// //             <h1>{props.name}</h1>
// //             <img src={props.image}/>
// //             <p>Price {props.price}</p>
// //             <button>View More</button>

// //         </div>
// //     )

// // }

// export default function ProductCard(props) {//This is devolped by using chatgp
//     console.log(props); // You can remove this once debugging is done

//     return (
//         <div className="max-w-xs bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 p-4">
//             <img 
//                 src={props.image} 
//                 alt={props.name} 
//                 className="w-full h-48 object-cover rounded-md"
//             />
//             <div className="mt-4">
//                 <h1 className="text-lg font-bold text-gray-800">{props.name}</h1>
//                 <p className="text-gray-600 mt-2">
//                     Price: <span className="text-green-600 font-semibold">{props.price}/=</span>
//                 </p>
//                 <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
//                     View More
//                 </button>
//             </div>
//         </div>
//     );
// }

export default function ProductCard(props){
    const product=props.Product
    return(
        <Link to={"/overview/"+product.productId} className="min-w-[300px] h-[400px] flex flex-col shrink-0 shadow-2xl rounded-xl overflow-hidden">
            <img src={product.images[0]} className="w-full h-[250px] object-cover"/>
            <div className=" w-full h-[125px] flex flex-col p-[9px]">
                <span className="text-gray-400 text-[12px]">{product.productId}</span>
                <h1 className="text-lg font-bold">{product.name} {" "}
                <span className="text-gray-500 text-[14px]">{product.category}</span>            
                </h1>
                <div>
                    {
                        product.labelled>product.price? (
                            <p>
                                <span className="line-through mr-[10px]">{product.labelled.toLocaleString('en-us',{minimumFractionDigits:2,maximumFractionDigits:2})}</span>
                                <span>{product.price.toLocaleString('en-us',{minimumFractionDigits:2,maximumFractionDigits:2})}</span>
                            </p>
                        )
                        :<span>{product.price.toLocaleString('en-us',{minimumFractionDigits:2,maximumFractionDigits:2})}</span>
                    }
                </div>
                

            </div>
           

        </Link>
    )
}