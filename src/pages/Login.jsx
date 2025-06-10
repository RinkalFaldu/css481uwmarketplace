/**
 * File: Login.jsx
 * Description: This component renders a login form that allows users to
 *              log into their account using email and password credentials.
 *              On successful login, the user is welcomed by an alert.
 *
 * States:
 * - email (string): The email provided by the user for logging in.
 * - password (string): The password provided by the user.
 * - error (string): Holds any error messages encountered during login.
 *
 * Methods:
 * - handleLogin(e): Submits the form data to Firebase auth for sign-in
 *                   and sets any errors that might occur.
 * - Login(): This function returns the Login page component.
 * -
 *
 * @author William Sun, Rinkal Faldu
 * @version 1.0
 * @since 2025-02-25
 */
import {doc, getDoc} from "firebase/firestore";
import { db } from "../Firebase-config";
import React, {useState} from "react";
import { loginUser } from "../firebaseAuth";
import "./Login.css"
import { Link, useNavigate } from "react-router-dom";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async(e) =>{
        e.preventDefault();
        setError("");
        try{
            const user = await loginUser(email, password);
            // Fetch user data from Firestore
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);
            if(userDoc.exists()){
                const username = userDoc.data().name;
                alert(`Login Successful: Welcome back ${username}`);

                // redirect to home page
                navigate('/'); 
            }            
        }catch (err){
            if (err.code === "auth/invalid-credential") {
                setError("Invalid email or password. Please try again.");
            }else{
                setError(err.message);
            }
        }
    };

    return(
        <div className="login-container">
            {/* Left side - Form */}
            <div className="login-form-container">
                <div className="login-form-wrapper">
                    <div className="login-logo">
                        <div className="logo-icon">📚</div>
                        <h2 className="logo-text">UW Student Marketplace</h2>
                    </div>
                    
                    <h1 className="login-title">Welcome Back!</h1>
                    <p className="login-subtitle">Enter your credentials to access your account</p>
                    
                    {error && <p className="error-message">{error}</p>}
                    
                    <form onSubmit={handleLogin}>
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
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="passwprd"
                               placeholder="password"
                               value = {password}
                               onChange={(e) => setPassword(e.target.value)}
                               required
                               className= "form-input"

                            />
                        </div>
                        
                        <button type = "submit" className="submit-button"
                        >Login</button>

                    </form>
                    
                    <p className="register-link-container">
                        Don't have an account? <Link to = "/Register" className="register-link">Sign up</Link>
                    </p>
                </div>
            </div>
            
            {/* Right side - Image (same as registration page) */}
            <div className="login-image-container">
                <div className="image-overlay"></div>
                <div className="image-content-container">
                    <div className="image-content">
                        <h2 className="image-title">UW Student Marketplace</h2>
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

export default Login;