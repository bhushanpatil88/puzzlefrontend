const LoginValidation = (values)=>{
    let error ={}
    
    if(values.email===""){
        error.email = "Email should not be Empty";
    }
    else error.email="";

    if(values.password===""){
        error.password = "Password should not be Empty";
    }
    else error.password="";

    return error;
    
}

export default LoginValidation;