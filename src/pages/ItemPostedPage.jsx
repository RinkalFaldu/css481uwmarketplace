/*
 * File: ItemPostedPage.jsx
 * Description: This component renders the Item Posted page of the application.
 *               The Item Posted page displays a message that the item has been posted successfully.
 *             The user can click on the home button to navigate to the home page.
 *              In this ItemPostedPage.jsx file middle section imported as components. 
 *             This page is displayed when user post the item for sale successfully.            
 *                                                                                       
 * Methods:
 * - ItemPostedPage(): This function returns the Item Posted page component.
 *      
 * @author 
 * @version 1.0
 * @since 2025-02-25
 */

import React from "react";
import { Link } from "react-router-dom";
import './ItemPostedPage.css';
import MiddleSection from "../components/MiddleSection";
function ItemPostedPage() {
    return (
        <div>
            <div className="app-container">
                <MiddleSection>
                    <div className="successful-image">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/768px-Eo_circle_green_checkmark.svg.png?20200417132424" className="checkmark" />
                        <h1 className="Posted-message">Item Posted!</h1>
                        <Link to= "/Home"></Link>
                    </div>
                </MiddleSection>
            </div>
        </div>
    );
}
export default ItemPostedPage;