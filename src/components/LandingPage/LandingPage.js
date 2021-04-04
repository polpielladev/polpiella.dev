import React from 'react';
import "./landing-page.scss";
import twitter from "../../assets/icons/twitter.svg";
import instagram from "../../assets/icons/instagram.svg";
import github from "../../assets/icons/github.svg";
import spotify from "../../assets/icons/spotify.svg";

const LandingPage = () => (
    <div className="landing-page">
        <h1 className="large-title">Hi<span>.</span></h1>
        <h1 className="large-title">I am</h1>
        <h1 className="large-title">Pol Piella</h1>
        <div className="social-strip">
            <a href="https://github.com/pol-piella"><img src={github}/></a>
            <a href="https://twitter.com/itspolpiella"><img src={twitter}/></a>
            <a href="https://www.instagram.com/itspolpiella"><img src={instagram}/></a>
            <a href="https://open.spotify.com/artist/5yabymb0oo9eK9cHxECODF"><img src={spotify}/></a>
        </div>
    </div>
);

export default LandingPage;