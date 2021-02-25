module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    eqeqeq: ['error', 'smart'],
    'no-unused-vars': 'off',
    'no-extra-boolean-cast': 'off',

    'no-throw-literal': 'error',
    'prefer-template': 'error',
    'prefer-destructuring': ['error', { object: true, array: false }],

    // allow hasOwnProperty
    'no-prototype-builtins': 'off',

    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'development' ? 'off' : 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    'prettier/prettier': 'error'
  }
};
