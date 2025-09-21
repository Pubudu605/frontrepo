// [
//     {
//         productId:"1213",
//         quantity:3,
//         price:3232.3,
//         name:"sample product",
//         alternatives:["sample item","Example product"],
//         image:"htttp://thd.jpg"
//     },
//     {
//         productId:"1214",
//         quantity:1,
//         price:1232.3,
//         name:"sample product 2",
//         alternatives:["sample item 2","Example product 2"],
//         image:"htttp://thd.jpg"
//     },
//     {
//         productId:"1215",
//         quantity:2,
//         price:2232.3,
//         name:"sample product 3",
//         alternatives:["sample item 3","Example product 3"],
//         image:"htttp://thd.jpg"
//     }
// ]

export function getCart(){
    let cartInString = localStorage.getItem("cart") //Attmept to get a cart from local storage

    if(cartInString==null){ //If there is no make a cart string
        cartInString="[]" //empty cart string
        localStorage.setItem("cart",cartInString)//Save in local storage
    }
    const cart = JSON.parse(cartInString)//convert string into JSON
    return cart

}

export function addToCart(product,qty){
    const cart = getCart() //retriev from local storgae
    const existingProductIndex = cart.findIndex((item)=>{
        return item.productId === product.productId
    })
    if(existingProductIndex == -1){ //-1 mean no equal indexes
        cart.push({   //will hang at the end 
            productId: product.productId,
            quantity: qty,    
            price: product.price,
            name: product.name,
            alternatives: product.alternatives,
            image: product.images[0]

        }
    )
    localStorage.setItem("cart",JSON.stringify(cart))
    }else{ //If already this product is included
        const newQty = cart[existingProductIndex].quantity+qty
        if(newQty<=0){//qty may have - values, then we have to remove that
            const newCart = cart.filter((item,index)=>{
                return index !== existingProductIndex
            })
            localStorage.setItem("cart",JSON.stringify(newCart))
        }else{
            cart[existingProductIndex].quantity =newQty
            localStorage.setItem("cart",JSON.stringify(cart))
        }
    }
}

export function getTotal(){
    const cart = getCart()
        let total =0
        cart.forEach((item)=>{
            total+=item.quantity*item.price

        })
        return total
    }
