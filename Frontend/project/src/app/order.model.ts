import { Product } from "./product.model";

export class Order {
    constructor(
        public _id: string,
        public product: Array<Product>,
        public userId: string,
        public status: string,
        public sellDate: Date,
        public total: number
    ) { }


}