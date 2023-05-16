import { useEffect, useState } from "react";
import {  useNavigate,useParams } from "react-router-dom";
import axios from 'axios'
import Error from "./Error";
import table from './table.png'
import { useCookies } from "react-cookie";
import { BASE_URL } from "../helper";

const Question = ()=>{
    const params = useParams();
    const [question,setQuestion] = useState({});
    const [cookies, setCookies, removeCookie] = useCookies();
    const navigate  = useNavigate();

    useEffect(()=>{
        
        //frontend check
        if(params.id!=4.2 && params.id!=2.2 && params.id > cookies.progress){
            removeCookie("token");
            removeCookie('progress');
            navigate("/");
        }

        axios.get(`${BASE_URL}/question/${params.id}`,  {
            headers: {
                Authorization : `Bearer ${cookies.token}`,
            }}).then(function (response) {
        
        if(response.data.error == 'access denied'){
            removeCookie("token");
            removeCookie('progress');
            navigate('/');
        }
        // console.log("any question");
        // console.log(response.data);
        setQuestion(response.data);
    });
    },[params])

   

    
    const [ans,setAns] = useState("");
    const [error,setError] = useState();

    // Render only valid pages
    if(params.id!=1 && params.id!=2.1 && params.id!=2.2 && params.id!=4.1 && params.id!=4.2 && params.id!=3 && params.id!=5 && params.id!=6 ){

        return <Error/>
    }
    
    
    const handleInput = (e) =>{
        setAns(e.target.value);
    }

    const submitHandler = async (e) =>{
        e.preventDefault();
        if(ans===""){
            setError("Your answer is Empty");
            return;
        }
        setError("");
        try {

            const res = await axios.post(`${BASE_URL}/question/${params.id}`,{answer:ans,token:cookies.token});
        
            if(res.data.message=="Answer is Wrong"){
                setError("Answer is Wrong");
                return;
            }
            
           
            
            if(res.data.next!=2.2 && res.data.next!=4.2){
                
                
                removeCookie("progress");
                setCookies("progress", res.data.next);
                
            }
            navigate(`/question/${res.data.next}`)
        } catch (e) {
            console.log(e);
        }
        
           
        
      
    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
       <div className='bg-white p-5 rounded w-70 '>
       <form onSubmit={submitHandler}>
            {params.id!=6 && <h2>Question {params.id}</h2>}
            <div className='mb-3'>
              
                    <p>{question.question_1}</p>
                    <p>{question.question_2}</p>
                    {params.id==5 ? <img src={table} alt="Matrix"  />:<p></p>}<br /> <br/>
            
            
               {(params.id!=2.2 && params.id!=4.2 && params.id!=6) ? <input onChange={handleInput} name="question" className="form-control rounded-0" type='question' placeholder='Your Answer' />:<p></p>}
                {error && <span  className="text-danger">{error}</span>}
            </div>
            <p></p>
            
            {(params.id!=2.2 && params.id!=4.2 && params.id!=6) ? <button type="submit" className='btn btn-success w-100 '><strong>Submit</strong></button>:<p></p>}
            <p></p>
            
            
        </form>
       </div>
    </div>
    
        );
}

export default Question;