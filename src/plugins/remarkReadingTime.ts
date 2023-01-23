import getReadingTime from 'reading-time'
import { toString } from 'mdast-util-to-string'
import type { RemarkPlugin } from "@astrojs/markdown-remark";

export const remarkReadingTime: RemarkPlugin = (options: Record<string, string>) => {
  return function (tree, file) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    const metadata = file.data.astro as { frontmatter: { readTime: number } };
    metadata.frontmatter.readTime = readingTime.minutes;
  };
};