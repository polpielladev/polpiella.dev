import "../styles/global/global-styles.scss";
import "../styles/global/typography.scss";
import "../styles/global/code-style.scss";

export default function App({ Component, pageProps }) {
    return (
        <div className="app dark-mode">
            <Component {...pageProps} />
        </div>
    );
}
