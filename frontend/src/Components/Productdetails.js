import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Productdetails = () => {
  const { id } = useParams();  // Get the product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product details by ID from the backend
    const fetchProduct=async()=>{
        
        try {
            const response=await axios.get(`http://localhost:5000/product/${id}`);
            setProduct(response.data);
        }catch (error) {
            console.error('Error fetching :', error);
           }
         };
        fetchProduct();});
  console.log(product);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p><strong>Title:</strong>{product.title}</p>
      <img src={`http://localhost:5000${product.imageurl}`} alt={product.name} />
      <p><strong>Description:</strong> {product.descr}</p>
      <p><strong>Product Description:</strong> {product.large_description}</p>
      <p><strong>Price:</strong> ${product.cost}</p>
    </div>
  );
};

export default Productdetails;
