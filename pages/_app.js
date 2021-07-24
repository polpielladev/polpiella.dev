import "styles/global/typography.scss";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "styles/global/ThemeConfig";
import styled from "styled-components";
import Link from "next/link";
import { CodeThemeStyle } from "styles/global/CodeThemeConfig";
import { darkTheme } from "styles/global/Themes/DarkTheme";
import Image from "next/image";

const Header = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
`;

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
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
                    </div>
                </div>
            </ThemeProvider>
        </>
    );
}
