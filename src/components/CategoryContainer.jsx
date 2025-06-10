/*
 * File: CategoryContainer.jsx
 * Description: This component renders a category container (product category) that displays the name
 *             and description of a category. The container also displays an image
 *             in the background to represent the category.
 *       
 * Methods:
 * - CategoryContainer(props): This function returns the category container component
 *    (top part of product category page such as image, title and small description).
 *       
 * @author:Cora Xiao 
 * @version 1.0
 * @since 2025-02-25
 */

import React from 'react';
import './CategoryContainer.css';

function CategoryContainer(props) {
    return (
      <div className='category-container' style={{backgroundImage:`url(${props.image})`}}>
        <div className='category-text'>
            <h2 className='category-name'>{props.category}</h2>
            <p className='category-description'>{props.description}</p>
        </div>
      </div>
    );
  }
  
  export default CategoryContainer;