const RegisterValidation = (values)=>{
    let error ={}
    
    if(values.email===""){
        error.email = "Email should not be Empty";
    }
    else error.email="";

    if(values.password===""){
        error.password = "Password should not be Empty";
    }
    else error.password="";
   
    if(values.password[0] !== values.confirmPassword[0]){
        error.confirmPassword = "Password doesn't match";
    }
    else error.confirmPassword="";

    return error;
    
}

export default RegisterValidation;


