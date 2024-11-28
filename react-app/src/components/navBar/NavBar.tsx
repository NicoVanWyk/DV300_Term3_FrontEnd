import './NavBar.css';
import { Link, useNavigate } from "react-router-dom";
import { IoGrid } from "react-icons/io5";
import { LuWallet2 } from "react-icons/lu";
import { FaCoins } from "react-icons/fa";

import useAuthService from '../../services/authService';
import { RiAdminLine } from "react-icons/ri";

import logo from '../../assets/logo.png'


const Navbar = () => {
    const navigate = useNavigate();
    const authService = useAuthService();

    const handleLogout = () => {
        authService.logout();
        navigate('/'); // Redirect to login page after logout
    };
    return (
        <div className="nav-bar-container">
            <div className="nav-bar">
                <img src={logo} alt="Logo" className="Logo" />
                <Link to="/dashboard" className="nav-btn">
                    <IoGrid className="nav-btn" />
                </Link>
                <Link to="/wallet" className="nav-btn">
                    <LuWallet2 className="nav-btn" />
                </Link>
                <Link to="/single-coin" className="nav-btn">
                    <FaCoins className="nav-btn" />
                </Link>
                <Link to="/Admin" className="nav-btn">
                    <RiAdminLine className="nav-btn" />
                </Link>
            </div>
            <button onClick={handleLogout} className="logout-button">Log Out</button>
        </div>
    );
};

export default Navbar;
