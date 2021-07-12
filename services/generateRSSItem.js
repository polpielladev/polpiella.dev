import markdownToHtml from "models/MarkdownToHTML";

export default async function generateRSSItem(post) {
    const content = await markdownToHtml(post.content || "");

    return `
    <item>
        <guid>https://polpiella.codes/${post.slug}</guid>
        <title>${post.title}</title>
        <link>https://polpiella.codes/${post.slug}</link>
        <description>${`<![CDATA[${content}]]>`}</description>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>
    `;
}
