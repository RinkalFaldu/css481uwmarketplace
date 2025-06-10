/*
 * File: UserProfilePage.jsx
 * Description: This component renders the UserProfile page of the application.
 *              The UserProfile page displays the user profile details.
 *             The user profile details include the user's name, email, phone number, and location.
 *             The user can update their profile details.
 *             In this UserProfilePage.jsx file middle section imported as components
 *                                                                                     
 * Methods:
 * - UserProfilePage(): This function returns the UserProfile page component.
 *      
 * @author:Cora Xiao
 * @version 1.0
 * @since 2025-02-25
 */

import MiddleSection from '../components/MiddleSection';
import UserProfile from '../components/UserProfile';
function UserProfilePage() {
    return(
        <div>
            <div className='app-container'>
                <MiddleSection>
                    <UserProfile />
                </MiddleSection>
            </div>
        </div>
    )
}
export default UserProfilePage;