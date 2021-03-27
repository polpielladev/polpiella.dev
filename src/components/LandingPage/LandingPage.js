import React from 'react';
import img from "../../assets/profile.png";
import "./landing-page.css";

const LandingPage = () => (
    <div className="landing-page">
        <img className="profile-image" src={img} />
        <h1>Hi! I'm Pol</h1>
        <h1>I am a software engineer focused on building outstanding mobile and web applications. While I finish building my site, feel free to check out my work on Github or drop me a message</h1>
    </div>
);

export default LandingPage;