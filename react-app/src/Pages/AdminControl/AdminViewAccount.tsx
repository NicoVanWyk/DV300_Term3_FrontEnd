import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSearch, FaBell } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';
import useAdminService from '../../services/AdminService';
import './AdminViewAccount.css';
import Navbar from '../../components/navBar/NavBar';

const AdminViewAccount = () => {
    const location = useLocation(); // Get the current location
    const navigate = useNavigate(); // For navigation
    const { selectedUser } = location.state || {}; // Grab the selected user from the location state
    const adminService = useAdminService(); // Hook to use admin service
    const [isFrozen, setIsFrozen] = useState(false); // State to track if the account is frozen

    const handleBack = () => {
        navigate('/admin'); // Go back to the admin page
    };

    const handleFreezeAccount = async () => {
        try {
            await adminService.freezeAccount(selectedUser.userId); // Freeze the account
            console.log(selectedUser.userId)
            setIsFrozen(true); // Update state to reflect the account is frozen
            alert('Account successfully frozen.'); // Let the user know it worked
        } catch (error) {
            console.log(selectedUser.userId)
            console.error('Error freezing account:', error); // Log any errors
            alert('Failed to freeze the account. Please try again.'); // Tell the user something went wrong
        }
    };

    const handleUnfreezeAccount = async () => {
        try {
            await adminService.unfreezeAccount(selectedUser.userId.toString()); // Unfreeze the account
            setIsFrozen(false); // Update state to reflect the account is active
            alert('Account successfully unfrozen.'); // Let the user know it worked
        } catch (error) {
            console.error('Error unfreezing account:', error); // Log any errors
            alert('Failed to unfreeze the account. Please try again.'); // Tell the user something went wrong
        }
    };

    return (
        <div className="body-main">
            <div className="nav-header">
                <button className="back-button" onClick={handleBack}>
                    <IoArrowBack className="back-icon" /> {/* Back button */}
                </button>
                <div className="nav-header--heading">
                    <div className="nav-header--h1">{selectedUser ? selectedUser.username : 'Account Holder'}</div>
                    <div className="h4">Account Holder Info</div>
                </div>
                <div className="nav-header--controls">
                    <div className="icon-circle">
                        <FaSearch className="icon" /> {/* Search icon */}
                    </div>
                    <div className="icon-circle">
                        <FaBell className="icon" /> {/* Notification icon */}
                    </div>
                </div>
            </div>
            <div className="body-container">
                <div className="account-info-container">
                    <h1>Account Holder Info</h1>
                    {selectedUser ? (
                        <div>
                            <p>Username: {selectedUser.username}</p>
                            <p>Email: {selectedUser.email}</p>
                            <p>Admin: {selectedUser.isAdmin ? 'Yes' : 'No'}</p>
                            <p>Status: {isFrozen ? 'Account is Frozen' : 'Account is Active'}</p>
                            {isFrozen && <p style={{ color: 'red' }}>This account is frozen and cannot log in.</p>}
                            <button onClick={isFrozen ? handleUnfreezeAccount : handleFreezeAccount}>
                                {isFrozen ? 'Unfreeze Account' : 'Freeze Account'} {/* Toggle button text */}
                            </button>
                        </div>
                    ) : (
                        <p>No user selected.</p> // Message if no user is selected
                    )}
                </div>
            </div>
            <Navbar></Navbar>
        </div>
    );
};

export default AdminViewAccount; // Export the component
// Note: Why did you call this a component? It is a page, I almost moved it to the components folder