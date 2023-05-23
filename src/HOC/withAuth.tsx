import React from "react"


const withAuth = (WrappedComponent:any)=>{
    
    return(props:any) => {
        const accessToken = localStorage.getItem("token");
        if(!accessToken){
            window.location.replace("https://frozengem397.github.io/KimFood/login");
            return null;
        }
        return <WrappedComponent {...props} />
    };
};

export default withAuth;