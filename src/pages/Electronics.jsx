/*
 * File: Electronics.jsx
 * Description: This component renders the Electronics page of the application.
 *              The Electronics page displays a list of electronics available for sale. 
 *              The list is fetched from the database and displayed in a grid format.
 *             The user can click on an electronic product to view more details.           
 *              In this Electronics.jsx file middle section and boxcontainer imported as components.
 *                                                                              
 * States:
 * - products (array): The list of products available for sale.
 * - setProducts (function): A function that updates the products state.
         
 * Methods:
 * - Electronics(): This function returns the Electronics page component.
 * - useEffect(): This function is used to fetch the list of products from the database and update the products
 * - fetchProducts(): This function fetches the list of products from the database.
 *      
 * @author:Cora Xiao
 * @version 1.0
 * @since 2025-02-25
 */

import React, { useState, useEffect } from 'react';
import MiddleSection from '../components/MiddleSection';
import BoxContainer from '../components/BoxContainer';
import CategoryContainer from '../components/CategoryContainer';
import electronicsImage from '../Assets/Electronic.webp';
import fetchProducts from '../components/ProductList';

function Electronics() {
    const [products, setProducts] = useState([]);
          
    useEffect(() => {
    fetchProducts("Electronics").then(res => {
        setProducts(res.docs);
    }).catch(err => console.log(err));
    }, []);
    
    return (
        <div>
            <div className="app-container">
                <MiddleSection>
                    <CategoryContainer 
                        image={electronicsImage}
                        category='Electronics' 
                        description='Find the latest gadgets and tech accessories'
                    />
                    <div className='grid-container'>

                        {!!products ? products.slice(0, 3).map(product=>{
                            const productData = product.data();
                            const imageUrl = productData['imageUrl'];
                            const name = productData['title'];
                            const price = productData['price'];
                            const city = productData['location'];
                            const condition = productData['condition'];
                            const description = productData['description'];
                            
                            return (<BoxContainer 
                                imageUrl={imageUrl}
                                name={name}
                                price={price}
                                city={city}
                                condition={condition}
                                description={description}
                                
                            />)
                        }) : <BoxContainer /> }
                    </div>

                </MiddleSection>
            </div>
        </div>
    );
}

export default Electronics;