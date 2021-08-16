import markdownToHtml from "models/markdownToHTML";

export default async function generateRSSItem(post) {
    const content = await markdownToHtml(post.content || "");

    return `
    <item>
        <guid>https://polpiella.dev/${post.slug}</guid>
        <title>${post.title}</title>
        <link>https://polpiella.dev/${post.slug}</link>
        <description>${`<![CDATA[${content}]]>`}</description>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>
    `;
}
