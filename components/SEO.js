import Head from "next/head";
import { useRouter } from "next/router";
import absoluteURL from "utils/absoluteURL";

export default function SEO({ title, description }) {
    const router = useRouter();
    const searchParameters = new URLSearchParams();
    searchParameters.set("path", router.pathname);
    const fullImageURL = absoluteURL(`/api/thumbnail?${searchParameters}`);

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
