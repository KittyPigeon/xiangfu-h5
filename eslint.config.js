import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import * as parserVue from "vue-eslint-parser";
import configPrettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";
import { defineFlatConfig } from "eslint-define-config";
import * as parserTypeScript from "@typescript-eslint/parser";
import pluginTypeScript from "@typescript-eslint/eslint-plugin";
import globals from "globals";

export default defineFlatConfig([
  {
    ...js.configs.recommended,
    ignores: ["**/.*", "dist/**/*", "*.d.ts", "public/*", "src/assets/**"],
    languageOptions: {
      globals: globals.browser
    },
    plugins: {
      prettier: pluginPrettier
    },
    rules: {
      ...configPrettier.rules,
      ...pluginPrettier.configs.recommended.rules,
      "no-debugger": "off",
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ],
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto"
        }
      ]
    }
  },
  {
    files: ["**/*.?([cm])ts", "**/*.?([cm])tsx"],
    languageOptions: {
      parser: parserTypeScript,
      parserOptions: {
        sourceType: "module"
      }
    },
    plugins: {
      "@typescript-eslint": pluginTypeScript
    },
    rules: {
      ...pluginTypeScript.configs.strict.rules,
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-redeclare": "error",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/prefer-as-const": "warn",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          disallowTypeAnnotations: false,
          fixStyle: "inline-type-imports"
        }
      ],
      "@typescript-eslint/prefer-literal-enum-member": [
        "error",
        {
          allowBitwiseExpressions: true
        }
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ]
    }
  },
  {
    files: ["**/*.d.ts"],
    rules: {
      "eslint-comments/no-unlimited-disable": "off",
      "import/no-duplicates": "off",
      "unused-imports/no-unused-vars": "off"
    }
  },
  {
    files: ["**/*.?([cm])js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-var-requires": "off"
    }
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      globals: {
        $: "readonly",
        $$: "readonly",
        $computed: "readonly",
        $customRef: "readonly",
        $ref: "readonly",
        $shallowRef: "readonly",
        $toRef: "readonly"
      },
      parser: parserVue,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        extraFileExtensions: [".vue"],
        parser: "@typescript-eslint/parser",
        sourceType: "module"
      }
    },
    plugins: {
      vue: pluginVue
    },
    processor: pluginVue.processors[".vue"],
    rules: {
      ...pluginVue.configs.base.rules,
      ...pluginVue.configs["vue3-essential"].rules,
      ...pluginVue.configs["vue3-recommended"].rules,
      // 'no-unused-vars': 'off', // 变量 没有被使用 或者变量不应该使用 var let const
      "no-empty": "off",
      "no-console": process.env.NODE_ENV === "production" ? 2 : 0,
      "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
      "no-param-reassign": "off", // 不改变函数的参数 0是关闭这个规则
      "no-useless-escape": "off",
      "global-require": 0, // 解决require里面的 路径不在node_modules 问题
      "import/no-unresolved": 0,
      "import/extensions": 0,
      "import/no-named-as-default-member": 0, // 导出没有默认 关闭
      "import/no-named-as-default": 0, // 导出没有默认 关闭
      "func-names": 0, // 函数表达式必须有名字， 0是关闭这个规则
      "import/prefer-default-export": 0, // 没有 export default 报错
      "max-len": 0, // 最大长度 100 报错
      "consistent-return": 0, // 箭头函数 必须返回值
      "accessor-pairs": 2, // 在对象中使用getter/setter
      "arrow-spacing": [
        2,
        {
          before: true,
          after: true
        }
      ], // 箭头函数前后括号
      "block-spacing": [2, "always"], // 块级作用域缩进
      indent: [
        2,
        2,
        {
          SwitchCase: 1
        }
      ], // 缩进风格，switch缩进风格
      "comma-dangle": [0, "never"], // 对象字面量项尾不能有逗号
      "brace-style": [
        2,
        "1tbs",
        {
          allowSingleLine: true
        }
      ], // 大括号风格，允许写在一行
      "comma-style": [2, "last"], // 逗号风格，换行时在行尾
      eqeqeq: [2, "allow-null"], // 必须使用全等
      "key-spacing": [
        2,
        {
          beforeColon: false,
          afterColon: true
        }
      ], // 对象字面量中冒号添加后空格
      "keyword-spacing": [
        2,
        {
          before: true,
          after: true
        }
      ], // 关键字前后空格
      "new-cap": [
        2,
        {
          newIsCap: true,
          capIsNew: false
        }
      ], // 新建对象实例首字母必须大写 构造函数
      "new-parens": 2, // new时必须加小括号
      "no-caller": 2, // 禁止使用arguments.caller或arguments.callee
      "no-class-assign": 2, // 禁止给类赋值
      "no-cond-assign": 2, // 禁止在条件表达式中使用赋值语句
      "no-const-assign": 2, // 禁止修改const声明的变量
      "no-dupe-args": 2, // 函数参数不能重复
      "no-dupe-class-members": 2, // 对象成员不能重复
      "no-dupe-keys": 2, // 在创建对象字面量时不允许键重复
      "no-duplicate-case": 2, // switch中的case标签不能重复
      "no-empty-character-class": 2, // 正则表达式中的[]内容不能为空
      "no-ex-assign": 2, // 禁止给catch语句中的异常参数赋值
      "no-extra-parens": [2, "functions"], // 禁止非必要的括号
      "no-fallthrough": 2, // 禁止switch穿透
      "no-floating-decimal": 2, // 禁止省略浮点数中的0 .5 3.
      "no-func-assign": 2, // 禁止重复的函数声明
      "no-invalid-regexp": 2, // 禁止无效的正则表达式
      "no-inner-declarations": [2, "functions"], // 禁止在块语句中使用声明（变量或函数）
      "no-mixed-spaces-and-tabs": 2, // 禁止混用tab和空格
      "no-multi-spaces": [
        2,
        {
          ignoreEOLComments: true
        }
      ], // 不能用多余的空格
      "no-multiple-empty-lines": [
        2,
        {
          max: 1
        }
      ], // 空行最多不能超过2行
      "no-negated-in-lhs": 2, // in 操作符的左边不能有!
      "no-new-object": 2, // 禁止使用new Object()
      "no-new-require": 2, // 禁止使用new require
      "no-new-symbol": 2, // 使用Symbol()而不能使用new
      "no-octal": 2, // 禁止使用八进制数字
      "no-self-compare": 2, // 不能自比较
      "no-sequences": 2, // 禁止使用逗号运算符
      "no-spaced-func": 2, // 函数调用时 函数名与()之间不能有空格
      "no-sparse-arrays": 2, // 禁止稀疏数组， [1,,2]
      "no-throw-literal": 2, // 禁止抛出字面量错误 throw "error";
      "no-undef": 2, // 不能有未定义的变量
      "no-undef-init": 2, // 变量初始化时不能直接给它赋值为undefined
      "no-unreachable": 2, // 不能有无法执行的代码
      "one-var": [
        2,
        {
          initialized: "never"
        }
      ], // 禁用连续声明
      "padded-blocks": [2, "never"], // 块语句内行首行尾不能空行
      "semi-spacing": [
        2,
        {
          before: false,
          after: true
        }
      ], // 分号前后空格
      "space-before-function-paren": [2, "always"], // 函数定义时括号前面需要有空格
      "space-in-parens": [2, "never"], // 小括号里面不需要有空格
      "use-isnan": 2, // 禁止比较时使用NaN，只能用isNaN()
      "prefer-const": 2, // 优先使用const
      "array-bracket-spacing": [2, "never"], // 是否允许非空数组里面有多余的空格
      "prefer-destructuring": 0,
      "linebreak-style": 0,
      "import/no-dynamic-require": 0,
      "class-methods-use-this": 0, // 禁止使用this
      "no-new": 0, // 禁止使用this
      "no-nested-ternary": 0, // 禁止使用三元
      "no-multi-assign": 0, // 修改还是的参数
      "no-irregular-whitespace": "off",
      "no-undef": 0, // 没有定义的变量
      "no-template-curly-in-string": 0, // 没有定义的变量
      "no-restricted-properties": 0,
      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: "always",
            normal: "always",
            component: "always"
          },
          svg: "always",
          math: "always"
        }
      ]
    }
  }
]);
