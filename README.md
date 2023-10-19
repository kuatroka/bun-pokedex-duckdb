## Clone it


## Running

Once you've created a project and installed dependencies with `bun i`, start a development server:

```bash
bun --bun run dev
```

## Building

To create a production version of your app:

```bash
bun run build
```

You can preview the production build with `bun run preview`.

> To deploy your app, you may need to install a bun adapter

Install with ```bun add -d svelte-adapter-bun```
then add the adapter to your svelte.config.js:

```
// svelte.config.js
import adapter from "svelte-adapter-bun";

export default {
  kit: {
    adapter: adapter(),
  },
};
```
