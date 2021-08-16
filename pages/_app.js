import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "styles/global/ThemeConfig";
import styled from "styled-components";
import Link from "next/link";
import { CodeThemeStyle } from "styles/global/CodeThemeConfig";
import { darkTheme } from "styles/global/Themes/DarkTheme";
import Image from "next/image";
import SocialStrip from "components/SocialStrip";

const Header = styled.header`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
`;

const Footer = styled.footer`
    margin: 3.5rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    a {
        color: lightgray;
        cursor: pointer;
        text-decoration: underline;
    }
`;

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <link
                    rel="alternate"
                    type="application/rss+xml"
                    title="RSS feed of my website's latest posts"
                    href="https://polpiella.dev/rss.xml"
                />
            </Head>
            <ThemeProvider theme={darkTheme}>
                <CodeThemeStyle />
                <GlobalStyles />
                <div className="container">
                    <div className="app">
                        <Header className="app-header">
                            <Link href="/">
                                <a className="home-button">
                                    <Image
                                        width={30}
                                        height={30}
                                        src="/icons/home.svg"
                                        alt="home"
                                    />
                                </a>
                            </Link>
                        </Header>
                        <Component {...pageProps} />
                        <Footer>
                            <SocialStrip />
                        </Footer>
                    </div>
                </div>
            </ThemeProvider>
        </>
    );
}
