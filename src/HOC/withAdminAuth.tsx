import React from "react";
import jwt_decode from "jwt-decode";
import { AccessDenied, Login } from "../Pages";


const withAdminAuth = (WrappedComponent:any)=>{
   
    return(props:any) => {
        const accessToken = localStorage.getItem("token") ?? "" ;
        
        if(accessToken) {
            const decode: {
                role:string;
            } = jwt_decode(accessToken);
            if(decode.role!=="admin"){
                // setTimeout(()=>{
                //     window.location.replace("/KimFood/accessDenied");
                // })             
                return <AccessDenied />;
            }
        }
        else{
            // setTimeout(()=>{
            //     window.location.replace("/KimFood/login");
            // })           
            return <Login />;
        }
        
        return <WrappedComponent {...props} />
    };
};

export default withAdminAuth;