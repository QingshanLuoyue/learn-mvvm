// http://eslint.org/docs/user-guide/configuring
module.exports = {
  extends: 'eslint:recommended',
  parserOptions: {
    sourceType: 'module'
  },
  parser: 'babel-eslint',
  globals: {
    // Put things like jQuery, etc
    jQuery: true,
    $: true,
    Swiper: true
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  rules: {
    'no-alert': 0,
    'no-console': 0,
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single']
    // "semi": [
    //  "error",
    //  "always"
    // ]
  }
}
