/*
 * File: Home.js
 * Description: This component renders the Home page of the application.
 *              The Home page displays a list of products available for sale. 
 *             The list is fetched from the database and displayed in a grid format.
 *              The user can click on a product to view more details.  
 *             In this Home.js file middle section and boxcontainer imported as components.
 *                                                                              
 * States:
 * - products (array): The list of products available for sale.
 * - setProducts (function): A function that updates the products state.
 * - filteredProducts (array): The list of products that match the search query.
 * - setFilteredProducts (function): A function that updates the filteredProducts state.
 * - location (object): The current location object.
 * - navigate (function): A function that navigates to a new location.
         
 * Methods:
 * - Home(): This function returns the Home page component.
 * - useEffect(): This function is used to fetch the list of products from the database and update the products
 * - fetchProducts(): This function fetches the list of products from the database.
 * -
 *      
 * @author:Cora Xiao, Gabrielle Omega
 * @version 1.0
 * @since 2025-02-25
 */

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MiddleSection from '../components/MiddleSection';
import BoxContainer from '../components/BoxContainer';
import fetchProducts from '../components/ProductList';
import { auth } from "../Firebase-config"; 


export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // redirect to sign up page if the user is not logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        // if the user is not authenticated, redirect them to register
        navigate('/register');
      }
    });

    return () => unsubscribe(); // stop listener
  }, [navigate]);

  useEffect(() => {
    fetchProducts().then(res => {
      const fetchedProducts = res.docs.map(doc => doc.data());
      setProducts(fetchedProducts);

      // Check if there's a search query in the URL
      const queryParams = new URLSearchParams(location.search);
      const searchQuery = queryParams.get('search');

      if (searchQuery) {
        const filtered = fetchedProducts.filter(product =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(fetchedProducts);
      }
    }).catch(err => console.log(err));
  }, [location.search]); // Trigger fetch and filter on URL change

  return (
    <div>
      <div className="app-container">
        <MiddleSection>
          <div className='grid-container'>

            {filteredProducts.length > 0 ? (
              filteredProducts.slice(0, 6).map((product, index) => (
                <BoxContainer
                  key={index}
                  imageUrl={product.imageUrl}
                  name={product.title}
                  price={product.price}
                  city={product.location}
                  condition={product.condition}
                  description={product.description}

                />
              ))
            ) : (
              <p>No products found. Try a different search!</p>
            )}
          </div>
          {/* Button to clear the search and reset home page */}
          {location.search && (
            <button onClick={() => navigate('/')}>Clear Search</button>
          )}

        </MiddleSection>
      </div>
    </div>
  );
}
