import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthService from '../src/services/authService';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import Transactions from './Pages/Transactions/Transactions'; // Ensure the path is correct
import SingleCoin from './Pages/SingleCoin/SingleCoin';
import SignUp from './Pages/SignUp';
import Log from './Pages/Log';
import AdminControl from './Pages/AdminControl/Admin';
import AdminViewAccount from './Pages/AdminControl/AdminViewAccount';

function App() {

    // const isAuthenticated = localStorage.getItem('user'); // Check for authentication

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Log />} />
                <Route path="/signup" element={<SignUp />} />
                {/* <Route
                    path="/dashboard"
                    element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
                /> */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/wallet" element={<Transactions />} />
                <Route path="/single-coin" element={<SingleCoin />} />
                <Route path="/admin" element={<AdminControl />} />
                <Route path="/admin/view-account" element={<AdminViewAccount />} />
                

                {/* <Route path="*" element={<Navigate to="/login" />} /> */}
            </Routes>
        </Router>
    );
}

// const handleLogout = () => {
//     AuthService.logout();

// };

export default App;