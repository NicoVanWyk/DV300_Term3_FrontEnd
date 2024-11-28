import React, { useState } from 'react';
import { useAuthService } from '../services/authService';
import { useNavigate } from "react-router-dom";
import * as Components from '../Component';
import backgroundImage from '../assets/background.png';

const Signup = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
    const [otp, setOtp] = useState<string>('');
    const authService = useAuthService();
    const navigate = useNavigate();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await authService.signUp({ username, email, password });
            console.log('Sign up successful:', response);
            setIsOtpSent(true);
        } catch (err) {
            setError('Sign up failed. Please try again.');
        }
    };

    const handleOtpValidation = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await authService.validateOtp({ otp, email }); 
            console.log('OTP validation successful:', response);
            navigate('/login');
        } catch (err) {
            setError('OTP validation failed. Please try again.');
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
                }}>Sign Up</h2>
                {error && <p style={{
                    color: 'red',
                    textAlign: 'center',
                    marginTop: '10px',
                }}>{error}</p>}
                {!isOtpSent ? (
                    <Components.Form onSubmit={handleSignUp}>
                        <Components.Input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
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
                        <Components.Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
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
                        <Components.Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
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
                        <Components.Button type="submit" className="button"  style={{
                            width: '100%',
                            marginTop: '25px',
                            marginBottom: '25px'
                        }}>Sign Up</Components.Button>
                    </Components.Form>
                ) : (
                    <Components.Form onSubmit={handleOtpValidation}>
                        <Components.Input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="OTP"
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
                        <Components.Button type="submit" className="button">Validate OTP</Components.Button>
                    </Components.Form>
                )}
                <p  style={{
                            color: 'black',
                            cursor: 'pointer'
                        }}>Already have an account? <Components.Anchor onClick={() => navigate('/')}  style={{
                            color: 'purple'
                        }}>Sign In</Components.Anchor></p>
            </div>
        </div>
    );
};

export default Signup;