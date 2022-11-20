import { existsSync, readFileSync } from "node:fs";
import { basename, extname, join } from "node:path";
import pkg from "nunjucks";
const { configure, renderString } = pkg;

export default () => ({
  name: "vite-plugin-transform-nunjucks",
  transformIndexHtml: {
    enforce: "pre",
    async transform(html) {
      const configPath = join(process.cwd(), "config.json");
      const config = JSON.parse(readFileSync(configPath));

      const json = Object.fromEntries(
        await Promise.all(
          config.fetch.filter(
            file => extname(file.output) === ".json"
              && file.id.length > 0
              && file.output.length > 0
              && existsSync(join(process.cwd(), file.output))
          ).map(async (file) =>
          ([
            basename(file.output, ".json"),
            JSON.parse(
              readFileSync(
                join(process.cwd(), file.output)
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