import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
    runtimeConfig: {
          CONTENTSTACK_API_KEY: process.env.CONTENTSTACK_API_KEY,
          CONTENTSTACK_DELIVERY_TOKEN: process.env.CONTENTSTACK_DELIVERY_TOKEN,
          CONTENTSTACK_ENVIRONMENT: process.env.CONTENTSTACK_ENVIRONMENT,
          CONTENTSTACK_REGION: process.env.CONTENTSTACK_REGION
            ? process.env.CONTENTSTACK_REGION
            : '',
          CONTENTSTACK_MANAGEMENT_TOKEN: process.env.CONTENTSTACK_MANAGEMENT_TOKEN,
          CONTENTSTACK_API_HOST: process.env.CONTENTSTACK_API_HOST,
          CONTENTSTACK_APP_HOST: process.env.CONTENTSTACK_APP_HOST,
          CONTENTSTACK_LIVE_PREVIEW: process.env.CONTENTSTACK_LIVE_PREVIEW,
    },
    meta: {
      title: 'contentstack-nuxtjs-starter-app',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#317EFB' },
      ]
    },
  
    css: [
      '/assets/css/style.css',
      '/assets/css/tooltip.css',
      '/assets/css/third-party.css',
    ],
  
    plugins: [],
  
    components: true,
  
    buildModules: [
      '@nuxt/typescript-build',
      '@nuxtjs/eslint-module',
    ],
  
    modules: [['@nuxtjs/axios',{proxyHeaders: false}], '@nuxtjs/pwa', '@nuxt/content', '@nuxtjs/robots'],
  
    robots: {
      UserAgent: '*',
    },
    pwa: {
      icon: {
        purpose: ['any', 'maskable'],
        source: 'static/nuxt-icon.png',
      },
      manifest: {
        name: 'contentstack nuxtjs starter app',
        lang: 'en-us',
        useWebmanifestExtension: true,
        theme_color: '#317EFB',
      },
    },
  
    axios: {},
  
    content: {},
    build: {transpile: ['moment']},
})