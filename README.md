# Sainapsis Frontend Developer Test – Console Admind

This project is a React application that uses Yarn as the package manager.

## Requirements

Make sure you have the following tools installed on your machine:

- [Node.js](https://nodejs.org/) (recommended version: >= 20.17.0)
- [Yarn](https://yarnpkg.com/) (recommended version: >= 1.22.x)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/jua1000n/Sainapsis-Test.git

2. Once you have cloned the repository and validated that the basic resources are installed, run the following command:

    ```bash
    yarn

3. This will download the necessary packages for the app. Now, to run the application, you must execute the following command:

    ```bash
    yarn dev

### If you want to run this in production
You need to ensure that you have a server to run it. To do this, you must run the command 

    yarn build

which will create base files. These files will be found in the dist folder. You must then serve them on a server, for example, using Nginx. Keep in mind that special configuration is required to correctly handle the routes, as react-router-dom is used.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
