/*
 * File: SellItemPage.jsx
 * Description: This component renders the SellItem page of the application.
 *             The SellItem page displays a form that allows users to sell an item.
 *            The form includes fields for the product name, price, location, condition, and description.
 *           The user can submit the form to sell an item. In this SellItemPage.jsx file middle section imported as components.
 *                                                                                     
 * Methods:
 * - SellItemPage(): This function returns the SellItem page component.
     
 * @author: Rinkal Faldu
 * @version 1.0
 * @since 2025-02-25
 */

import React from 'react';
import MiddleSection from '../components/MiddleSection';
import SellItem from '../components/SellItem';

function SellItemPage() {
  return (
      <MiddleSection>
        <SellItem />
      </MiddleSection>
    
  );
}

export default SellItemPage;