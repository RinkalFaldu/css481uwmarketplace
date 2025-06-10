/**
 * File: Register.js
 * Description: A React functional component that renders a registration
 *              form allowing users to create an account. Includes field
 *              validation and calls the Firebase register function.
 *
 * States:
 * - email:     Stores the email input (string).
 * - password:  Stores the password input (string).
 * - username:  Stores the username input (string).
 * - message:   Displays general feedback messages (string).
 * - error:     Displays error messages, particularly during registration (string).
 *
 * Methods:
 * - handleRegister(e): Validates user inputs, calls the Firebase `registerUsers`
 *                      function, and handles success or error conditions.
 * - Register(): Returns the Register page component.
 *
 * @author  William Sun, Rinkal Faldu
 * @version 1.0
 * @since   2025-02-25
 */

import React, { useState } from 'react';
import { registerUsers } from "../firebaseAuth";
import "./Register.css";
import { Link } from 'react-router-dom';

function Register() {
  // Original form data state
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async(e) =>{
        
        e.preventDefault();
        
        setError("");
        if(!email|!password|!username){
            setMessage("Please fill in all fields");
            return;
        }
        try{
        const user = await registerUsers(email, password,username);
            alert(`Register Successful: Welcome ${username}`);
            return user;
        }catch (err){
            setError(err.message);
        }
        
    };

  
  return (
    <div className="register-container">
      {/* Left side - Form */}
      <div className="register-form-container">
        <div className="register-form-wrapper">
          <div className="register-logo">
            <div className="logo-icon">📚</div>
            <h2 className="logo-text">UW Student Marketplace</h2>
          </div>
          
          <h1 className="register-title">Get Started Now</h1>
          <p className="register-subtitle">Join our community of students buying and selling campus essentials.</p>

          {error && <p className = "error-message">{error}</p>}
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                    type="text"
                    placeholder="Username"
                    value = {username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className= "form-input"
                />
                </div>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                    type="email"
                    placeholder="email "
                    value = {email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className= "form-input"

                />

            </div>
            
            <div className="form-group">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input
                type="tel"
                placeholder="(123) 456-7890"
                className= "form-input"

              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="password-input-container">
              <input type="passwprd"
                    placeholder="password"
                    value = {password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className= "form-input"

                />
                <button type = "submit" class="submit-button">Sign up</button>


                </div>
            </div>
            
            
         </form>
          
          <p className="login-link-container">
            Have an account? <Link to="/Login" className="login-link">Sign in</Link>
          </p>
        </div>
      </div>
      
      {/* Right side - Image */}
      <div className="register-image-container">
        <div className="image-overlay"></div>
        <div className="image-content-container">
          <div className="image-content">
            <h2 className="image-title"> UW Student Marketplace</h2>
            <div className="image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Student marketplace items" 
                className="hero-image"
              />
              <div className="image-icon-container">
                <div className="image-icon">📚</div>
              </div>
            </div>
            <p className="image-description">Buy, sell, and trade textbooks, dorm essentials, and more!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;