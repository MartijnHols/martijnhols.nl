/* eslint-disable import-x/no-named-as-default-member */
/* global process */
// @ts-check

import { FlatCompat } from '@eslint/eslintrc'
import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginImportX from 'eslint-plugin-import-x'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

// Only run code style checks on the CLI and in CI. Only rules that are
// automatically fixable are included in this set.
// With this toggle IDEs can do good linting and show code issues inline without
// continuous code style warnings breaking up the flow.
// We do want code style warnings included in the CLI/CI linting rather than as
// separate output because the formatting of eslint is more readable, and they
// both indicate issues in the way code is written that need to be fixed.
const checkCodestyle = process.env.CODE_STYLE === 'true'

/** @type {import('typescript-eslint').InfiniteDepthConfigWithExtends} */
const ignoreCodeStyleRules = {
  // Turn all rules off that can be autofixed and would be annoying during the
  // code writing process.
  rules: {
    '@typescript-eslint/array-type': 'off',
    'import-x/order': 'off',
    'arrow-body-style': 'off',
    'prettier/prettier': 'off',
  },
}

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

export default tseslint.config(
  {
    ignores: ['.next', '.lighthouseci'],
  },

  // JS
  eslint.configs.recommended,

  // Next doesn't do flat config
  ...compat.config({
    extends: [
      'plugin:@next/next/recommended',
      'plugin:@next/next/core-web-vitals',
    ],
  }),

  // Accessibility
  jsxA11y.flatConfigs.recommended,

  // TypeScript
  tseslint.configs.strictTypeChecked,
  {
    rules: {
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowAny: false,
          allowBoolean: false,
          allowNever: false,
          allowNullish: false,
          allowRegExp: false,
          // Inconvenient for little safety not to allow numbers in strings
          allowNumber: true,
        },
      ],

      // Allow explicit property/parameter types so they can be consistent with
      // their sibling properties/parameters that have no default value.
      '@typescript-eslint/no-inferrable-types': [
        'warn',
        {
          ignoreParameters: true,
          ignoreProperties: true,
        },
      ],

      // Parameter properties can be confusing to those new to TypeScript as
      // they are less explicit than other ways of declaring and initializing
      // class members.
      // (also since I avoid classes, this is even more so)
      '@typescript-eslint/parameter-properties': 'error',
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  tseslint.configs.stylisticTypeChecked,
  {
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
  },

  // Imports
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  {
    rules: {
      'import-x/order': [
        'warn',
        {
          groups: [
            ['external', 'builtin'],
            'internal',
            'parent',
            ['sibling', 'index'],
          ],
          'newlines-between': 'never',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import-x/no-useless-path-segments': 'warn',
      // Every dependency should be in the package.json
      'import-x/no-extraneous-dependencies': 'warn',
    },
  },

  // React
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  reactHooks.configs['recommended-latest'],
  {
    rules: {
      // Add emotion support
      'react/no-unknown-property': ['error', { ignore: ['css'] }],
      // Codebase consistency and ease of use
      'react/prefer-stateless-function': 'warn',
      // Codebase consistency and ease of use
      'react/jsx-curly-brace-presence': [
        'warn',
        { props: 'never', children: 'never' },
      ],

      // When using a boolean attribute in JSX, you can set the attribute value to true or omit the value.
      // This rule will enforce one or the other to keep consistency in your code
      'react/jsx-boolean-value': ['warn', 'never'],

      // Allow using any characters in children texts to make writing text
      // easier. Parser already fails for everything except for ' and "
      'react/no-unescaped-entities': 'off',
    },
  },

  // TODO: Clean up (remove as many custom rules as possible)
  {
    rules: {
      // Swift removed ++ and -- completely for various good reasons:
      // https://github.com/apple/swift-evolution/blob/master/proposals/0004-remove-pre-post-inc-decrement.md#disadvantages-of-these-operators
      // Use one of the following instead:
      // foo(i++) -> foo(i); i += 1
      // foo(++i) -> i += 1; foo(i)
      // i-- -> i -= 1
      // for (let i = 0; i < arr.length; i++) -> for (let i = 0; i < arr.length; i += 1)
      // NOTE: For the last one, prefer arr.forEach(func)/map/reduce instead.
      'no-plusplus': 'warn',

      // Disallow multiple declarations with one const/let statement.
      'one-var': [
        'error',
        {
          initialized: 'never',
        },
      ],

      // Always prefer if-statements over expressions for both consistency and
      // in general readability when paired with early returns.
      'no-unused-expressions': 'off',

      'no-restricted-syntax': [
        'warn',
        'WithStatement',
        {
          selector: 'ForInStatement',
          message:
            'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array or use for..of.',
        },
        {
          selector:
            "CallExpression[callee.name='setTimeout'][arguments.length!=2]",
          message: 'setTimeout must always be invoked with two arguments.',
        },
      ],

      // if (!a > b) will convert a into a boolean since ! has precendence over >
      // Note: @typescript-eslint disables this for TS files since TS also checks for this.
      'no-unsafe-negation': ['error', { enforceForOrderingRelations: true }],

      // TODO: Rule to encourage foreach/map/reduce over for

      curly: ['warn', 'all'],

      // Consistent arrow functions; convert () => { return x; } to () => x.
      'arrow-body-style': ['warn', 'as-needed'],

      'no-implicit-coercion': 'warn',

      // "only" filter for tests are commonly used during development and rarely desired in git (use .skip instead)
      // TODO: 'no-only-tests/no-only-tests': 'error',
    },
  },
  {
    files: ['*.js'],
    rules: {
      // We only write JS when we need something to run in node.js without
      // first compiling it. In that case, usually, we can't use module
      // imports either.
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },

  // Code style
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    // @ts-expect-error eslint config prettier has broken rules
    rules: {
      ...eslintConfigPrettier.rules,
      'prettier/prettier': 'warn',
    },
  },

  !checkCodestyle ? ignoreCodeStyleRules : {},
)
