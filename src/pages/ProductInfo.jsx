/*
 * File: ProductInfor.jsx
 * Description: This component renders the ProductInfo page of the application.
 *          The ProductInfo page displays the details of a product available for sale.
 *          The product details include the product image, name, price, location, condition, and description.
 *          The user can click on the contact seller button to contact the seller.This page visible when user click on product.
 *          In this ProductInfo.jsx file middle section imported as components.
 *                                                                              
 * States:
 * - imageUrl (string): The URL of the product image.
 * - name (string): The name of the product.
 * - price (number): The price of the product.
 * - city (string): The location of the product.
 * - condition (string): The condition of the product.
 * - description (string): The description of the product.
 * - navigate (function): A function that navigates to a different page.
 * - location (object): The location object that contains the state of the page.
 * 
         
 * Methods:
 * - ProductInfo(): This function returns the ProductInfo page component.
 * - useEffect(): This function is used to fetch the list of products from the database and update the products
 * - fetchProducts(): This function fetches the list of products from the database.
 *      
 * @author: Cora Xiao 
 * @version 1.0
 * @since 2025-02-25
 */

import React from 'react';
import MiddleSection from '../components/MiddleSection';
import './ProductInfo.css';
import { useNavigate, useLocation } from 'react-router-dom';

function ProductInfo() {
    const navigate = useNavigate();
    const location = useLocation();
    const { imageUrl, name, price, city, condition, description } = location.state || {};
    
    console.log("ProductInfo state=", location.state);
    
    return (
        <div>
          <div className="app-container">
            <MiddleSection>
                <div className='productInfo-container'>

                    <div className="productImage-container">
                        <img className="product-image" src={imageUrl} alt={name} />
                    </div>

                    <div className="detail-container">
                        <h2 className="detail-container" id="productName">{name}</h2>
                        <p className="detail-container" id="price">${price}</p>
                        <p className="detail-container" id="location">Location - {city}</p>
                        <p className="detail-container" id="condition">Condition - {condition}</p>
                    </div>

                    <div className="description-container">
                        <h2>Description</h2>
                        <p>{description}</p>
                    </div>
                    
                    <button 
                        type="submit" 
                        className="contactSellerButton" 
                        onClick={() => navigate('/ContactSellerPage')}
                    >Contact Seller</button>
                </div>
            </MiddleSection>
          </div>
        </div>
      );
}

export default ProductInfo;
