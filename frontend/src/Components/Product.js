import React,{useState} from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShare  } from '@fortawesome/free-solid-svg-icons';
function Product(props) {
  const uemail = useSelector((state) => state.email);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weror,setWerror]=useState(null);
  
  const handleAddToCart = async ({ product, customerEmail }) => {
    setLoading(true);
    setError(null);
    if(customerEmail===null){
      setError("Please Login");
      setLoading(false);
    }else{
    try {
      const response = await axios.post('http://localhost:5000/cart', {
        customer_email: customerEmail,
        image_id: product.id,        // Product ID
        name: product.title,         // Product name
        descr: product.descr,        // Product description
        quantity: 1,                 // Product quantity
        price: product.cost,         // Product price
        image_url: product.imageurl, // Image URL
      });

      // If the product is already in the cart, show an alert
      if (!response.data.success) {
        alert(response.data.message);
      } else {
        // Product successfully added
        alert('Product added to cart successfully!');
        // console.log('Product added to cart:', response.data);
      }
    } catch (err) {
      console.error('Error adding product to cart:', err);
      setError("Failed to add product to cart");
    } finally {
      setLoading(false);
    }
  }
   setTimeout(()=>{
    setError();
   },1000)
  };
  const handleAddTowish = async ({ product, customerEmail }) => {
    setWerror(null);
    if(customerEmail===null){
      setWerror("Please Login");
    }else{
    try {
      const response = await axios.post('http://localhost:5000/wishlist', {
        customer_email: customerEmail,
        image_id: product.id,        // Product ID
        name: product.title,         // Product name
        descr: product.descr,        // Product description
        quantity: 1,                 // Product quantity
        price: product.cost,         // Product price
        image_url: product.imageurl, // Image URL
      });

      // If the product is already in the cart, show an alert
      if (!response.data.success) {
        alert(response.data.message);
      } else {
        // Product successfully added
        alert('Product added to cart successfully!');
        // console.log('Product added to cart:', response.data);
      }
    } catch (err) {
      console.error('Error adding product to cart:', err);
      setWerror("Failed to add product to cart");
    } 
    
  }
   setTimeout(()=>{
    setWerror();
   },1000)
  };
    return ( 
      <div className="pall"style={({width:"30%", margin:"10px"})}>
        <div className="Ppart1">
        <Link to={`/product/${props.Id}`} onClick={props.Nodata} >
              <div className="li">
                  <img src={props.imagurl} alt={props.originalName} style={{ width: "200px", height: "200px" }}/>
                  <p>Name:{props.title}</p>
                  <p>Price:{props.cost}</p>
                </div>
                
          </Link>
          <div className="Ppart12">
            <FontAwesomeIcon onClick={() => handleAddTowish({product: props.pro, customerEmail:uemail})} disabled={loading} icon={faHeart} size="1x" color="red" className="w" />
            {weror && <p style={{ color: 'red' }}>{weror}</p>}
            <FontAwesomeIcon icon={faShare} color="blue" />
          </div>
        </div>
          <div>
              <button onClick={() => handleAddToCart({product: props.pro, customerEmail:uemail})} disabled={loading}>
                {loading ? 'Adding...' : 'Add to Cart'}
              </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
              
          </div>
        </div>
     );
}


export default Product;