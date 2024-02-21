# vite-plugin-transform-nunjucks

This is a Vite transformer which allows for Nunjucks templating.

Install by running `yarn add --dev michigandaily/vite-plugin-transform-nunjucks`.

Add to your `vite.config.js`:

```javascript
import { defineConfig } from "vite";

import nunjucks from "@michigandaily/vite-plugin-transform-nunjucks";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [nunjucks()],
});
```

The plugin also optionally accepts an object to add templating variables:

```javascript
import { defineConfig } from "vite";

import nunjucks from "@michigandaily/vite-plugin-transform-nunjucks";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    nunjucks({
      title: "The Michigan Daily",
      description: "A brief description of the site.",
    }),
  ],
});
```
