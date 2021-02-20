// only try to load .env if needed
// this requires setting LOCAL in .env to something
if (!process.env.LOCAL) require('dotenv').config()
/** @type {import("snowpack").SnowpackUserConfig } */
console.log(process.env.SNOWPACK_PUBLIC_PROD_API_ENDPOINT)
console.log(process.env.SNOWPACK_PUBLIC_DEV_API_ENDPOINT)
console.log(process.env.NODE_ENV)

module.exports = {
  mount: {
    public: '/',
    svelte: '/dist',
  },
  plugins: ['@snowpack/plugin-svelte'],
  routes: [
    /* Enable an SPA Fallback in development: */
    { match: 'routes', src: '.*', dest: '/index.html' },
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    open: 'none',
    output: 'stream',
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
}
