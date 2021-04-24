export class User{
    constructor(public _id:string,
                public firstName:string,
                public lastName:string,
                public birthday:Date,
                public address:string,
                public email:string,
                public hashedPassword:string,
                public funds:string,
                public cart:any,    // once Product file is created it will be Array<Product>
                public orders:any,  // one Order file is created it will be Array<Order>
                public isLockedOut:boolean,
                public numberOfTries:number
                ){}
}