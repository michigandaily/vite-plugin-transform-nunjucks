import { existsSync, readFileSync } from "node:fs";
import { basename, extname, normalize } from "node:path";
import { configure, renderString } from "nunjucks";

export default () => ({
  name: "vite-plugin-transform-nunjucks",
  transformIndexHtml: {
    enforce: "pre",
    async transform(html) {
      const configPath = new URL("config.json", import.meta.url);
      const config = JSON.parse(readFileSync(configPath));
      const json = Object.fromEntries(
        await Promise.all(
          config.fetch.filter(
            file => extname(file.output) === ".json"
              && file.id.length > 0
              && file.output.lengeth > 0
              && existsSync(new URL(file.output, import.meta.url))
          ).map(async (file) =>
          ([
            basename(file.output, ".json"),
            JSON.parse(
              readFileSync(
                new URL(normalize(file.output, import.meta.url))
              )
            )
          ]))
        )
      );

      configure({ autoescape: false });
      return renderString(html, { config, env: process.env.NODE_ENV, ...json })
    }
  }
})