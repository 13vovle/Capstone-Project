export class Ticket{
    constructor(public _id:string,
                public userId:string,
                public description:string,
                public isLockedOut:boolean,
                ){}
}