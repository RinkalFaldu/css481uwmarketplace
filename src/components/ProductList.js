/*
 * File: ProductList.js
 * Description: This file contains the logic for fetching and displaying a list of products 
 *              from the Firestore database. The products are displayed on the homepage 
 *              and category-specific pages. Each product includes details such as an image, 
 *              name, price, and city.  
 * 
 * Methods:
 * - fetchProducts(category): Fetches products from the Firestore database. If a category is 
 *   provided, it fetches products belonging to that category. Otherwise, it fetches all products.
 *   this function returns a Firestore query snapshot containing the fetched product data.
 * 
 * Author: Cora Xiao
 * Version: 1.0
 * Since: 2025-02-25
 */

import { db } from "../Firebase-config";
import { collection, getDocs, where, query } from "firebase/firestore";

// Fetches products from the Firestore database
// If a category is provided, it fetches products belonging to that category
// Otherwise, it fetches all products
// Returns a Firestore query snapshot containing the fetched product data

export default async function fetchProducts(category = null) {
    console.log(category);
    let q;
    if (category !== null) {
        q = query(collection(db, "products"), where("imageUrl", "!=", null), where("category", "==", category));
    } else {
        q = query(collection(db, "products"), where("imageUrl", "!=", null));
    }
    
    const querySnapshot = await getDocs(q);

    return querySnapshot;
};
