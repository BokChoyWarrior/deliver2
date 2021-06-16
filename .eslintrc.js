module.exports = {
  root: true,
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    eqeqeq: 'warn'
  },
  globals: {
    React: true,
    ReactDOM: true,
    JSX: true,
    axios: true
  }
}
