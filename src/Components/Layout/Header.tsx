import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import cartItemModel from '../../Interfaces/cartItemModel';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Storage/Redux/store';
import { userModel } from '../../Interfaces';
import { setLoggedInUser } from '../../Storage/Redux/userAuthSlice';

function Header() {
  const navigate  = useNavigate();
  const dispatch = useDispatch();
  const shoppingCartFromStore: cartItemModel[] = useSelector((state:RootState)=> state.shoppingCartStore.cartItems??[]);
  const userData : userModel = useSelector((state:RootState)=>state.userAuthStore);
  const emptyUser:userModel = {
    fullName:"",
    id:"",
    email:"",
    role:"",
  }

  const handleLogout =()=>{
    localStorage.removeItem("token");
    dispatch(setLoggedInUser({...emptyUser}));
    navigate("/")

  }
  return (
    <div><nav className="navbar navbar-expand-lg bg-dark navbar-dark">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">Kim's Food!</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100">
          <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to = "/">Home</NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to = "/shoppingCart">
              <i className="bi bi-cart"></i>{" "}
              {userData.id && `(${shoppingCartFromStore.length})`}        
            </NavLink>
          </li>
          {userData.role == "admin"?(<li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Admin Panel
            </a>
            <ul className="dropdown-menu">
              <li style ={{cursor:"pointer"}}className="dropdown-item" onClick ={() => navigate("menuItem/menuitemlist")}>Add a new one</li>
              <li><a className="dropdown-item" onClick={()=>navigate("order/myorders")}>My orders</a></li>
              <li><a className="dropdown-item" onClick={()=>navigate("order/allOrders")}>All orders</a></li>
          
              
            </ul>
          </li>):(<li className = "nav-item">
            <NavLink className = "nav-link" aria-current = "page" to="/order/myOrders">
              My Orders
            </NavLink>
          </li>)}
          
         
    
          <div className = "d-flex" style = {{marginLeft : "auto"}}>
            {userData.id &&(<><li className = "nav-item"><button className = "nav-link active" style = {{cursor:"pointer",background:"transparent",border:0,}}>Welcome, {userData.fullName}</button>
                </li>
                <li className="navitem pt-1">
                <button className="btn btn-success btn-outlined rounded-pill text-white mx-2" style={{ border: "none", height: "40px", width: "100px", }} onClick={handleLogout}>Logout</button>
              </li></>)}
            {!userData.id && (<><li className='nav-item text-white'>
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li><li className='nav-item text-white'>
                  <NavLink className="btn btn-success btn-outlined rounded-pill text-white mx-2" style={{ border: "none", height: "40px", width: "100px", }} to="/login">
                    Login
                  </NavLink>
                </li></>)}
            
          </div>
        </ul>
        
      </div>
    </div>
  </nav></div>
  )
}

export default Header