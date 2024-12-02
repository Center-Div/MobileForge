#!/usr/bin/env node
var ve=Object.defineProperty,Se=Object.defineProperties;var be=Object.getOwnPropertyDescriptors;var P=Object.getOwnPropertySymbols;var Ee=Object.prototype.hasOwnProperty,ke=Object.prototype.propertyIsEnumerable;var w=(e,t,n)=>t in e?ve(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,S=(e,t)=>{for(var n in t||(t={}))Ee.call(t,n)&&w(e,n,t[n]);if(P)for(var n of P(t))ke.call(t,n)&&w(e,n,t[n]);return e},_=(e,t)=>Se(e,be(t));var o=(e,t,n)=>new Promise((i,s)=>{var p=a=>{try{u(n.next(a))}catch(d){s(d)}},f=a=>{try{u(n.throw(a))}catch(d){s(d)}},u=a=>a.done?i(a.value):Promise.resolve(a.value).then(p,f);u((n=n.apply(e,t)).next())});import b from"chalk";function N(){let e=b.red("\u{1F525}"),t=b.bold.hex("#FFA500")(" Mobile Forge Active "),n=b.gray(` Ready to forge a new app!
`);console.clear(),console.log(`${e} ${t} ${e}`),console.log(n),console.log(b.gray(`------------------------------------------
`))}import O from"path";function A(e,t){let n=e.trim(),i=O.resolve(t.trim());return O.join(i,n)}import{promisify as Pe}from"node:util";import we from"chalk";import _e from"ora";import{exec as Ne}from"node:child_process";function C(e){return o(this,null,function*(){let t=Pe(Ne),n=_e({text:"Forging a new Expo app...",color:"cyan"}).start();try{yield t(`npx create-expo-app@latest "${e}" --template blank-typescript`),n.succeed(`Expo app created successfully!
`)}catch(i){throw n.fail(`Failed to forge the Expo app.
`),new Error(`${we.yellow(i)}`)}})}import Ce from"chalk";import*as r from"fs";import*as m from"path";var F=["components","context","hooks","navigation","screens","utils","clients"],R=`
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
`,j={"@assets/*":["src/assets/*"],"@components/*":["src/components/*"],"@context/*":["src/context/*"],"@hooks/*":["src/hooks/*"],"@navigation/*":["src/navigation/*"],"@screens/*":["src/screens/*"],"@utils/*":["src/utils/*"]},D=`
import { registerRootComponent } from "expo";
import App from "./src/App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
`;import g from"chalk";import Oe from"ora";function c(e,t){return o(this,null,function*(){console.log(`${g.cyan(e)}...`);for(let n of t){let i=Oe({text:`${g.yellow("|___")} ${n.text}`,color:"yellow"}).start();try{yield n.action(),i.succeed(`${g.yellow("|___")} ${n.text}`)}catch(s){throw i.fail(`${g.yellow("|___")} ${g.red(n.text)}`),new Error(`Stopping due to failure in subtask: ${g.red(n.text)}`)}}console.log(`${e} ${g.green("completed successfully!")}
`)})}function $(e){return o(this,null,function*(){let t=m.join(e,"src"),n=m.join(e,"App.tsx"),i=m.join(t,"App.tsx"),s=m.join(e,"babel.config.ts"),p=m.join(e,"tsconfig.json"),f=m.join(e,"index.ts");yield c("Setting up folder structure and aliases",[{text:"Creating `src` folder and subfolders",action:()=>o(this,null,function*(){r.existsSync(t)||r.mkdirSync(t);for(let a of F){let d=m.join(t,a);r.existsSync(d)||r.mkdirSync(d)}})},{text:"Moving App.tsx to `src` folder",action:()=>o(this,null,function*(){r.existsSync(n)&&r.renameSync(n,i)})},{text:"Moving existing `assets` folder into `src`",action:()=>o(this,null,function*(){let a=m.join(e,"assets"),d=m.join(t,"assets");r.existsSync(a)&&r.renameSync(a,d)})},{text:"Updating `index.ts` to reference `src/App`",action:()=>o(this,null,function*(){r.writeFileSync(f,D.trim())})},{text:"Creating and configuring `babel.config.ts`",action:()=>o(this,null,function*(){r.writeFileSync(s,R.trim())})},{text:"Updating `tsconfig.json` with path aliases",action:()=>o(this,null,function*(){let a=JSON.parse(r.readFileSync(p,"utf-8"));a.compilerOptions=_(S({},a.compilerOptions),{baseUrl:"./",paths:j}),r.writeFileSync(p,JSON.stringify(a,null,2))})}])})}import*as T from"fs";import*as U from"path";var I=["eslint","prettier","eslint-plugin-prettier","eslint-config-prettier","globals","@eslint/js","typescript-eslint","eslint-plugin-react","eslint-plugin-react-native"].join(" "),V=`import globals from "globals";
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
  `;import{exec as Ae}from"node:child_process";function l(e,t){return new Promise((n,i)=>{Ae(e,{cwd:t},(s,p,f)=>{if(s){i(`Error executing command: ${f||s.message}`);return}n(p)})})}function L(e){return o(this,null,function*(){let t=U.resolve(e,"eslint.config.mjs");yield c("Setting up ESLint",[{text:"Installing ESLint dependencies",action:()=>o(this,null,function*(){let i=`npm install --save-dev ${I}`;yield l(i,e)})},{text:"Creating ESLint configuration",action:()=>o(this,null,function*(){T.writeFileSync(t,V,"utf-8")})},{text:"Running ESLint with --fix",action:()=>o(this,null,function*(){yield l("npx eslint . --fix",e)})}])})}var W=`
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
`;import*as B from"fs";function M(e){return o(this,null,function*(){yield c("Updating .gitignore file",[{text:"Writing .gitignore content",action:()=>o(this,null,function*(){B.writeFileSync(`${e}/.gitignore`,W,"utf8")})}])})}import*as h from"path";import*as x from"fs";var J=["i18next","react-i18next","expo-localization","@types/react-i18next"].join(" "),X=`import i18n from 'i18next';
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
`,z=`{
  "welcome": "Welcome",
  "description": "This is an example app."
}`,G=`{
  "welcome": "Bienvenue",
  "description": "Ceci est une application exemple."
}`;function K(e){return o(this,null,function*(){let t=h.resolve(e,"src","i18n"),n=h.resolve(t,"locales"),i=h.resolve(t,"i18n.ts"),s=h.resolve(n,"en.json"),p=h.resolve(n,"fr.json");yield c("Setting up i18n",[{text:"Installing i18n dependencies",action:()=>o(this,null,function*(){let u=`npm install ${J}`;yield l(u,e)})},{text:"Creating i18n folder structure",action:()=>o(this,null,function*(){x.mkdirSync(t,{recursive:!0}),x.mkdirSync(n,{recursive:!0})})},{text:"Adding translation files",action:()=>o(this,null,function*(){x.writeFileSync(s,z),x.writeFileSync(p,G)})},{text:"Creating i18n configuration file",action:()=>o(this,null,function*(){x.writeFileSync(i,X)})},{text:"Installing i18n Ally VS Code extension",action:()=>o(this,null,function*(){yield l("code --install-extension lokalise.i18n-ally",e)})}])})}import*as H from"fs";import*as Q from"path";var q={arrowParens:"always",bracketSpacing:!0,jsxSingleQuote:!1,quoteProps:"as-needed",singleQuote:!1,semi:!0,printWidth:100,trailingComma:"es5"};function Y(e){return o(this,null,function*(){let t=Q.resolve(e,".prettierrc");yield c("Setting up Prettier",[{text:"Writing Prettier configuration file",action:()=>o(this,null,function*(){H.writeFileSync(t,JSON.stringify(q,null,2),"utf-8")})}])})}import*as te from"fs";import*as oe from"path";var Z=["@biomejs/biome"].join(" "),ee=`{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "vcs": {
    "enabled": false,
    "clientKind": "git",
    "useIgnoreFile": false
  },
  "files": {
    "ignoreUnknown": false,
    "ignore": []
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2
  },
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "correctness": {
        "useExhaustiveDependencies": "warn",
        "noUnusedImports": "error",
        "useHookAtTopLevel": "error"
      }
    }
  },

  "javascript": {
    "formatter": {
      "quoteStyle": "double"
    }
  }
}
`;function ne(e){return o(this,null,function*(){let t=oe.resolve(e,"biome.json");yield c("Setting up Biome",[{text:"Installing Biome dependencies",action:()=>o(this,null,function*(){let i=`npm install --save-dev ${Z}`;yield l(i,e)})},{text:"Running Biome initialization",action:()=>o(this,null,function*(){yield l("npx @biomejs/biome init",e)})},{text:"Installing Biome VS Code extension",action:()=>o(this,null,function*(){yield l("code --install-extension biomejs.biome",e)})},{text:"Updating biome.json configuration",action:()=>o(this,null,function*(){te.writeFileSync(t,ee)})},{text:"Running Biome formatting",action:()=>o(this,null,function*(){yield l("npx @biomejs/biome check --write",e)})}])})}import*as y from"fs";import*as k from"path";function ie(e){let t={"i18n-ally.localesPaths":["src/i18n/locales"],"i18n-ally.keystyle":"nested","i18n-ally.sourceLanguage":"fr","editor.formatOnSave":!0};return e==="biome"?(t["editor.defaultFormatter"]="biomejs.biome",t["editor.codeActionsOnSave"]={"quickfix.biome":"explicit"}):e==="eslint"&&(t["editor.defaultFormatter"]="dbaeumer.vscode-eslint",t["eslint.format.enable"]=!0,t["editor.codeActionsOnSave"]={"source.fixAll.eslint":!0}),t}function se(e,t){return o(this,null,function*(){let n=k.resolve(e,".vscode"),i=k.resolve(n,"settings.json");yield c("Setting up VS Code settings",[{text:"Creating .vscode folder",action:()=>o(this,null,function*(){y.existsSync(n)||y.mkdirSync(n,{recursive:!0})})},{text:"Creating VS Code settings.json",action:()=>o(this,null,function*(){y.writeFileSync(i,JSON.stringify(ie(t),null,2),"utf-8")})}])})}import*as E from"path";import*as v from"fs";var re=`
# SUPABASE API KEYS
EXPO_PUBLIC_URL_IPHONE=
EXPO_PUBLIC_URL_ANDROID=
EXPO_PUBLIC_API_ANON_KEY=
`,ae=[".env.example",".env.development",".env.test",".env.production"],ce={"android:dev":"NODE_ENV=dev npx expo run:android","ios:dev":"NODE_ENV=dev npx expo run:ios","android:stage":"NODE_ENV=test npx expo run:android","ios:stage":"NODE_ENV=test npx expo run:ios","android:prod":"NODE_ENV=production npx expo run:android","ios:prod":"NODE_ENV=production npx expo run:ios"},pe=["ios","web","android"],le=`
# ===============================
# Makefile for managing Expo commands
# ===============================

# Define environment variables for clarity
NODE_ENV_DEV = development
NODE_ENV_STAGE = test
NODE_ENV_PROD = production

# Define common commands
EXPO_RUN_IOS = npx expo run:ios
EXPO_RUN_ANDROID = npx expo run:android

# ===============================
# Default target
# ===============================
# This is the default goal when no specific target is provided to 'make'
.DEFAULT_GOAL := help

# ===============================
# Help command - Displays all available commands
# ===============================
help:
	@echo "Makefile for running Expo commands"
	@echo ""
	@echo "Available targets:"
	@echo "  install        - Run the command npm install"
	@echo "  ios_dev       - Run iOS app in dev mode"
	@echo "  android_dev   - Run Android app in dev mode"
	@echo "  ios_stage     - Run iOS app in stage mode"
	@echo "  android_stage - Run Android app in stage mode"
	@echo "  ios_prod      - Run iOS app in prod mode"
	@echo "  android_prod  - Run Android app in prod mode"
	@echo ""
	@echo "Set NODE_ENV to control the environment for each command."


# ===============================
# Project Commands
# ===============================
#This target runs an intallation of the package.json
install:
	npm install

# ===============================
# iOS Commands
# ===============================
# This target runs the iOS app in development mode
ios_dev:
	@echo "Running iOS in development mode..."
	$(MAKE) install
	@NODE_ENV=$(NODE_ENV_DEV) $(EXPO_RUN_IOS)

# This target runs the iOS app in staging mode
ios_stage:
	@echo "Running iOS in staging mode..."
	$(MAKE) install
	@NODE_ENV=$(NODE_ENV_STAGE) $(EXPO_RUN_IOS)

# This target runs the iOS app in production mode
ios_prod:
	@echo "Running iOS in production mode..."
	$(MAKE) install
	@NODE_ENV=$(NODE_ENV_PROD) $(EXPO_RUN_IOS)


# ===============================
# Android Commands
# ===============================
# This target runs the Android app in development mode
android_dev:
	@echo "Running Android in development mode..."
	$(MAKE) install
	@NODE_ENV=$(NODE_ENV_DEV) $(EXPO_RUN_ANDROID)

# This target runs the Android app in staging mode
android_stage:
	@echo "Running Android in staging mode..."
	$(MAKE) install
	@NODE_ENV=$(NODE_ENV_STAGE) $(EXPO_RUN_ANDROID)

# This target runs the Android app in production mode
android_prod:
	@echo "Running Android in production mode..."
	$(MAKE) install
	@NODE_ENV=$(NODE_ENV_PROD) $(EXPO_RUN_ANDROID)
`;function me(e){return o(this,null,function*(){let t=E.resolve(e,"makefile");yield c("Setting up .env",[{text:"Creating Env File",action:()=>o(this,null,function*(){for(let i of ae){let s=E.resolve(e,i);v.writeFileSync(s,re,"utf-8")}})},{text:"Generating new scripts in package.json",action:()=>o(this,null,function*(){let i=E.resolve(e,"package.json"),s=JSON.parse(v.readFileSync(i,"utf-8"));for(let p of pe)delete s.scripts[p];s.scripts=S(S({},s.scripts),ce),v.writeFileSync(i,JSON.stringify(s,null,2),"utf-8")})},{text:"Generating makefile",action:()=>o(this,null,function*(){v.writeFileSync(t,le,"utf-8")})}])})}function de(e,t){return o(this,null,function*(){let n=[{name:"Updating .gitignore",action:M},{name:"Setting up i18n",action:K},{name:"Setting up folder structure and aliases",action:$},{name:"Setting up vscode settings",action:()=>se(e,t)},{name:"Setting up .env",action:()=>me(e)}];if(t==="prettier-eslint")n.push({name:"Setting up Prettier",action:()=>Y(e)},{name:"Setting up ESLint",action:()=>L(e)});else if(t==="biome")n.push({name:"Setting up Biome",action:ne});else throw new Error("Unknown formatter choice.");for(let i of n)try{yield i.action(e)}catch(s){throw new Error(`"Error creating Expo app during ${Ce.yellow(i.name)}: ${s}`)}})}import Fe from"inquirer";import*as ue from"path";import*as ge from"fs";function fe(e){let t=e.trim();return t?/\s/.test(t)?"App name cannot contain spaces.":/[^a-zA-Z0-9]/.test(t)?"App name cannot contain special characters.":/[áàäâãåæçéèëêíìïîóòöôõøúùüûýÿ]/i.test(t)?"App name cannot contain accented characters.":!0:"App name cannot be empty."}function xe(){return o(this,null,function*(){return Fe.prompt([{type:"input",name:"appName",message:"What is the name of your new Mobile App?",validate:e=>fe(e)},{type:"input",name:"appPath",message:"Where do you want to create your new Mobile App? (Provide full path)",default:process.cwd(),validate:e=>{let t=ue.resolve(e.trim());return ge.existsSync(t)?!0:"Provided path does not exist."}}])})}import Re from"inquirer";function he(){return o(this,null,function*(){let e=[{name:"Prettier + ESLint",value:"prettier-eslint"},{name:"Biome",value:"biome"}],{formatterChoice:t}=yield Re.prompt([{type:"list",name:"formatterChoice",message:"Which formatting tool do you want to use?",choices:e}]);return{formatterChoice:t}})}function ye(){return o(this,null,function*(){let{appName:e,appPath:t}=yield xe(),{formatterChoice:n}=yield he(),i=A(e,t);yield C(i),yield de(i,n)})}import je from"chalk";function De(){return new Promise(()=>{N(),ye()})}De().then(()=>{console.log("App ran successfully.")}).catch(e=>{console.error(je.red("An error occurred:"),e)});
