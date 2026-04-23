import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

const parserOptions = {
  ecmaVersion: 'latest',
  ecmaFeatures: { jsx: true },
  sourceType: 'module',
}

export default [
  {
    ignores: [
      'dist/**',
      'dist-electron/**',
      'release/**',
      'node_modules/**',
      'public/CubismSdkForWeb-5-r.4/**',
      'public/js/**',
      'public/css/**',
      'vite.config.js.timestamp-*',
    ],
  },
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions,
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
      'react/prop-types': 'off',
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    files: ['electron/**/*.js', 'vite.config.js', 'eslint.config.js'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
      parserOptions,
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
    },
  },
]
