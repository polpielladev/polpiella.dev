export default function generateRSSItem(post) {
    return `
    <item>
        <guid>https://polpiella.codes/${post.slug}</guid>
        <title>${post.title}</title>
        <link>https://polpiella.codes/${post.slug}</link>
        <description>${post.excerpt}</description>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>
    `;
}
