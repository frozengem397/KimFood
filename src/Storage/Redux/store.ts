import {configureStore} from "@reduxjs/toolkit";
import { authApi, menuItemApi, orderApi, paymentApi, shoppingCartApi } from "../../apis";
import { menuItemReducer } from "./MenuItemSlice";
import { shoppingCartReducer } from "./shoppingCartSlice";
import { userAuthReducer } from "./userAuthSlice";

const store = configureStore({
    reducer:{
        menuItemStore:menuItemReducer,
        shoppingCartStore: shoppingCartReducer,
        userAuthStore: userAuthReducer,
        [menuItemApi.reducerPath]: menuItemApi.reducer,
        [shoppingCartApi.reducerPath]:shoppingCartApi.reducer,
        [authApi.reducerPath]:authApi.reducer,
        [paymentApi.reducerPath]:paymentApi.reducer,
        [orderApi.reducerPath]:orderApi.reducer,

    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(menuItemApi.middleware).concat(shoppingCartApi.middleware).concat(authApi.middleware).concat(paymentApi.middleware).concat(orderApi.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
export default store;