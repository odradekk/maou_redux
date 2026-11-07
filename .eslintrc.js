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
  // 引擎生成的开发套件（#903）不做格式检查，理由见 .prettierignore 的同名条目：
  // 生成区是引擎的逐字输出，重排会在下次【生成开发套件】时被覆盖。其余规则
  // （no-undef / no-unused-vars 等）照常作用到手写区。
  overrides: [
    {
      files: ['ere/era-utils/**/*.js'],
      rules: { 'prettier/prettier': 'off' },
    },
  ],
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
