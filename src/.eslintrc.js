module.exports = {
  extends: ['standard', 'plugin:unicorn/recommended'],
  ignorePatterns: ['node_modules'],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  env: {
    es6: true,
    browser: false,
  },
  plugins: ['security'],
  overrides: [
    {
      files: ['*.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      plugins: ['@graphql-eslint'],
    },
  ],
  rules: {
    'unicorn/filename-case': 0,
    'import/first': 0,
    'space-before-function-paren': 0,
    'comma-dangle': ['error', 'always-multiline'],
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 2, maxEOF: 1 }],
  },
}
