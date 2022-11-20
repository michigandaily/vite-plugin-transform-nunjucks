# vite-plugin-transform-nunjucks

This is a Vite transformer which allows for Nunjucks templating.

Install by running `yarn add --dev michigandaily/vite-plugin-transform-nunjucks`.

Add to your `vite.config.js`:

```javascript
import { defineConfig } from 'vite';

import nunjucks from '@michigandaily/vite-plugin-transform-nunjucks'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [nunjucks()],
});
```

The transformer will template with files specified in a `config.json` file like this:

```json
{
  "fetch": [
    { "output": "./src/data/source.json" }
  ]
}
```

In the above case, the contents of the `source.json` file will be accessible through `{{ source }}` in Nunjucks.
