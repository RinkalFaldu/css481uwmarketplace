/*
 * File: ContactSellerPage.jsx
 * Description: This component renders the contact seller page. The page includes the contact seller form
 *              that allows users to contact the seller of a product. The form includes fields for the user's
 *              name, phone number, email, and a message. The user can submit the form to contact the seller.
 *             ContactSellerPage.jsx imports contactSeller form , and middleSection as components and creates 
 *             contact seller page.
 *         
 * Methods:
 * - ContactSellerPage(): This function returns the contact seller page component.
 * - ContactSeller(): This function returns the contact seller form component.
 * - MiddleSection(): This function returns the middle section component.
 *       
 * @author Rinkal Faldu
 * @version 1.0
 * @since 2025-02-25
 */

import React from 'react';
import MiddleSection from '../components/MiddleSection';
import ContactSeller from '../components/ContactSeller';

//it imports middle section and contactseller component and create contact seller page 
function ContactSellerPage() {
  return (
    <div>
      <div className="app-container">
        <MiddleSection>
          <ContactSeller />
        </MiddleSection>
      </div>
    </div>
  );
}

export default ContactSellerPage;