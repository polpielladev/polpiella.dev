import React from 'react';
import styled from 'styled-components';
import img from "../../assets/profile.png";
import ProfilePicture from './ProfilePicture';

const LandingPageContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
`

const LandingPage = () => (
    <LandingPageContainer>
        <ProfilePicture src={img} />
        <h1>Hi! I'm Pol</h1>
        <h1>I am a software engineer focused on building outstanding mobile and web applications. While I finish building my site, feel free to check out my work on Github or drop me a message</h1>
    </LandingPageContainer>
);

export default LandingPage;