import type { RemarkPlugin } from "@astrojs/markdown-remark";

export const remarkSlugify: RemarkPlugin = (options: Record<string, string>) => {
  return function (_tree, file) {
    const filePath = file.history[0]
    let parts = filePath.split('/');
    const lastSegment = parts.pop() || parts.pop();
    const fileName = lastSegment.split('.')[0]

    const metadata = file.data.astro as { frontmatter: { slug: string } };
    metadata.frontmatter.slug = fileName
  };
};