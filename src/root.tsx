
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./APP/Home";
import Login from "./APP/Login";
import Register from "./APP/Register";




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
