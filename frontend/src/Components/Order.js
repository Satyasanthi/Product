import { useSelector } from "react-redux";
import axios from "axios";
import '../Components/Order.css';
import { useEffect, useState } from "react";

function Order() {
    const uemail = useSelector((state) => state.email); 
    const first = useSelector((state) => state.firstName);
    const last = useSelector((state) => state.lastName); 
    const [products, setProducts] = useState([]);
    const [ratings, setRatings] = useState({}); // Store ratings for each product

    useEffect(() => {
        const fetchItems = async () => {
          try {
            if (uemail === null) alert("Please login");
             const response = await axios.get(`http://localhost:5000/order/${uemail}`);
             setProducts(response.data);
            } catch (err) {
               console.error('Error fetching cart items:', err);
               }
            };fetchItems();
        }, [uemail]);

    // Update the rating for a specific product
    const handleRatingClick = async (productId, rating) => {
    setRatings(prevRatings => ({ ...prevRatings, [productId]: rating }));
    try {
       await axios.post(`http://localhost:5000/order/rate`, 
        { uemail, productId,rating });
      } catch (err) {
         console.error('Error saving rating:', err)
         }
      };

 return (
   <div className='cart'>
    <h1 className='carth2'>Welcome to {first} {last} Orders</h1>
    <div>
      {products.map(item => (
         <div key={item.image_id} className='cart-item'>
           <img src={`http://localhost:5000${item.image_url}`} alt={item.name} style={{ width: '200px', height: '200px' }} />
            <div className='cart-details'>
              <strong>{item.name}</strong>
               <p>Price: ${item.price}</p>
               </div>
               <div>
                 <p>Rating:</p>
                 <div className="Oc">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star}
                    onClick={() => handleRatingClick(item.image_id, star)}
                     className={star <= (ratings[item.image_id] || 0) ? 'active' : ''}>
                       ⭐</span>))}
                       </div>
                   </div>
              </div>
            ))}
             </div>
              </div>
       );
}

export default Order;
