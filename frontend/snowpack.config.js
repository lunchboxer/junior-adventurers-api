const httpProxy = require('http-proxy')
require('dotenv').config()
/** @type {import("snowpack").SnowpackUserConfig } */

const proxy = httpProxy.createServer({
  target: 'http://localhost:3333/graphql',
})

module.exports = {
  mount: {
    public: '/',
    src: '/dist',
  },
  plugins: ['@snowpack/plugin-svelte'],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
    // {
    //   src: '/graphql',
    //   dest: (request, response) => {
    //     console.log('grpahql route got called ')
    //     proxy.web(request, response)
    //   },
    // },
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    open: 'chrome --disable-web-security',
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
}
