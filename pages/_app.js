import "../styles/global/typography.scss";
import "../styles/global/code-style.scss";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "../ThemeConfig";
import DarkModeToggle from "react-dark-mode-toggle";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Link from "next/link";

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
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <GlobalStyles />
            <div className="container">
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
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
                                window.localStorage.setItem("dark-mode", value);
                                setDarkMode(value);
                            }}
                            size={60}
                        />
                    </Header>
                    <Component {...pageProps} />
                </div>
            </div>
        </ThemeProvider>
    );
}
