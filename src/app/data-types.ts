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
    name:string,
    price:number,
    color:string,
    category:string,
    description:string,
    imageUrl:string,
    id:string
}