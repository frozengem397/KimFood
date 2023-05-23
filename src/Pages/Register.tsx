import React, { useState } from 'react'
import { inputHelper, toastNotify } from '../Helper';
import { useRegisterUserMutation } from '../apis/authApi';
import { apiResponse } from '../Interfaces';
import { useNavigate } from 'react-router-dom';
import { MainLoader } from '../Components/Page/MenuItems/Common';

function Register() {
    const [loading, setLoading] = useState(false);
    const [userInput,setUserInput] = useState({
        userName:"",
        password:"",
        role:"",
        name:"",
    });
    const [registerUser] = useRegisterUserMutation();
    const navigate = useNavigate();

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const tempData = inputHelper(e,userInput);
        setUserInput(tempData);
    }
    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const response: apiResponse = await registerUser({
            userName:userInput.userName,
            password:userInput.password,
            role:userInput.role,
            name:userInput.name,
        });
        if(response.data) {
            toastNotify("Successfully Register")
            navigate("/login");

        } else if (response.error) {
            toastNotify(response.error.data.errorMessages[0],"error")
        }

        setLoading(false);
    }
  return (
    <div className = "container text-center">
        {loading && <MainLoader />}
        <form method = "post" onSubmit={handleSubmit}>
            <h1 className = "mt-5">Register</h1>
            <div className = "mt-5">
                <div className = "col-sm-6 offset-sm-3 col-xs-12 mt-4">
                    <input type = "text" className = "form-control" placeholder = "Enter UserName" name = "userName" value = {userInput.userName} onChange = {handleUserInput} required />

                    
                </div>
                <div className = "col-sm-6 offset-sm-3 col-xs-12 mt-4">
                    <input type = "text" className = "form-control" placeholder = "Enter Name" name = "name" value = {userInput.name} onChange = {handleUserInput} required />

                    
                </div>
                <div className = "col-sm-6 offset-sm-3 col-xs-12 mt-4">
                    <input type = "password" className = "form-control" placeholder="Enter Password" name = "password" value = {userInput.password} onChange = {handleUserInput} required />

                </div>

                <div className = "col-sm-6 offset-sm-3 col-xs-12 mt-4">
                    <select className = "form-control form-selecta" name = "role" value = {userInput.role} onChange = {handleUserInput} required>
                        <option value = "">--Select Role--</option>
                        <option value="customer">Customer</option>
                        <option value = "admin">Admin</option>

                    </select>
                </div>
            </div>
            <div className = "mt-5">
                <button type = "submit" className ="btn btn-success" disabled = {loading}>
                    Register
                </button>
            </div>
        </form>
    </div>
  )
}

export default Register