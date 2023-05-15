import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../helper";
const Admin = () =>{
    const [users,setUsers] = useState([]);
    const [adminLogin,setAdminLogin]  = useState(false);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [errors,setErrors] = useState({}) ;
    useEffect(()=>{
        try{
            axios.get(`${BASE_URL}/users`)
            .then((res)=>{
            
                setUsers(res.data);
                
            })
        }catch(e){
            console.log(e);
        }
    },[adminLogin])
    

    const handleSubmit = (event)=>{
        event.preventDefault();
        let e = {};
        if(email===""){
            e.email = "Email should not be Empty";
        }
        else e.email="";
    
        if(password===""){
            e.password = "Password should not be Empty";
        }
        else e.password="";
        setErrors(e);
        if(errors.email==="" && errors.password===""){
            try {
            
                if(email==="root@123.com" && password==="123456"){
                    setAdminLogin(true);
                }
                
            } catch (e) {
                console.log(e)
            }
          
        }
          
    }

    return (
        <>
        {!adminLogin ?<div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
       <div className='bg-white p-3 rounded w-25'>
       <form onSubmit={handleSubmit}>
            <h2>Admin Login</h2>
            <div className='mb-3'>
                <label htmlFor='email'><strong>Email</strong></label>
                <input onChange={(e)=>setEmail(e.target.value)} name="email" className="form-control rounded-0" type='email' placeholder='Enter Email' />
                {errors.email && <span  className="text-danger">{errors.email}</span>}
            </div>
            <div>
                <label htmlFor='password'><strong>Password</strong></label>
                <input onChange={(e)=>setPassword(e.target.value)} name="password" className="form-control rounded-0" type='password' placeholder='Enter Password' />
                {errors.password && <span className="text-danger">{errors.password}</span>}
            </div>
            <p></p>
            <button type="submit" className='btn btn-success w-100 '><strong>Log in</strong></button>
            
            
        </form>
       </div>
    </div>
    :
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
            <div className='bg-white p-5 rounded w-70 '>
              <h2>Welcome to Admin Page</h2>
              <h3 style={{textAlign:"center"}}>View the Progress Board here:</h3>
              {
                users.map((user)=>{
                    return (
                        <div key={user.id}>
                            <ul>
                                <li>Email : <span>{user.email}</span></li>
                                <li>Progress : <span>{user.progress}</span></li>
                            </ul>                        
                        </div>
                    );
                })
              }
            </div>
        </div>
        }
    </>
    );
}

export default Admin;