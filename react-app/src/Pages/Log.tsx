import React, { useState } from 'react';
import { useAuthService } from '../services/authService';
import { useNavigate } from "react-router-dom";
import * as Components from '../Component';
import { Button } from '../Component';
import backgroundImage from '../assets/background.png';

const Log = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const authService = useAuthService();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await authService.login({ email, password });
            console.log('Login successful:', response);
            localStorage.setItem('token', response.token);
            localStorage.setItem('userId', response.userId);
            navigate('/Dashboard');
        } catch (err) {
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={{
                maxWidth: '400px',
                padding: '40px',
                background: 'white',
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <h2 style={{
                    fontSize: '24px',
                    marginBottom: '20px',
                    textAlign: 'center',
                    color: '#333',
                }}>Login</h2>
                {error && <p style={{
                    color: 'red',
                    textAlign: 'center',
                    marginTop: '10px',
                }}>{error}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="221179@virtualwindow.co.za"
                        required
                        style={{
                            width: '100%',
                            padding: '12px',
                            margin: '10px 0',
                            border: '1px solid grey',
                            borderRadius: '5px',
                            backgroundColor: '#fff',
                        }}
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Glen1234"
                        required
                        style={{
                            width: '100%',
                            padding: '12px',
                            margin: '10px 0',
                            border: '1px solid grey',
                            borderRadius: '5px',
                            backgroundColor: '#fff',
                        }}
                    />
                    <a href="#">Forgot your password?</a>
                    <Button type="submit" className="button"  style={{
                            width: '100%',
                            marginTop: '25px',
                            marginBottom: '25px'
                        }}>Login</Button>
                    <p  style={{
                            color: 'black',
                            cursor: 'pointer'
                        }}>Don't have an account? <a  style={{
                            color: 'purple'
                        }} onClick={() => navigate('/signup')} >Sign Up</a></p>
                </form>
            </div>
        </div>
    );
};

export default Log;