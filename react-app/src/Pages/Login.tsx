import React from "react";
import { useNavigate } from "react-router-dom";
import * as Components from '../Component';
import './Login.css';
import axios from "axios";


const backgroundStyle = {
    backgroundImage: 'url( ../assets/signup back.jpeg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
};

function App() {
    const [signIn, toggle] = React.useState(true);
    const navigate = useNavigate();

    const signInWithDefaultUser = async () => {

    };

    return (
        <div style={backgroundStyle}>
            <Components.Container>
                <Components.SignUpContainer signinIn={signIn}>
                    <Components.Form>
                        <Components.Title className="title">Create Account</Components.Title>
                        <Components.Input type='text' placeholder='221179@virtualwindow.co.za' />
                        <Components.Input type='email' placeholder='221179@virtualwindow.co.za' />
                        <Components.Input type='password' placeholder='Glen1234' />
                        <Components.Button>Sign Up</Components.Button>
                    </Components.Form>
                </Components.SignUpContainer>

                <Components.SignInContainer signinIn={signIn}>
                    <Components.Form>
                        <Components.Title className="title">Sign in</Components.Title>
                        <Components.Input type='email' placeholder='221179@virtualwindow.co.za' />
                        <Components.Input type='password' placeholder='Glen1234' />
                        <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                        <Components.Button onClick={() => signInWithDefaultUser()}>Sign In</Components.Button>
                    </Components.Form>
                </Components.SignInContainer>

                <Components.OverlayContainer className="overlay" signinIn={signIn}>
                    <Components.Overlay signinIn={signIn}>
                        <Components.LeftOverlayPanel signinIn={signIn}>
                            <Components.Title>Welcome Back!</Components.Title>
                            <Components.Paragraph>
                                To keep connected with us please login with your personal info
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(true)}>
                                Sign In
                            </Components.GhostButton>
                        </Components.LeftOverlayPanel>

                        <Components.RightOverlayPanel className="overlay" signinIn={signIn}>
                            <Components.Title>Hello, Friend!</Components.Title>
                            <Components.Paragraph>
                                Enter Your personal details and start journey with us
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>
                                Sign Up
                            </Components.GhostButton>
                        </Components.RightOverlayPanel>
                    </Components.Overlay>
                </Components.OverlayContainer>
            </Components.Container>
        </div>
    )
}

export default App;

// Why does this exist? Log.tsx seems to be used for logging in.