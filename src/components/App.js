import React, { useState } from "react";
import { HashRouter } from "react-router-dom";
import BlogPage from "./BlogPage/BlogPage";

const App = () => {
    const [darkMode, setDarkMode] = useState(true);

    return (
        <div className={`app ${darkMode ? "dark-mode" : ""}`}>
            <HashRouter>
                <BlogPage />
            </HashRouter>
        </div>
    );
};

export default App;
