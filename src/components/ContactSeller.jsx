/*
 * File: ContactSeller.jsx
 * Description: This component renders a contact form that allows users to
 *             contact the seller of a product. The form includes fields for
 *             the user's name, phone number, email, and a message. The user
 *             can submit the form to contact the seller.     
 * Methods:
 * - ContactSeller(): This function returns the contact seller component. 
 *      
 * @author Rinkal Faldu
 * @version 1.0
 * @since 2025-02-25
 */

import React from 'react';
import './ContactSeller.css'; // Create ContactSeller.css

function ContactSeller() {
  return (
    
    <div className="contact-seller-container">
      <h1>Contact Seller</h1>
      <p>To Purchase Items</p>

      {/* Create a form with fields for name, phone number, email, message, and submit buttton */
      /* Add labels and placeholders for each field */}

      <form className="contact-form">  
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Enter your name" />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone No</label>
          <input type="tel" id="phone" name="phone" placeholder="Enter Phone number" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter your email address" />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" placeholder="Enter message"></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ContactSeller;