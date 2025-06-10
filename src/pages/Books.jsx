/*
 * File: Books.jsx
 * Description: This component renders the Books page of the application.
 *              The Books page displays a list of books available for sale.
 *             The list is fetched from the database and displayed in a grid format.
 *            The user can click on a book to view more details. 
 *            In this Books.jsx file middle section and boxcontainer imported as components.
 *                                                                              
 * States:
 * - products (array): The list of products available for sale.
 * - setProducts (function): A function that updates the products state.
         
 * Methods:
 * - Books(): This function returns the Books page component.
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
import libImage from '../Assets/books.jpg'
import fetchProducts from '../components/ProductList';

function Books() {
    const [products, setProducts] = useState([]); // state variable to store the list of products
      
      useEffect(() => {
    
    // fetch the list of products from the database
        fetchProducts("Books").then(res => {
          setProducts(res.docs);
        }).catch(err => console.log(err));
      }, []);

    return (
        <div>
            <div className="app-container">
                <MiddleSection>
                    <CategoryContainer 
                        image={libImage}
                        category='Books' 
                        description='Textbooks, study guides, and leisure reading'
                    />
                    <div className='grid-container'>
                        {!!products ? products.slice(0, 3).map(product=>{
                            const productData = product.data();
                            console.log("productData=", productData);
                            const imageUrl = productData['imageUrl'];
                            const name = productData['title'];
                            const price = productData['price'];
                            const city = productData['location'];
                            const condition = productData['condition'];
                            const description = productData['description'];
                            
                            
                            console.log(imageUrl, name, price, city);
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

export default Books;