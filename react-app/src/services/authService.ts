// authService.ts
export interface SignUpData {
    username: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface OtpValidationData {
    email: string;
    otp: string;
}

export const useAuthService = () => {
    const apiUrl = 'http://localhost:5234/api/AuthControllerOTP';

    const signUp = async (data: SignUpData) => {
        const response = await fetch(`${apiUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Sign up failed');
        }

        return response.json();
    };

    const login = async (data: LoginData) => {
        const response = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        return response.json();
    };

    const validateOtp = async (data: OtpValidationData) => {
        const response = await fetch(`${apiUrl}/validate-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('OTP validation failed');
        }

        return response.json();
    };

    const logout = () => {
        // Remove the token from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    };

    return {
        signUp,
        login,
        validateOtp,
        logout,
    };
};

export default useAuthService;