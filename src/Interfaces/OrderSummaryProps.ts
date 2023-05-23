import shoppingCartModel from "./shoppingCartModel";

export default interface OrderSummaryProps{
    data:{
        id?:number;
        cartItems?:shoppingCartModel[];
        cartTotal?:number;
        userId?:string,
        stripePaymentIntentId?:string;
        status?:string;
    };
    userInput:{
        name?:string;
        email?:string;
        phoneNumber?:string;
    }
}