/*
 * File: MiddleSection.jsx
 * Description: This component renders the middle section of the page. The middle section
 *              is used to display the main content of the page. It takes in children components
 *             to render the content. This component is used to wrap the main content of the page.
 *                                 
 * Methods:
 * - MiddleSection(): This function returns the middle section component.
       
 * @author Rinkal Faldu
 * @version 1.0
 * @since 2025-02-25
 */


import React from 'react';
import './MiddleSection.css'; // Create MiddleSection.css

function MiddleSection({ children }) {
  return (
    <div className="middle-section">
      {children}
    </div>
  );
}

export default MiddleSection;