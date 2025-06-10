/*
 * File: BoxContainer.jsx
 * Description: This component renders a box container that displays the 
 *              image, name, price, and city of a product as product card. The box container
 *              is used to display products in a grid layout on the home page and each category page.
 *                           
 * States:
 * - imageUrl (string): The URL of the product image.
 * - name (string): The name of the product.
 * - price (number): The price of the product.
 * - city (string): The city where the product is located.
 * - condition (string): The condition of the product.
 * - description (string): The description of the product.
 * - navigate (function): A function that allows the user to navigate to a different page.
 *        
 * Methods:
 * - BoxContainer(props): This function returns the box container component
 *    (image, name, price, city) that is displayed on the home page and each category page.
 * - handleClick(): This function handles the click event on the box container and navigates
 * -                the user to the product info page with the product details. 
        
 * @author 
 * @version 1.0
 * @since 2025-02-25
 */

import React from "react";
import "./BoxContainer.css";
import { useNavigate } from "react-router-dom";

function BoxContainer(props) {
    const { imageUrl, name, price, city, condition, description } = props;
    const navigate = useNavigate();
    
    const handleClick = () => {
        // Navigate to product info page with the product name
        navigate(`/ProductInfo/${name}`, { 
            state: {
              imageUrl,
              name,
              price,
              city,
              condition: condition || "Not specified",
              description: description || ""
          }
            
        });
    };
    
    return (
          // Box container that displays the product image, name, price, and city 

        <div className="box-container" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <img className="box-image" src={imageUrl} alt={name} />
            <div className="productName">
                <h4>{name}</h4>
            </div>
            <div className="productPrice">
                <p>${price}</p>
            </div>
            <div className="city">
                <p>{city}</p>
            </div>

        </div>
    );
}

export default BoxContainer;
