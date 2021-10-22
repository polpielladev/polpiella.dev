export default function generateRSSFeed(posts) {
    const feedItems = posts.map(
        (post) => `
        <item>
            <guid>https://polpiella.dev/blog/${post.slug}</guid>
            <title>${post.title}</title>
            <link>https://polpiella.dev/blog/${post.slug}</link>
            <description>${`<![CDATA[${post.astro.html}]]>`}</description>
            <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        </item>
    `
    );

    return `
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
        <channel>
            <title>Pol Piella Codes</title>
            <link>https://polpiella.dev</link>
            <description>[...]</description>
            <language>en</language>
            <lastBuildDate>${new Date(
                posts[0].date
            ).toUTCString()}</lastBuildDate>
            <atom:link href="https://polpiella.dev/rss.xml" rel="self" type="application/rss+xml"/>
            ${feedItems.join("")}
        </channel>
    </rss>
    `;
}
