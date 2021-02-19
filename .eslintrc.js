module.exports = {
  extends: ['standard', 'plugin:unicorn/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    es6: true,
    browser: true,
  },
  ignorePatterns: ['**/dist/*'],
  plugins: ['svelte3', 'security'],
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3',
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
