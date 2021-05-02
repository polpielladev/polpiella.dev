import "../styles/global/global-styles.scss";
import "../styles/global/typography.scss";
import "../styles/global/code-style.scss";
import Head from "next/head";

export default function App({ Component, pageProps }) {
    return (
        <div className="app dark-mode">
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </div>
    );
}
