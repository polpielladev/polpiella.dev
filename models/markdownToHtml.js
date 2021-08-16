import remark from "remark";
import html from "remark-html";
import prism from "remark-prism";
import slug from "remark-slug";

export default async function markdownToHtml(markdown) {
    const result = await remark()
        .use(slug)
        .use(prism)
        .use(html)
        .process(markdown);
    return result.toString();
}
