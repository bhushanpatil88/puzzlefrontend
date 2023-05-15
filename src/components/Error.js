

export const Error = (props) =>{
  
    return (
        

     <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
       <div className='bg-white p-3 rounded w-25'>
            <p><strong>Page Not Found</strong></p>
            <p>Reasons : </p>
            <ul>
                <li>Access Denied</li>
                <li>You might have entered Wrong URL</li>
            </ul>
     
       </div>
    </div>
        
    );
}

export default Error;