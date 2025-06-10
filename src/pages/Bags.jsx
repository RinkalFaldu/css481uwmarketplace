/*
 * File: Bags.jsx
 * Description: This component renders the Bags page. The Bags page displays a list of bags
 *              available for sale. The page contains a category container  that displays the category name
 *              and description top of each category page. The page also contains a grid layout of box containers that display the
 *              image, name, price, and city of each bag. The user can click on a box container to view the
 *              product details on the product info page. 
 *             
 *                                                                               
 * States:
 * - products (array): An array of products containing the list of bags products fetched from the database.
 *       
 * Methods:
 * - Bags(): import middle section, box container, category container and fetchProducts
 *           This function returns the Bags page component. 
 * - useEffect(): This function is used to fetch the list of bags products from the Firestore database
 *                and update the state with the fetched products. It runs once when the component is mounted.
 *        
 * @author:Cora Xiao
 * @version 1.0
 * @since 2025-02-25
 */
import React, { useState, useEffect } from 'react';
import MiddleSection from '../components/MiddleSection';
import BoxContainer from '../components/BoxContainer';
import CategoryContainer from '../components/CategoryContainer';
import bagpackImage from '../Assets/bagpack.jpeg';
import fetchProducts from '../components/ProductList';

function Bags() {
    const [products, setProducts] = useState([]); // state variable to store the list of products
      
    // fetch the list of products from the database
      useEffect(() => {
        fetchProducts("Bags").then(res => {
          setProducts(res.docs);
        }).catch(err => console.log(err));
      }, []);

    return (
        <div>
            {/* display middle section and products */}
            <div className="app-container">
                <MiddleSection>
                    <CategoryContainer 
                        image={bagpackImage}
                        category='Bags' 
                        description='Backpacks, laptop bags, and carrying essentials'
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
                                condition={product.condition}
                                description={product.description}
                            />)
                        }) : <BoxContainer /> }
                    </div>

                </MiddleSection>
            </div>
        </div>
    );
}

export default Bags;