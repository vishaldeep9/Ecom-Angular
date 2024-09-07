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
    id:string
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
