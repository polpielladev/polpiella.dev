import React, { useState } from "react";
import BlogPage from "./BlogPage/BlogPage";

const App = () => {
    const [darkMode, setDarkMode] = useState(true);

    return (
        <div className={`app ${darkMode ? "dark-mode" : ""}`}>
            <BlogPage />
        </div>
    );
};

export default App;