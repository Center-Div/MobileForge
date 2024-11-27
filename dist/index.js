#!/usr/bin/env node
var tt=Object.defineProperty,et=Object.defineProperties;var ot=Object.getOwnPropertyDescriptors;var b=Object.getOwnPropertySymbols;var nt=Object.prototype.hasOwnProperty,rt=Object.prototype.propertyIsEnumerable;var w=(t,o,e)=>o in t?tt(t,o,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[o]=e,v=(t,o)=>{for(var e in o||(o={}))nt.call(o,e)&&w(t,e,o[e]);if(b)for(var e of b(o))rt.call(o,e)&&w(t,e,o[e]);return t},P=(t,o)=>et(t,ot(o));var n=(t,o,e)=>new Promise((r,a)=>{var c=s=>{try{d(e.next(s))}catch(m){a(m)}},g=s=>{try{d(e.throw(s))}catch(m){a(m)}},d=s=>s.done?r(s.value):Promise.resolve(s.value).then(c,g);d((e=e.apply(t,o)).next())});import Z from"inquirer";import S from"path";function k(t,o){let e=t.trim(),r=S.resolve(o.trim());return S.join(r,e)}import{promisify as it}from"util";import st from"chalk";import at from"ora";import{exec as ct}from"child_process";function j(t){return n(this,null,function*(){let o=it(ct),e=at({text:"Forging a new Expo app...",color:"cyan"}).start();try{yield o(`npx create-expo-app@latest "${t}" --template blank-typescript`),e.succeed(`Expo app created successfully!
`)}catch(r){throw e.fail(`Failed to forge the Expo app.
`),new Error(`${st.yellow(r)}`)}})}import mt from"chalk";import*as i from"fs";import*as l from"path";import pt from"ora";import f from"chalk";function p(t,o){return n(this,null,function*(){console.log(`${f.cyan(t)}...`);try{for(let e=0;e<o.length;e++){let r=o[e],a=pt({text:`${f.yellow("|___")} ${r.text}`,color:"yellow"}).start();try{yield r.action(),a.succeed(`${f.yellow("|___")} ${r.text}`)}catch(c){throw a.fail(`${f.yellow("|___")} ${f.red(r.text)}`),console.error("Error:",c),new Error("Stopping due to failure in subtask.")}}console.log(`${t} ${f.green("completed successfully!")}
`)}catch(e){console.log(`${f.red(t)} failed.
`),console.error("Error:",e)}})}var C=["components","context","hooks","navigation","screens","utils"],F=`
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
`,E={"@assets/*":["src/assets/*"],"@components/*":["src/components/*"],"@context/*":["src/context/*"],"@hooks/*":["src/hooks/*"],"@navigation/*":["src/navigation/*"],"@screens/*":["src/screens/*"],"@utils/*":["src/utils/*"]},A=`
import { registerRootComponent } from "expo";
import App from "./src/App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
`;function $(t){return n(this,null,function*(){let o=l.join(t,"src"),e=l.join(t,"App.tsx"),r=l.join(o,"App.tsx"),a=l.join(t,"babel.config.ts"),c=l.join(t,"tsconfig.json"),g=l.join(t,"index.ts");yield p("Setting up folder structure and aliases",[{text:"Creating `src` folder and subfolders",action:()=>n(this,null,function*(){i.existsSync(o)||i.mkdirSync(o);for(let s of C){let m=l.join(o,s);i.existsSync(m)||i.mkdirSync(m)}})},{text:"Moving App.tsx to `src` folder",action:()=>n(this,null,function*(){i.existsSync(e)&&i.renameSync(e,r)})},{text:"Moving existing `assets` folder into `src`",action:()=>n(this,null,function*(){let s=l.join(t,"assets"),m=l.join(o,"assets");i.existsSync(s)&&i.renameSync(s,m)})},{text:"Updating `index.ts` to reference `src/App`",action:()=>n(this,null,function*(){i.writeFileSync(g,A.trim())})},{text:"Creating and configuring `babel.config.ts`",action:()=>n(this,null,function*(){i.writeFileSync(a,F.trim())})},{text:"Updating `tsconfig.json` with path aliases",action:()=>n(this,null,function*(){let s=JSON.parse(i.readFileSync(c,"utf-8"));s.compilerOptions=P(v({},s.compilerOptions),{baseUrl:"./",paths:E}),i.writeFileSync(c,JSON.stringify(s,null,2))})}])})}import*as N from"fs";import*as W from"path";var O=["eslint","prettier","eslint-plugin-prettier","eslint-config-prettier","globals","@eslint/js","typescript-eslint","eslint-plugin-react","eslint-plugin-react-native"].join(" "),L=`import globals from "globals";
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
  `;import{exec as lt}from"child_process";function h(t,o){return new Promise((e,r)=>{lt(t,{cwd:o},(a,c,g)=>{if(a)throw r(`Error executing command: ${g||a.message}`),new Error;e(c)})})}function R(t){return n(this,null,function*(){let o=W.resolve(t,"eslint.config.mjs");yield p("Setting up ESLint",[{text:"Installing ESLint dependencies",action:()=>n(this,null,function*(){let r=`npm install --save-dev ${O}`;yield h(r,t)})},{text:"Creating ESLint configuration",action:()=>n(this,null,function*(){N.writeFileSync(o,L,"utf-8")})},{text:"Running ESLint with --fix",action:()=>n(this,null,function*(){yield h("npx eslint . --fix",t)})}])})}var T=`
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
`;import*as _ from"fs";function I(t){return n(this,null,function*(){yield p("Updating .gitignore file",[{text:"Writing .gitignore content",action:()=>n(this,null,function*(){_.writeFileSync(`${t}/.gitignore`,T,"utf8")})}])})}import*as x from"path";import*as u from"fs";var z=["i18next","react-i18next","expo-localization","@types/react-i18next"].join(" "),J=`import i18n from 'i18next';
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
`,M=`{
  "welcome": "Welcome",
  "description": "This is an example app."
}`,U=`{
  "welcome": "Bienvenue",
  "description": "Ceci est une application exemple."
}`;function q(t){return n(this,null,function*(){let o=x.resolve(t,"i18n"),e=x.resolve(o,"locales"),r=x.resolve(o,"i18n.ts"),a=x.resolve(e,"en.json"),c=x.resolve(e,"fr.json");yield p("Setting up i18n",[{text:"Installing i18n dependencies",action:()=>n(this,null,function*(){let d=`npm install ${z}`;yield h(d,t)})},{text:"Creating i18n folder structure",action:()=>n(this,null,function*(){u.mkdirSync(o,{recursive:!0}),u.mkdirSync(e,{recursive:!0})})},{text:"Adding translation files",action:()=>n(this,null,function*(){u.writeFileSync(a,M),u.writeFileSync(c,U)})},{text:"Creating i18n configuration file",action:()=>n(this,null,function*(){u.writeFileSync(r,J)})}])})}import*as G from"fs";import*as Q from"path";var D={arrowParens:"always",bracketSpacing:!0,jsxSingleQuote:!1,quoteProps:"as-needed",singleQuote:!1,semi:!0,printWidth:100,trailingComma:"es5"};function V(t){return n(this,null,function*(){let o=Q.resolve(t,".prettierrc");yield p("Setting up Prettier",[{text:"Writing Prettier configuration file",action:()=>n(this,null,function*(){G.writeFileSync(o,JSON.stringify(D,null,2),"utf-8")})}])})}function B(t){return n(this,null,function*(){let o=[{name:"Updating .gitignore",action:I},{name:"Setting up Prettier",action:V},{name:"Setting up i18n",action:q},{name:"Setting up folder structure and aliases",action:$},{name:"Setting up ESLint",action:R}];for(let e of o)try{yield e.action(t)}catch(r){throw console.error(mt.red(`Error during ${e.name}:`),r),new Error(`"Error creating Expo app: ${r}`)}})}import ft from"inquirer";import*as Y from"path";import*as H from"fs";function K(){return n(this,null,function*(){return ft.prompt([{type:"input",name:"appName",message:"What is the name of your new Expo app?",validate:t=>t.trim()?!0:"App name cannot be empty."},{type:"input",name:"appPath",message:"Where do you want to create your new Mobile App? (Provide full path)",default:process.cwd(),validate:t=>{let o=Y.resolve(t.trim());return H.existsSync(o)?!0:"Provided path does not exist."}}])})}function X(){return n(this,null,function*(){let{appName:t,appPath:o}=yield K(),e=k(t,o);yield j(e),yield B(e)})}function y(){return new Promise((t,o)=>{Z.prompt([{type:"list",name:"menuOption",message:"Please select an option:",choices:[{name:"Forge a new Mobile App",value:1},new Z.Separator,{name:"Exit",value:"exit"}]}]).then(e=>n(this,null,function*(){e.menuOption==="exit"?(console.log("Goodbye!"),process.exit()):e.menuOption===1?(yield X(),t()):(console.log(`You selected Option ${e.menuOption}`),y().then(t))})).catch(e=>{console.error("An error occurred:",e),o(e)})})}import ut from"chalk";function gt(){return new Promise((t,o)=>{y().then(()=>t()).catch(e=>o(e))})}gt().then(()=>{console.log("App ran successfully.")}).catch(t=>{console.error(ut.red("An error occurred:"),t)});
