export default interface shoppingCartModel {
    id?: number;
    userId?:string;
    cartItems?:any[];
    cartTotal?:number;
    stripePaymentIntentId?:any;
    clientSecret?:any;
}