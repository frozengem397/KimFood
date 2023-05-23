import React, { useState } from 'react'
import { useLoginUserMutation, useRegisterUserMutation } from '../apis/authApi';
import { inputHelper } from '../Helper';
import { apiResponse, userModel } from '../Interfaces';
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { setLoggedInUser } from '../Storage/Redux/userAuthSlice';
import { useNavigate } from 'react-router-dom';
import { MainLoader } from '../Components/Page/MenuItems/Common';

function Login() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userInput,setUserInput] = useState({
        userName:"",
        password:"",
    });
    const [loginUser] = useLoginUserMutation();

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempData = inputHelper(e,userInput);
        setUserInput(tempData);
    }
    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const response: apiResponse = await loginUser({
            userName:userInput.userName,
            password:userInput.password,

        });
        if(response.data) {
            const {token} = response.data.result;
            const {fullName,id,email,role}:userModel = jwt_decode(token);
            localStorage.setItem("token",token);
            dispatch(setLoggedInUser({fullName,id,email,role}));
            navigate("/");

        } else if (response.error) {
            setError(response.error.data.errorMessages[0]);
        }

        setLoading(false);
    }
  return (
    <div className='container text-center'>
        {loading && <MainLoader />}
        <form method = "post" onSubmit={handleSubmit}>
            <h1 className = "mt-5">Login</h1>
            <div className="mt-5">
                <div className ="col-sm-6 offset-sm-3 col-xs-12 mt-4">
                    <input type ="text" className ="form-control" placeholder = "Enter UserName" name ="userName" value = {userInput.userName} onChange ={handleUserInput} required/>
                </div>
                <div className ="col-sm-6 offset-sm-3 col-xs-12 mt-4">
                    <input type ="password" className ="form-control" placeholder = "Enter Password" name ="password" value = {userInput.password} onChange ={handleUserInput} required />
                </div>
            </div>
            <div className = "mt-2">
                {error && <p className = "text-danger">{error}</p>}
                <button type = "submit" className = "btn btn-success" style = {{width:"200px"}}>Log In</button>
            </div>
        </form>
    </div>
  )
}

export default Login