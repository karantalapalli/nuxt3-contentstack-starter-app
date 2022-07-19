module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'no-console': 0,
    "vue/require-prop-types":0,
    "vue/max-attributes-per-line":0,
    "prettier/prettier":0,
    "no-useless-computed-key":0,
    'vue/multi-word-component-names': ['error', {
      'ignores': ['default']
    }]
  },
}
