/*
This implementation was completely done by `@kevinzunigacuellar` and all credit goes to him.
The plugin no longer works for the 2.0.0 version of Astro and I have filed an issue:  https://github.com/kevinzunigacuellar/astro-layouts/issues/32
While the issue gets looked at, I decided to move the code to a local plugin, but this is a temporary measure!
*/

import type { RemarkPlugin } from "@astrojs/markdown-remark"
import picomatch from "picomatch"

export const remarkAstroLayout: RemarkPlugin = (options: Record<string, string>) => {
  return function (_tree, file) {
    const [filePath] = file.history;
    const path = filePath.replace(/.*src\//, "");
    for (const [glob, layoutPath] of Object.entries(options)) {
      if (picomatch.isMatch(path, glob)) {
        const metadata = file.data.astro as { frontmatter: { layout: string } };
        metadata.frontmatter.layout = layoutPath;
      }
    }
  };
};