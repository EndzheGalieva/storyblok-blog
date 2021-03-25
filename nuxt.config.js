const axios = require("axios");

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Storyblok + Nuxt = <3",
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "An awesone blog about tech stuff, built with Nuxt and Storyblok"}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lato:wght@400,700&'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    [
      'storyblok-nuxt',
       {
        accessToken:
          process.env.NODE_ENV == 'production'
           ? 'GB2H2MRDC7KrPUHDSDkwJgtt'
           : '93HTLWT1VxHyAslHoN3n2gtt',
         cacheProvider: 'memory'
      }
   ]
],

  generate: {
    routes: function() {
      return axios.get('https://api.storyblok.com/v1/cdn/stories?version=published&token=GB2H2MRDC7KrPUHDSDkwJgtt&starts_with=blog&cv=' +
        Math.floor(Date.now() / 1e3)
      )
        .then(res => {
          const blogPosts = res.data.stories.map(bp => bp.full_slug);
          return [
            '/',
            '/blog',
            '/about',
            ...blogPosts
          ]
      });
    }
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
