export class ProductReq {
    constructor(
        public _id: string,
        public productName: string,
        public productId: string,
        public quantity: number,
    ) { }
}