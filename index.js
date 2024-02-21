import { basename } from "node:path";

import nunjucks from "nunjucks";

export default (options = {}) => ({
  name: "vite-plugin-transform-nunjucks",
  transformIndexHtml: {
    enforce: "pre",
    async transform(html, { filename }) {
      nunjucks.configure({ autoescape: false });
      return nunjucks.renderString(html, {
        config,
        filename: basename(filename),
        env: process.env.NODE_ENV,
        ...options,
      });
    },
  },
});
