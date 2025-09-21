import ProductCard from "./productCard"

export default function SuperProduct(){
     return( //only one tage can be returned
        <div> 
            <h1>Feature This Week!!!</h1>
            <ProductCard name="Apple macbook Pro" price="2500$" image= "https://picsum.photos/id/4/200/300"/>

        </div>
     )
}