module.exports = {
  root: true,
  parserOptions: {
    "ecmaVersion": 2020,
    "sourceType": "module",
  },
  extends: [
    "eslint:recommended",
    "plugin:jest/style"
  ],
  env: {
    "amd": true,
    "node": true,
    "es6": true,
    "jest/globals": true,
  },
  plugins: ["jest",],
  rules: {
    quotes: ["error", "double"],
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "semi": ["error", "always"],
    "no-cond-assign": ["error", "always"],
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error"
  }
};
