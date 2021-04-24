export class Employee {
    constructor(
        public _id: string,
        public hashedPassword: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public isAdmin: boolean
    ) { }
}