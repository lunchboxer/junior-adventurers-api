require('dotenv').config()
/** @type {import("snowpack").SnowpackUserConfig } */

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
