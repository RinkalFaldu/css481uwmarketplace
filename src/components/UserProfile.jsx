/**
 * Class: UserProfile
 * Description: A React component that allows the user to upload their profile picture.
 *              The picture is stored in Firebase Storage and the download URL returned is
 *              used to update the user's profile (Firebase Auth).
 *
 * Properties:
 *   - displayName (string): The display name of the user, either from Firestore data or their email.
 *   - userEmail (string): The user's email address.
 *   - createDate (string): The date/time when the user's account was created.
 *   - profilePic (File): The file object selected by the user to update their profile picture.
 *   - uploading (boolean): Indicates whether the profile picture is currently being uploaded.
 *   - previewURL (string): A temporary URL generated from the selected file for preview purposes.
 *
 * Methods:
 *   - useEffect(() => {}): Listens for authentication state changes and loads user data from Firestore.
 *   - handleFileChange(event): Captures the file selected by the user, sets profilePic, and generates a preview URL.
 *       Parameters:
 *         event (SyntheticEvent): The change event from the file input.
 *   - handleProfilePic(event): Uploads the selected profile picture to Firebase Storage and updates the user's
 *                              Firebase Auth profile with the new photoURL.
 *       Parameters:
 *         event (SyntheticEvent): The form submission event.
 *
 * Usage:
 *   This component displays the user's current profile picture (or a preview of a newly selected image),
 *   allows the user to choose a new image via a hidden file input triggered by a button, and uploads the
 *   new image to Firebase Storage. Upon a successful upload, the component updates the user's profile with
 *   the new image URL.
 *
 * @author: William Sun
 * @version: 1.0.0
 * @since: 3-4-2025
 */

 


import React, { useState,useEffect } from "react";
import { getAuth,onAuthStateChanged, updateProfile } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "../Firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { use } from "react";
import './UserProfile.css';

function UserProfile(){
    const [displayName, setDisplayName] = useState("Guest");
    const [userEmail, setUserEmail] = useState("");
    const [createDate, setCreateDate] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [previewURL, setPreviewURL] = useState(null);
    useEffect(() => {
        const auth = getAuth();
        const userSignInState = onAuthStateChanged(auth, async(user)=>{
        if(user){
            const docRef = doc(db, 'users', user.uid)
            const userDoc = await getDoc (docRef);
            if(userDoc.exists()){
            const data = userDoc.data();
            setDisplayName(data.name||user.email);
            setUserEmail(user.email);
            setCreateDate(user.metadata.creationTime);
            }else{
            setDisplayName('Guest');
            }
        }
        });
        return userSignInState;
    },[]);

const handleFileChange = async(e)=>{
    if(e.target.files && e.target.files[0]){
        const file = e.target.files[0];
        setProfilePic(file);
        const url = URL.createObjectURL(file);
        setPreviewURL(url);
        
    }
    
}

const handleProfilePic = async(event)=>{
    event.preventDefault();

    // form validation
    if (!profilePic) {
        alert("Please upload a product image");
        return;
    }

    setUploading(true);
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user);

    if (!user) {
        alert("No user is logged in.");
        setUploading(false);
        return;
    }

    const fileRef = ref(
        storage,`profilePictures/${user.uid}/${Date.now()}-${profilePic.name}`
    );

    try{
        const uploadTask = uploadBytesResumable(fileRef,profilePic);
        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                const progress = (snapshot.bytesTransferred/ snapshot.totalBytes) *100;
                console.log(`upload is ${progress}% done`);
            },
            (error) => {
                console.error("Uploade error", error);
                alert("Error uploading profile picture");
                setUploading(false);
            },
            async() =>{
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                console.log("Download URL: ", downloadURL);

                await updateProfile(user,{photoURL: downloadURL});
                alert("User profile updated successfully");
                setPreviewURL(downloadURL);
                setUploading(false);
                setProfilePic(null);
            }
            
        );
    }catch(error){
        console.error("Error during upload:", error);
        alert("Upload failed: " + error.message);
        setUploading(false);        
    }
    
};



    return(
        <div className="user-profile-container">
            {/**Left side, Avatar + Name */}
            <div className="profile-left">
                <img src={previewURL || getAuth().currentUser?.photoURL} className="profile-pic" alt="profile"/>
                <h1 className="profile-name">{displayName}</h1>
                <form onSubmit={handleProfilePic}>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    />
                    <button type="submit" disabled={uploading}>
                    {uploading ? "Uploading..." : "Update Profile Picture"}
                    </button>
                </form>
            </div>
            <div className="profile-right">
                <div className="contact-info">
                    <span>Member since: {createDate}</span>
                    <div className="contact-info">
                        <h2>Contact Information:</h2>
                        <span>Email: {userEmail}</span>
                    </div>
                    
                </div>
                
            </div>
            
        </div>
    );
}
export default UserProfile;