# Cloudflare D1, Remix, and Drizzle

This repo is an example for using Cloudflare D1, Remix, and Drizzle together. You can see a live demo [here](https://d1-drizzle-remix-example.pages.dev/).

- [Cloudflare D1 Docs](https://developers.cloudflare.com/d1/)
- [Remix Docs](https://remix.run/docs)
- [Drizzle Docs](https://orm.drizzle.team/docs/quick-sqlite/d1)

## Development

You will be utilizing Wrangler for local development to emulate the Cloudflare runtime. This is already wired up in your package.json as the `dev` script:

```sh
# start the remix dev server and wrangler
npm run dev
```

Open up [http://127.0.0.1:8788](http://127.0.0.1:8788) and you should be ready to go!

## Deployment

Cloudflare Pages are currently only deployable through their Git provider integrations.

If you don't already have an account, then [create a Cloudflare account here](https://dash.cloudflare.com/sign-up/pages) and after verifying your email address with Cloudflare, go to your dashboard and follow the [Cloudflare Pages deployment guide](https://developers.cloudflare.com/pages/framework-guides/deploy-anything).

Configure the "Build command" should be set to `npm run build`, and the "Build output directory" should be set to `public`.

## Initialization

1. `npm install`
2. `npm run d1:new`
3. Add the newly created D1 database UUID to `wrangler.toml`
4. `npm run d1:init`

With the D1 database initialised on Cloudflare, and configured in your wrangler.toml, you can also develop on a local d1 database (after running the above steps):

1. `npm run local:d1:init`
2. `npm run dev`

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/rozenmd/d1-drizzle-remix-example)
