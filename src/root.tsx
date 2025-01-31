
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./APP/Home.tsx";




export default function Root() {


     return (
         <Router>
              <Routes>
                   <Route path="/" element={<Home/>} />

              </Routes>
         </Router>
     )
}
