import "styles/global/typography.scss";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "styles/global/ThemeConfig";
import DarkModeToggle from "react-dark-mode-toggle";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CodeThemeStyle } from "styles/global/CodeThemeConfig";
import { darkTheme } from "styles/global/Themes/DarkTheme";
import { lightTheme } from "styles/global/Themes/LightTheme";

const Header = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
`;

export default function App({ Component, pageProps }) {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        const initialValue = window.localStorage.getItem("dark-mode");
        setDarkMode(initialValue == null ? true : initialValue == "true");
    }, []);

    return (
        <>
            <Head>
                <meta
                    property="og:image"
                    content="https://blog-og-image-eight.vercel.app/**Pol%20Piella%20Codes**%20-%20Blog.png?theme=dark&md=1&fontSize=100px"
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@polcodes" />
                <meta name="twitter:title" content="Pol Piella Codes - Blog" />
                <meta
                    name="twitter:description"
                    content="A blog where I talk about software development topics in languages like Swift, Javascript and using frameworks such as Next.js, React, Combine and many more!"
                />
                <link rel="icon" href="/favicon.ico" />
                <link
                    rel="alternate"
                    type="application/rss+xml"
                    title="RSS feed of my website's latest posts"
                    href="https://polpiella.codes/rss.xml"
                />
            </Head>
            <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
                <CodeThemeStyle />
                <GlobalStyles />
                <div className="container">
                    <div className="app">
                        <Header>
                            <Link href="/">
                                <a>
                                    <img
                                        className="home-button"
                                        src="/icons/home.svg"
                                        alt="home"
                                    />
                                </a>
                            </Link>
                            <DarkModeToggle
                                checked={darkMode}
                                onChange={(value) => {
                                    window.localStorage.setItem(
                                        "dark-mode",
                                        value
                                    );
                                    setDarkMode(value);
                                }}
                                size={60}
                            />
                        </Header>
                        <Component {...pageProps} />
                    </div>
                </div>
            </ThemeProvider>
        </>
    );
}
