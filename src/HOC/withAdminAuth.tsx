import React from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const withAdminAuth = (WrappedComponent:any)=>{
   
    return(props:any) => {
        const accessToken = localStorage.getItem("token") ?? "" ;
        
        if(accessToken) {
            const decode: {
                role:string;
            } = jwt_decode(accessToken);
            if(decode.role!=="admin"){
                window.location.replace("/KimFood/accessDenied");
                
                return null;
            }
        }
        else{
            window.location.replace("/KimFood/login");
            return null;
        }
        
        return <WrappedComponent {...props} />
    };
};

export default withAdminAuth;