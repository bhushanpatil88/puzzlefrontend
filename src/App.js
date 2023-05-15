
import './App.css';
import {BrowserRouter,Routes,Route} from  'react-router-dom';

import { ProtectRoutes } from './auth/protectRoutes';
import Login  from './components/Login';
import  Register  from './components/Register';
import Question from './components/Question'
import Error from './components/Error';
import Admin from './components/Admin';



function App() {

  
  return (
     
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path='/admin' element={<Admin />}></Route>
            <Route element={ <ProtectRoutes /> }>
              <Route path='/question/:id' element={ <Question/> } />
            </Route>
            <Route path="*" element={<Error/>}></Route>
          </Routes>
      </BrowserRouter> 
      
    
  );
}


export default App;
