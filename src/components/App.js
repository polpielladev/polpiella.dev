import React, { useState } from "react";
import { HashRouter, Link } from "react-router-dom";
import BlogPage from "./BlogPage/BlogPage";

const App = () => {
    const [darkMode, setDarkMode] = useState(true);

    return (
        <div className={`app ${darkMode ? "dark-mode" : ""}`}>
            <HashRouter>
                <header>
                    <Link to="/">
                        <p className="home-button">HOME</p>
                    </Link>
                </header>
                <BlogPage />
            </HashRouter>
        </div>
    );
};

export default App;
