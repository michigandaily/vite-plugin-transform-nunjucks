import { existsSync, readFileSync } from "node:fs";
import { basename, extname, join } from "node:path";
import pkg from "nunjucks";
const { configure, renderString } = pkg;

export default () => ({
  name: "vite-plugin-transform-nunjucks",
  transformIndexHtml: {
    enforce: "pre",
    async transform(html, { filename }) {
      const defualtConfigPaths = ["config.json", "sink.config.json", "sink.config.js"];
      const configPath = defualtConfigPaths.find(file => existsSync(join(process.cwd(), file)));
      const config = (extname(configPath) === ".json") 
        ? JSON.parse(readFileSync(configPath))
        : (await import(join(process.cwd(), configPath))).default;

      const json = Object.fromEntries(
        await Promise.all(
          config.fetch.filter(
            file => extname(file.output) === ".json"
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
      return renderString(html, { config, filename: basename(filename), env: process.env.NODE_ENV, ...json })
    }
  }
})