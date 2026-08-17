# splitpocket.app

Marketing site for [SplitPocket](https://splitpocket.app) — track what you
spend, split what you share.

Static: React Router in framework mode (`ssr: false` + `prerender: true`)
renders every route to HTML at build time.

## Develop

```sh
npm install
npm run dev        # dev server
npm run typecheck  # react-router typegen + tsc
npm run build      # prerender into docs/
npm run preview    # serve the build on :4173
```

`docs/` is generated output and is not committed.
