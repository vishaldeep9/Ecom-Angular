export interface signUp{
    name:string,
    password:string,
    email:string
}

export interface login{
    email:string,
    password:string,
   
}
export interface product{
    quantity: number |undefined
    name:string,
    price:number,
    color:string,
    category:string,
    description:string,
    imageUrl:string,
    id:string,
    productId:undefined|string
}
export interface cart{
    quantity: number |undefined
    name:string,
    price:number,
    color:string,
    category:string,
    description:string,
    imageUrl:string,
    id:string |undefined ,
    userId:string,
    productId:string
}
export interface priceSummary{
    price:number,
    discount:number,
    delivery:number,
    tax:number,
    total:number
}
export interface order{
    email:string,
    contact:string,
    totalPrice:number,
    address:string,
    userId:string
}