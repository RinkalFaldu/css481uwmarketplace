/*
 * File: Stationery.jsx
 * Description: This component renders the Stationery page of the application.
 *              The Stationery page displays a list of stationery items available for sale. 
 *              The list is fetched from the database and displayed in a grid format.
 *             The user can click on a product to view more details.           
 *              In this Stationery.jsx file middle section and boxcontainer imported as components.
 *                                                                              
 * States:
 * - products (array): The list of products available for sale.
 * - setProducts (function): A function that updates the products
         
 * Methods:
 * - Stationery(): This function returns the Stationery page component.
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
import stationeryImage from '../Assets/stationery.webp';
import fetchProducts from '../components/ProductList';

function Stationery() {
    const [products, setProducts] = useState([]);
                  
    useEffect(() => {
    fetchProducts("Stationery").then(res => {
        setProducts(res.docs);
    }).catch(err => console.log(err));
    }, []);

    return (
        <div>
            <div className="app-container">
                <MiddleSection>
                    <CategoryContainer 
                        image={stationeryImage}
                        category='Stationery' 
                        description='Notebooks, pens, and all your writing essentials'
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

export default Stationery;