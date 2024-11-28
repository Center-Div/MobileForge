#!/usr/bin/env node
var tt=Object.defineProperty,et=Object.defineProperties;var ot=Object.getOwnPropertyDescriptors;var b=Object.getOwnPropertySymbols;var nt=Object.prototype.hasOwnProperty,rt=Object.prototype.propertyIsEnumerable;var w=(t,e,o)=>e in t?tt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,v=(t,e)=>{for(var o in e||(e={}))nt.call(e,o)&&w(t,o,e[o]);if(b)for(var o of b(e))rt.call(e,o)&&w(t,o,e[o]);return t},P=(t,e)=>et(t,ot(e));var n=(t,e,o)=>new Promise((r,a)=>{var c=i=>{try{d(o.next(i))}catch(m){a(m)}},u=i=>{try{d(o.throw(i))}catch(m){a(m)}},d=i=>i.done?r(i.value):Promise.resolve(i.value).then(c,u);d((o=o.apply(t,e)).next())});import y from"chalk";function S(){let t=y.red("\u{1F525}"),e=y.bold.hex("#FFA500")(" Mobile Forge Active "),o=y.gray(` Ready to forge a new app!
`);console.clear(),console.log(`${t} ${e} ${t}`),console.log(o),console.log(y.gray(`------------------------------------------
`))}import k from"path";function j(t,e){let o=t.trim(),r=k.resolve(e.trim());return k.join(r,o)}import st from"inquirer";import*as F from"path";import*as C from"fs";function A(){return n(this,null,function*(){return st.prompt([{type:"input",name:"appName",message:"What is the name of your new Expo app?",validate:t=>t.trim()?!0:"App name cannot be empty."},{type:"input",name:"appPath",message:"Where do you want to create your new Mobile App? (Provide full path)",default:process.cwd(),validate:t=>{let e=F.resolve(t.trim());return C.existsSync(e)?!0:"Provided path does not exist."}}])})}import{promisify as it}from"util";import at from"chalk";import ct from"ora";import{exec as pt}from"child_process";function E(t){return n(this,null,function*(){let e=it(pt),o=ct({text:"Forging a new Expo app...",color:"cyan"}).start();try{yield e(`npx create-expo-app@latest "${t}" --template blank-typescript`),o.succeed(`Expo app created successfully!
`)}catch(r){throw o.fail(`Failed to forge the Expo app.
`),new Error(`${at.yellow(r)}`)}})}import ft from"chalk";import*as s from"fs";import*as l from"path";var $=["components","context","hooks","navigation","screens","utils"],L=`
module.exports = function (api: { cache: (arg0: boolean) => void }) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@assets": "./src/assets",
            "@components": "./src/components",
            "@context": "./src/context",
            "@hooks": "./src/hooks",
            "@navigation": "./src/navigation",
            "@screens": "./src/screens",
            "@utils": "./src/utils",
          },
        },
      ],
    ],
  };
};
`,N={"@assets/*":["src/assets/*"],"@components/*":["src/components/*"],"@context/*":["src/context/*"],"@hooks/*":["src/hooks/*"],"@navigation/*":["src/navigation/*"],"@screens/*":["src/screens/*"],"@utils/*":["src/utils/*"]},R=`
import { registerRootComponent } from "expo";
import App from "./src/App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
`;import lt from"ora";import f from"chalk";function p(t,e){return n(this,null,function*(){console.log(`${f.cyan(t)}...`);try{for(let o=0;o<e.length;o++){let r=e[o],a=lt({text:`${f.yellow("|___")} ${r.text}`,color:"yellow"}).start();try{yield r.action(),a.succeed(`${f.yellow("|___")} ${r.text}`)}catch(c){throw a.fail(`${f.yellow("|___")} ${f.red(r.text)}`),console.error("Error:",c),new Error("Stopping due to failure in subtask.")}}console.log(`${t} ${f.green("completed successfully!")}
`)}catch(o){console.log(`${f.red(t)} failed.
`),console.error("Error:",o)}})}function W(t){return n(this,null,function*(){let e=l.join(t,"src"),o=l.join(t,"App.tsx"),r=l.join(e,"App.tsx"),a=l.join(t,"babel.config.ts"),c=l.join(t,"tsconfig.json"),u=l.join(t,"index.ts");yield p("Setting up folder structure and aliases",[{text:"Creating `src` folder and subfolders",action:()=>n(this,null,function*(){s.existsSync(e)||s.mkdirSync(e);for(let i of $){let m=l.join(e,i);s.existsSync(m)||s.mkdirSync(m)}})},{text:"Moving App.tsx to `src` folder",action:()=>n(this,null,function*(){s.existsSync(o)&&s.renameSync(o,r)})},{text:"Moving existing `assets` folder into `src`",action:()=>n(this,null,function*(){let i=l.join(t,"assets"),m=l.join(e,"assets");s.existsSync(i)&&s.renameSync(i,m)})},{text:"Updating `index.ts` to reference `src/App`",action:()=>n(this,null,function*(){s.writeFileSync(u,R.trim())})},{text:"Creating and configuring `babel.config.ts`",action:()=>n(this,null,function*(){s.writeFileSync(a,L.trim())})},{text:"Updating `tsconfig.json` with path aliases",action:()=>n(this,null,function*(){let i=JSON.parse(s.readFileSync(c,"utf-8"));i.compilerOptions=P(v({},i.compilerOptions),{baseUrl:"./",paths:N}),s.writeFileSync(c,JSON.stringify(i,null,2))})}])})}import*as I from"fs";import*as O from"path";var T=["eslint","prettier","eslint-plugin-prettier","eslint-config-prettier","globals","@eslint/js","typescript-eslint","eslint-plugin-react","eslint-plugin-react-native"].join(" "),_=`import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import eslintPluginPrettier from "eslint-plugin-prettier";
import pluginReactNative from "eslint-plugin-react-native";

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
			"react-native": pluginReactNative,
    },
    rules: {
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
  `;import{exec as mt}from"child_process";function h(t,e){return new Promise((o,r)=>{mt(t,{cwd:e},(a,c,u)=>{if(a)throw r(`Error executing command: ${u||a.message}`),new Error;o(c)})})}function z(t){return n(this,null,function*(){let e=O.resolve(t,"eslint.config.mjs");yield p("Setting up ESLint",[{text:"Installing ESLint dependencies",action:()=>n(this,null,function*(){let r=`npm install --save-dev ${T}`;yield h(r,t)})},{text:"Creating ESLint configuration",action:()=>n(this,null,function*(){I.writeFileSync(e,_,"utf-8")})},{text:"Running ESLint with --fix",action:()=>n(this,null,function*(){yield h("npx eslint . --fix",t)})}])})}var J=`
# dependencies
node_modules/

# Expo
.expo/
dist/
web-build/
.idea/


# Native
*.orig.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision

# Metro
.metro-health-check*

# debug
npm-debug.*
yarn-debug.*
yarn-error.*

# native builds
android/
ios/
*.apk
*.aab
builds/
google-services.json
build-*.tar.gz


# keystore
credentials.json
*.keystore
!debug.keystore


# macOS
.DS_Store
*.pem

# local env files
.env*.local
.env.*
!.env.example

package-lock.json
gql/

# typescript
*.tsbuildinfo
database.types.ts


#VS CODE
.vscode/*
!.vscode/settings.json
`;import*as M from"fs";function D(t){return n(this,null,function*(){yield p("Updating .gitignore file",[{text:"Writing .gitignore content",action:()=>n(this,null,function*(){M.writeFileSync(`${t}/.gitignore`,J,"utf8")})}])})}import*as x from"path";import*as g from"fs";var U=["i18next","react-i18next","expo-localization","@types/react-i18next"].join(" "),q=`import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from './locales/en.json';
import fr from './locales/fr.json';

function getCurrentLanguage(): string {
  const locales = Localization.getLocales();
  const preferredLocale = locales[0]?.languageTag;

  return preferredLocale ?? 'en';
}


const resources = {
  en: { translation: en },
  fr: { translation: fr },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getCurrentLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
`,G=`{
  "welcome": "Welcome",
  "description": "This is an example app."
}`,H=`{
  "welcome": "Bienvenue",
  "description": "Ceci est une application exemple."
}`;function Q(t){return n(this,null,function*(){let e=x.resolve(t,"i18n"),o=x.resolve(e,"locales"),r=x.resolve(e,"i18n.ts"),a=x.resolve(o,"en.json"),c=x.resolve(o,"fr.json");yield p("Setting up i18n",[{text:"Installing i18n dependencies",action:()=>n(this,null,function*(){let d=`npm install ${U}`;yield h(d,t)})},{text:"Creating i18n folder structure",action:()=>n(this,null,function*(){g.mkdirSync(e,{recursive:!0}),g.mkdirSync(o,{recursive:!0})})},{text:"Adding translation files",action:()=>n(this,null,function*(){g.writeFileSync(a,G),g.writeFileSync(c,H)})},{text:"Creating i18n configuration file",action:()=>n(this,null,function*(){g.writeFileSync(r,q)})}])})}import*as B from"fs";import*as K from"path";var V={arrowParens:"always",bracketSpacing:!0,jsxSingleQuote:!1,quoteProps:"as-needed",singleQuote:!1,semi:!0,printWidth:100,trailingComma:"es5"};function X(t){return n(this,null,function*(){let e=K.resolve(t,".prettierrc");yield p("Setting up Prettier",[{text:"Writing Prettier configuration file",action:()=>n(this,null,function*(){B.writeFileSync(e,JSON.stringify(V,null,2),"utf-8")})}])})}function Y(t){return n(this,null,function*(){let e=[{name:"Updating .gitignore",action:D},{name:"Setting up Prettier",action:X},{name:"Setting up i18n",action:Q},{name:"Setting up folder structure and aliases",action:W},{name:"Setting up ESLint",action:z}];for(let o of e)try{yield o.action(t)}catch(r){throw console.error(ft.red(`Error during ${o.name}:`),r),new Error(`"Error creating Expo app: ${r}`)}})}function Z(){return n(this,null,function*(){let{appName:t,appPath:e}=yield A(),o=j(t,e);yield E(o),yield Y(o)})}import gt from"chalk";function ut(){return new Promise(()=>{S(),Z()})}ut().then(()=>{console.log("App ran successfully.")}).catch(t=>{console.error(gt.red("An error occurred:"),t)});
