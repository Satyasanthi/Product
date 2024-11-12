import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Login from "./Components/Login";
import Sign from './Components/Sign';
import Navbar from './Components/Navbar';
import Profile from './Components/Profile';
import Addproduct from './Components/Addproduct';
import Cart from './Components/Cart';
import Productdetails from './Components/Productdetails';
import EditProduct from './Components/EditProduct';
import WishlistItem from './Components/wishlist';
import Order from './Components/Order';
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isData,setIsData]=useState(true);
  const [useremail,setUserEmail]=useState("");
  
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  const handleNoData=()=>{
    setIsData(false);
  }
  const handleData=()=>{
    setIsData(true);
  }
  
 
  return (
    <Router>
     <Navbar isLoggedIn={isLoggedIn} userEmail={useremail} isData={isData}  Nodata={handleNoData}  Data={handleData} onLogout={handleLogout} />
      <Routes>
        <Route path="/Login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} changeEmail={setUserEmail} Data={handleData}/>} />
        <Route path="/Sign" element={<Sign/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wish" element={<WishlistItem />} />
        <Route path="/order" element={<Order />} />
        <Route path="/addproduct" element={<Addproduct Nodata={handleNoData}/>}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Productdetails  isData={isData}/>}/>
        <Route path="/edit/:id" element={<EditProduct isData={isData}/>}/>
      </Routes>
    </Router>
  );
};

export default App;
