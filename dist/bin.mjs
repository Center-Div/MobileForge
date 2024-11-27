#!/usr/bin/env node
var tt=Object.defineProperty,et=Object.defineProperties;var ot=Object.getOwnPropertyDescriptors;var b=Object.getOwnPropertySymbols;var nt=Object.prototype.hasOwnProperty,rt=Object.prototype.propertyIsEnumerable;var v=(t,o,e)=>o in t?tt(t,o,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[o]=e,P=(t,o)=>{for(var e in o||(o={}))nt.call(o,e)&&v(t,e,o[e]);if(b)for(var e of b(o))rt.call(o,e)&&v(t,e,o[e]);return t},S=(t,o)=>et(t,ot(o));var n=(t,o,e)=>new Promise((r,a)=>{var c=s=>{try{d(e.next(s))}catch(m){a(m)}},g=s=>{try{d(e.throw(s))}catch(m){a(m)}},d=s=>s.done?r(s.value):Promise.resolve(s.value).then(c,g);d((e=e.apply(t,o)).next())});import X from"inquirer";import gt from"chalk";import ut from"chalk";import it from"inquirer";import*as y from"path";import*as k from"fs";function w(){return n(this,null,function*(){return it.prompt([{type:"input",name:"appName",message:"What is the name of your new Expo app?",validate:t=>t.trim()?!0:"App name cannot be empty."},{type:"input",name:"appPath",message:"Where do you want to create your new Mobile App? (Provide full path)",default:y.dirname(process.cwd()),validate:t=>{let o=y.resolve(t.trim());return k.existsSync(o)?!0:"Provided path does not exist."}}])})}import j from"path";function C(t,o){let e=t.trim(),r=j.resolve(o.trim());return j.join(r,e)}import{promisify as st}from"util";import at from"chalk";import ct from"ora";import{exec as pt}from"child_process";function F(t){return n(this,null,function*(){let o=st(pt),e=ct({text:"Forging a new Expo app...",color:"cyan"}).start();try{yield o(`npx create-expo-app@latest "${t}" --template blank-typescript`),e.succeed(`Expo app created successfully!
`)}catch(r){e.fail("Failed to forge the Expo app."),console.error(at.red("Error creating Expo app:"),r);return}})}import ft from"chalk";import*as i from"fs";import*as l from"path";import lt from"ora";import f from"chalk";function p(t,o){return n(this,null,function*(){console.log(`${f.cyan(t)}...`);try{for(let e=0;e<o.length;e++){let r=o[e],a=lt({text:`${f.yellow("|___")} ${r.text}`,color:"yellow"}).start();try{yield r.action(),a.succeed(`${f.yellow("|___")} ${r.text}`)}catch(c){throw a.fail(`${f.yellow("|___")} ${f.red(r.text)}`),console.error("Error:",c),new Error("Stopping due to failure in subtask.")}}console.log(`${t} ${f.green("completed successfully!")}
`)}catch(e){console.log(`${f.red(t)} failed.
`),console.error("Error:",e)}})}var A=["components","context","hooks","navigation","screens","utils"],E=`
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
`,$={"@assets/*":["src/assets/*"],"@components/*":["src/components/*"],"@context/*":["src/context/*"],"@hooks/*":["src/hooks/*"],"@navigation/*":["src/navigation/*"],"@screens/*":["src/screens/*"],"@utils/*":["src/utils/*"]},O=`
import { registerRootComponent } from "expo";
import App from "./src/App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
`;function L(t){return n(this,null,function*(){let o=l.join(t,"src"),e=l.join(t,"App.tsx"),r=l.join(o,"App.tsx"),a=l.join(t,"babel.config.ts"),c=l.join(t,"tsconfig.json"),g=l.join(t,"index.ts");yield p("Setting up folder structure and aliases",[{text:"Creating `src` folder and subfolders",action:()=>n(this,null,function*(){i.existsSync(o)||i.mkdirSync(o);for(let s of A){let m=l.join(o,s);i.existsSync(m)||i.mkdirSync(m)}})},{text:"Moving App.tsx to `src` folder",action:()=>n(this,null,function*(){i.existsSync(e)&&i.renameSync(e,r)})},{text:"Moving existing `assets` folder into `src`",action:()=>n(this,null,function*(){let s=l.join(t,"assets"),m=l.join(o,"assets");i.existsSync(s)&&i.renameSync(s,m)})},{text:"Updating `index.ts` to reference `src/App`",action:()=>n(this,null,function*(){i.writeFileSync(g,O.trim())})},{text:"Creating and configuring `babel.config.ts`",action:()=>n(this,null,function*(){i.writeFileSync(a,E.trim())})},{text:"Updating `tsconfig.json` with path aliases",action:()=>n(this,null,function*(){let s=JSON.parse(i.readFileSync(c,"utf-8"));s.compilerOptions=S(P({},s.compilerOptions),{baseUrl:"./",paths:$}),i.writeFileSync(c,JSON.stringify(s,null,2))})}])})}import*as R from"fs";import*as W from"path";var N=["eslint","prettier","eslint-plugin-prettier","eslint-config-prettier","globals","@eslint/js","typescript-eslint","eslint-plugin-react","eslint-plugin-react-native"].join(" "),T=`import globals from "globals";
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
  `;import{exec as mt}from"child_process";function h(t,o){return new Promise((e,r)=>{mt(t,{cwd:o},(a,c,g)=>{if(a)throw r(`Error executing command: ${g||a.message}`),new Error;e(c)})})}function _(t){return n(this,null,function*(){let o=W.resolve(t,"eslint.config.mjs");yield p("Setting up ESLint",[{text:"Installing ESLint dependencies",action:()=>n(this,null,function*(){let r=`npm install --save-dev ${N}`;yield h(r,t)})},{text:"Creating ESLint configuration",action:()=>n(this,null,function*(){R.writeFileSync(o,T,"utf-8")})},{text:"Running ESLint with --fix",action:()=>n(this,null,function*(){yield h("npx eslint . --fix",t)})}])})}var I=`
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
`;import*as z from"fs";function J(t){return n(this,null,function*(){yield p("Updating .gitignore file",[{text:"Writing .gitignore content",action:()=>n(this,null,function*(){z.writeFileSync(`${t}/.gitignore`,I,"utf8")})}])})}import*as x from"path";import*as u from"fs";var M=["i18next","react-i18next","expo-localization","@types/react-i18next"].join(" "),U=`import i18n from 'i18next';
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
`,D=`{
  "welcome": "Welcome",
  "description": "This is an example app."
}`,q=`{
  "welcome": "Bienvenue",
  "description": "Ceci est une application exemple."
}`;function G(t){return n(this,null,function*(){let o=x.resolve(t,"i18n"),e=x.resolve(o,"locales"),r=x.resolve(o,"i18n.ts"),a=x.resolve(e,"en.json"),c=x.resolve(e,"fr.json");yield p("Setting up i18n",[{text:"Installing i18n dependencies",action:()=>n(this,null,function*(){let d=`npm install ${M}`;yield h(d,t)})},{text:"Creating i18n folder structure",action:()=>n(this,null,function*(){u.mkdirSync(o,{recursive:!0}),u.mkdirSync(e,{recursive:!0})})},{text:"Adding translation files",action:()=>n(this,null,function*(){u.writeFileSync(a,D),u.writeFileSync(c,q)})},{text:"Creating i18n configuration file",action:()=>n(this,null,function*(){u.writeFileSync(r,U)})}])})}import*as V from"fs";import*as B from"path";var Q={arrowParens:"always",bracketSpacing:!0,jsxSingleQuote:!1,quoteProps:"as-needed",singleQuote:!1,semi:!0,printWidth:100,trailingComma:"es5"};function H(t){return n(this,null,function*(){let o=B.resolve(t,".prettierrc");yield p("Setting up Prettier",[{text:"Writing Prettier configuration file",action:()=>n(this,null,function*(){V.writeFileSync(o,JSON.stringify(Q,null,2),"utf-8")})}])})}function Y(t){return n(this,null,function*(){let o=[{name:"Updating .gitignore",action:J},{name:"Setting up Prettier",action:H},{name:"Setting up i18n",action:G},{name:"Setting up folder structure and aliases",action:L},{name:"Setting up ESLint",action:_}];for(let e of o)try{yield e.action(t)}catch(r){console.error(ft.red(`Error during ${e.name}:`),r);return}})}function K(){return n(this,null,function*(){try{let{appName:t,appPath:o}=yield w(),e=C(t,o);yield F(e),yield Y(e)}catch(t){console.error(ut.red("An unexpected error occurred:"),t)}})}function dt(){console.log(gt.bold.cyan(`
                  \u2B51 The Ultimate React Native Development Tooling \u2B51 
    `))}function Z(){return new Promise((t,o)=>{X.prompt([{type:"list",name:"menuOption",message:"Please select an option:",choices:[{name:"Forge a new Mobile App",value:1},new X.Separator,{name:"Exit",value:"exit"}]}]).then(e=>{e.menuOption==="exit"?(console.log("Goodbye!"),process.exit()):e.menuOption===1?(K(),t()):(console.log(`You selected Option ${e.menuOption}`),Z().then(t))}).catch(e=>{console.error("An error occurred:",e),o(e)})})}function xt(){return new Promise((t,o)=>{dt(),Z().then(()=>t()).catch(e=>o(e))})}xt().then(()=>{console.log("App ran successfully.")}).catch(t=>{console.error("App encountered an error:",t)});
