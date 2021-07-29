import Head from "next/head";

export default function SEO({ title, description }) {
    return (
        <Head>
            <meta
                property="og:image"
                content={`https://blog-og-image-eight.vercel.app/${title}.png?theme=dark&md=1&fontSize=100px`}
            />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@polcodes" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="description" content={description} />
            <title>{title}</title>
        </Head>
    );
}
