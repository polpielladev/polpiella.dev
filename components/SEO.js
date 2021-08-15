import Head from "next/head";

export default function SEO({ title, description, caption }) {
    const fullImageURL = `https://www.polpiella.dev/api/thumbnail?title=${encodeURI(
        title
    )}&description=${encodeURI(caption)}`;

    return (
        <Head>
            <meta property="og:image" content={fullImageURL} />
            <meta name="twitter:image" content={fullImageURL} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@polcodes" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="description" content={description} />
            <title>{title}</title>
        </Head>
    );
}
