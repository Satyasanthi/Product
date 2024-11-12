import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUserCircle,faShoppingCart, faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { faHeart  } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import axios from 'axios';
import Product from './Product';
import { useSelector } from 'react-redux';
const Navbar = ({ isLoggedIn,userEmail,isData,Nodata,Data, onLogout}) => {
  const photo = useSelector((state) => state.imageUrl);
  console.log(photo);
  const [SelectedCategory,setSelectedCategory]=useState("all");
  const filterP=(category)=>{
    setSelectedCategory(category);
  };
  const [allproducts, setAllproducts] = useState([]);
  useEffect(() => {
    const fetchP = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/images`);
        setAllproducts(response.data);
       } catch (error) {
        console.error('Error fetching :', error);
       }
     };
    fetchP();});
  return (
    <div className='hall'>
            <div className="hfirst">
                <Link to="/"><button className='hb' onClick={Data}>About</button></Link>
                  <select 
                    className='hs' 
                    value={SelectedCategory} 
                    onChange={(e) => filterP(e.target.value)} // this triggers the filterP function
                  >
                    <option value="all">All</option>
                    <option value="sweets">Sweets</option>
                    <option value="designs">Designs</option>
                    <option value="hot">Hot Snacks</option>
                    <option value="flower">Flowers</option>
                    <option value="cakes">Cakes</option>
                    <option value="veg">Vegetables</option>
                  </select>

                  <input 
                    type="text" 
                    placeholder="Search" 
                    className='hi' value={SelectedCategory} 
                    onChange={(e) => filterP(e.target.value)}
                    
                  />

                <h3 className='hh3'>Home Made Goods</h3>
                {isLoggedIn?(
                <Link to="/addproduct"><button className='hsold' onClick={Nodata}>Sell product</button></Link>
                ):(
                  <button className='hsold'>Sell product</button>
                )
              }
              {isLoggedIn?(
                <Link to="/cart"><FontAwesomeIcon icon={faShoppingCart} color="black" size="2x" className='hc' onClick={Nodata}/></Link>
              ):(<FontAwesomeIcon icon={faShoppingCart} size="2x" color="black" className='hc'/>)
              }
                {isLoggedIn ? (
                  <div className='npart2'>
                    <Link to="/profile">{({photo}!==undefined)?(<img src={`http://localhost:5000${photo}`} className='hp' onClick={Nodata}/>):(<FontAwesomeIcon icon={faUserCircle} size="2x" className='hp' onClick={Nodata}/>)}</Link>
                    <Link to="/wish"> <FontAwesomeIcon icon={faHeart} color="red" size="2x" className='hw' onClick={Nodata} /></Link>
                    <Link to="/order"><FontAwesomeIcon icon={faBagShopping} color="darkgreen" size="2x" className='ho' onClick={Nodata}/></Link>
                    <Link to="/"style={{color:"white"}} onClick={Data}><button onClick={onLogout} className='nlogout'>Logout</button></Link>
                  </div>
                    ) : (
                  <div>
                    <Link to="/Login" style={{color:"white"}}><button className='nlogin' onClick={Nodata}>Login</button></Link>
                    <Link to="/Sign" style={{color:"white"}}><button className='nsign' onClick={Nodata}>Sign Up</button></Link>
                  </div>
                    )}
    
            </div>
            <div>
              {isData ?
               ( <div>
                   <section className="allButtons">  
                      <button onClick={()=>filterP("all")} className='nbb'>All</button>        
                      <button onClick={()=>filterP("sweets")} className='nbb'>Sweets</button> 
                        <button onClick={()=>filterP("designs")} className='nbb'>Desgins</button>         
                        <button onClick={()=>filterP("hot")} className='nbb'>Hot</button>         
                        <button onClick={()=>filterP("flower")} className='nbb'>Flower</button>
                        <button onClick={()=>filterP("cakes")} className='nbb'>Cakes</button>         
                        <button onClick={()=>filterP("veg")} className='nbb'>Vegtables</button>  
                      </section>
                     
                      <div className="nproduct">
                          {allproducts.map((product)=> (SelectedCategory==="all"|| 
                          SelectedCategory===product.category)&&(
                            <Product
                              key={product.id}
                              Id={product.id}
                              imagurl={`http://localhost:5000${product.imageurl}`}
                              title={product.title}
                              cost={product.cost}
                              descr={product.descr}
                              ldescr={product.large_description}
                              originalName={product.title}
                              pro={product}
                              Nodata={Nodata}
                            />
                          )
                          )}
         
                      </div>
              </div>):
              (<div></div>)}
            </div>
        </div>  
  );
};

export default Navbar;
