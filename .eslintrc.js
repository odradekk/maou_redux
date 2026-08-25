module.exports = {
  env: {
    node: true,
    es6: true,
    // #138：test/event-first.test.js 用 BigInt 拆超安全整数的原打包值
    // （no-undef 的全局表来自 env，parserOptions.ecmaVersion 只管解析）
    es2020: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  root: true,
  rules: {
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
        semi: true,
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
  },
};
