
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./APP/Home.tsx";
import Login from "./APP/Login.tsx";
import Register from "./APP/Register.tsx";




export default function Root() {


     return (
         <Router>
              <Routes>
                   <Route path="/" element={<Home/>} />
                  <Route path="/Login" element={<Login/>} />
                  <Route path={"/Register"} element={<Register/>}/>


              </Routes>
         </Router>
     )
}
