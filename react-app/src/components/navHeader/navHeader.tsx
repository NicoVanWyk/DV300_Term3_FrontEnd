import { useEffect, useState } from 'react';
import useUserService, { UserData } from '../../services/UserService';
import './navHeader.css';
import { FaSearch, FaBell } from 'react-icons/fa';

function NavHeader() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const userService = useUserService();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await userService.getCurrentUser();
                setUserData(user);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="nav-header">
            <div className="nav-header--heading">
                <div className="nav-header--h1">Welcome Back, {userData?.username}</div>
                <div className="h4">Buy, Transfer and Sell chips all in one place</div>
            </div>
            <div className="nav-header--controls">
                <div className="icon-circle">
                    <FaSearch className="icon" />
                </div>
                <div className="icon-circle">
                    <FaBell className="icon" />
                </div>
                <div className='nav-line'>

                </div>
                <div className="nav-header--profile">
                    <div className="profile-name">{userData?.username}</div>
                </div>
            </div>
        </div>
    )
};

export default NavHeader;
