import generateRSSItem from "./generateRSSItem";

export default async function generateRSSFeed(posts) {
    const feedItems = await Promise.all(
        posts.map(async (post) => await generateRSSItem(post))
    );

    return `
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
        <channel>
            <title>Pol Piella Codes</title>
            <link>https://polpiella.codes</link>
            <description>[...]</description>
            <language>en</language>
            <lastBuildDate>${new Date(
                posts[0].date
            ).toUTCString()}</lastBuildDate>
            <atom:link href="https://polpiella.codes/rss.xml" rel="self" type="application/rss+xml"/>
            ${feedItems.join("")}
        </channel>
    </rss>
    `;
}
