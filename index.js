import { basename } from "node:path";

import nunjucks from "nunjucks";

export default (options = {}) => ({
  name: "vite-plugin-transform-nunjucks",
  transformIndexHtml: {
    order: "pre",
    async handler(html, { filename }) {
      nunjucks.configure({ autoescape: false });
      return nunjucks.renderString(html, {
        filename: basename(filename),
        env: process.env.NODE_ENV,
        ...options,
      });
    },
  },
});
