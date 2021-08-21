import "styles/global/typography.scss";
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

    a {
        height: 60px;
        transition: transform ease 0.3s;
    }

    a:hover {
        transform: scale(1.1);
    }
`;

const Footer = styled.footer`
    margin: 3.5rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: darkgray 1px solid;
    padding-top: 30px;

    *:not(:last-child) {
        margin-right: 30px;
    }

    a {
        cursor: pointer;
        text-decoration: underline;
        transition: transform ease 0.3s;
    }

    a:hover {
        transform: scale(1.1);
    }
`;

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="icon" type="image/svg+xml" href="/assets/logo.svg" />
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
                        <Header>
                            <Link href="/">
                                <a>
                                    <Image
                                        width={200}
                                        height={60}
                                        src="/assets/logo.svg"
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
