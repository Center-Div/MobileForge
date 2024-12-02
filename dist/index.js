#!/usr/bin/env node
var me = Object.defineProperty,
  fe = Object.defineProperties;
var ue = Object.getOwnPropertyDescriptors;
var v = Object.getOwnPropertySymbols;
var ge = Object.prototype.hasOwnProperty,
  de = Object.prototype.propertyIsEnumerable;
var k = (e, t, o) =>
    t in e
      ? me(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o })
      : (e[t] = o),
  w = (e, t) => {
    for (var o in t || (t = {})) ge.call(t, o) && k(e, o, t[o]);
    if (v) for (var o of v(t)) de.call(t, o) && k(e, o, t[o]);
    return e;
  },
  P = (e, t) => fe(e, ue(t));
var n = (e, t, o) =>
  new Promise((i, r) => {
    var l = (a) => {
        try {
          g(o.next(a));
        } catch (f) {
          r(f);
        }
      },
      u = (a) => {
        try {
          g(o.throw(a));
        } catch (f) {
          r(f);
        }
      },
      g = (a) => (a.done ? i(a.value) : Promise.resolve(a.value).then(l, u));
    g((o = o.apply(e, t)).next());
  });
import b from "chalk";
function C() {
  let e = b.red("\u{1F525}"),
    t = b.bold.hex("#FFA500")(" Mobile Forge Active "),
    o = b.gray(` Ready to forge a new app!
`);
  console.clear(),
    console.log(`${e} ${t} ${e}`),
    console.log(o),
    console.log(
      b.gray(`------------------------------------------
`),
    );
}
import j from "path";
function F(e, t) {
  let o = e.trim(),
    i = j.resolve(t.trim());
  return j.join(i, o);
}
import { promisify as xe } from "util";
import ye from "chalk";
import he from "ora";
import { exec as be } from "child_process";
function A(e) {
  return n(this, null, function* () {
    let t = xe(be),
      o = he({ text: "Forging a new Expo app...", color: "cyan" }).start();
    try {
      yield t(`npx create-expo-app@latest "${e}" --template blank-typescript`),
        o.succeed(`Expo app created successfully!
`);
    } catch (i) {
      throw (
        (o.fail(`Failed to forge the Expo app.
`),
        new Error(`${ye.yellow(i)}`))
      );
    }
  });
}
import * as s from "fs";
import * as m from "path";
var E = ["components", "context", "hooks", "navigation", "screens", "utils"],
  $ = `
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
`,
  I = {
    "@assets/*": ["src/assets/*"],
    "@components/*": ["src/components/*"],
    "@context/*": ["src/context/*"],
    "@hooks/*": ["src/hooks/*"],
    "@navigation/*": ["src/navigation/*"],
    "@screens/*": ["src/screens/*"],
    "@utils/*": ["src/utils/*"],
  },
  R = `
import { registerRootComponent } from "expo";
import App from "./src/App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
`;
import Se from "ora";
import d from "chalk";
function c(e, t) {
  return n(this, null, function* () {
    console.log(`${d.cyan(e)}...`);
    try {
      for (let o = 0; o < t.length; o++) {
        let i = t[o],
          r = Se({
            text: `${d.yellow("|___")} ${i.text}`,
            color: "yellow",
          }).start();
        try {
          yield i.action(), r.succeed(`${d.yellow("|___")} ${i.text}`);
        } catch (l) {
          throw (
            (r.fail(`${d.yellow("|___")} ${d.red(i.text)}`),
            console.error("Error:", l),
            new Error("Stopping due to failure in subtask."))
          );
        }
      }
      console.log(`${e} ${d.green("completed successfully!")}
`);
    } catch (o) {
      console.log(`${d.red(e)} failed.
`),
        console.error("Error:", o);
    }
  });
}
function L(e) {
  return n(this, null, function* () {
    let t = m.join(e, "src"),
      o = m.join(e, "App.tsx"),
      i = m.join(t, "App.tsx"),
      r = m.join(e, "babel.config.ts"),
      l = m.join(e, "tsconfig.json"),
      u = m.join(e, "index.ts");
    yield c("Setting up folder structure and aliases", [
      {
        text: "Creating `src` folder and subfolders",
        action: () =>
          n(this, null, function* () {
            s.existsSync(t) || s.mkdirSync(t);
            for (let a of E) {
              let f = m.join(t, a);
              s.existsSync(f) || s.mkdirSync(f);
            }
          }),
      },
      {
        text: "Moving App.tsx to `src` folder",
        action: () =>
          n(this, null, function* () {
            s.existsSync(o) && s.renameSync(o, i);
          }),
      },
      {
        text: "Moving existing `assets` folder into `src`",
        action: () =>
          n(this, null, function* () {
            let a = m.join(e, "assets"),
              f = m.join(t, "assets");
            s.existsSync(a) && s.renameSync(a, f);
          }),
      },
      {
        text: "Updating `index.ts` to reference `src/App`",
        action: () =>
          n(this, null, function* () {
            s.writeFileSync(u, R.trim());
          }),
      },
      {
        text: "Creating and configuring `babel.config.ts`",
        action: () =>
          n(this, null, function* () {
            s.writeFileSync(r, $.trim());
          }),
      },
      {
        text: "Updating `tsconfig.json` with path aliases",
        action: () =>
          n(this, null, function* () {
            let a = JSON.parse(s.readFileSync(l, "utf-8"));
            (a.compilerOptions = P(w({}, a.compilerOptions), {
              baseUrl: "./",
              paths: I,
            })),
              s.writeFileSync(l, JSON.stringify(a, null, 2));
          }),
      },
    ]);
  });
}
import * as T from "fs";
import * as O from "path";
var W = [
    "eslint",
    "prettier",
    "eslint-plugin-prettier",
    "eslint-config-prettier",
    "globals",
    "@eslint/js",
    "typescript-eslint",
    "eslint-plugin-react",
    "eslint-plugin-react-native",
  ].join(" "),
  N = `import globals from "globals";
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
  `;
import { exec as ve } from "child_process";
function p(e, t) {
  return new Promise((o, i) => {
    ve(e, { cwd: t }, (r, l, u) => {
      if (r)
        throw (i(`Error executing command: ${u || r.message}`), new Error());
      o(l);
    });
  });
}
function _(e) {
  return n(this, null, function* () {
    let t = O.resolve(e, "eslint.config.mjs");
    yield c("Setting up ESLint", [
      {
        text: "Installing ESLint dependencies",
        action: () =>
          n(this, null, function* () {
            let i = `npm install --save-dev ${W}`;
            yield p(i, e);
          }),
      },
      {
        text: "Creating ESLint configuration",
        action: () =>
          n(this, null, function* () {
            T.writeFileSync(t, N, "utf-8");
          }),
      },
      {
        text: "Running ESLint with --fix",
        action: () =>
          n(this, null, function* () {
            yield p("npx eslint . --fix", e);
          }),
      },
    ]);
  });
}
var z = `
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
`;
import * as B from "fs";
function J(e) {
  return n(this, null, function* () {
    yield c("Updating .gitignore file", [
      {
        text: "Writing .gitignore content",
        action: () =>
          n(this, null, function* () {
            B.writeFileSync(`${e}/.gitignore`, z, "utf8");
          }),
      },
    ]);
  });
}
import * as y from "path";
import * as x from "fs";
var U = [
    "i18next",
    "react-i18next",
    "expo-localization",
    "@types/react-i18next",
  ].join(" "),
  V = `import i18n from 'i18next';
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
`,
  q = `{
  "welcome": "Welcome",
  "description": "This is an example app."
}`,
  M = `{
  "welcome": "Bienvenue",
  "description": "Ceci est une application exemple."
}`;
function D(e) {
  return n(this, null, function* () {
    let t = y.resolve(e, "src", "i18n"),
      o = y.resolve(t, "locales"),
      i = y.resolve(t, "i18n.ts"),
      r = y.resolve(o, "en.json"),
      l = y.resolve(o, "fr.json");
    yield c("Setting up i18n", [
      {
        text: "Installing i18n dependencies",
        action: () =>
          n(this, null, function* () {
            let g = `npm install ${U}`;
            yield p(g, e);
          }),
      },
      {
        text: "Creating i18n folder structure",
        action: () =>
          n(this, null, function* () {
            x.mkdirSync(t, { recursive: !0 }),
              x.mkdirSync(o, { recursive: !0 });
          }),
      },
      {
        text: "Adding translation files",
        action: () =>
          n(this, null, function* () {
            x.writeFileSync(r, q), x.writeFileSync(l, M);
          }),
      },
      {
        text: "Creating i18n configuration file",
        action: () =>
          n(this, null, function* () {
            x.writeFileSync(i, V);
          }),
      },
      {
        text: "Installing i18n Ally VS Code extension",
        action: () =>
          n(this, null, function* () {
            yield p("code --install-extension lokalise.i18n-ally", e);
          }),
      },
    ]);
  });
}
import * as H from "fs";
import * as Q from "path";
var G = {
  arrowParens: "always",
  bracketSpacing: !0,
  jsxSingleQuote: !1,
  quoteProps: "as-needed",
  singleQuote: !1,
  semi: !0,
  printWidth: 100,
  trailingComma: "es5",
};
function K(e) {
  return n(this, null, function* () {
    let t = Q.resolve(e, ".prettierrc");
    yield c("Setting up Prettier", [
      {
        text: "Writing Prettier configuration file",
        action: () =>
          n(this, null, function* () {
            H.writeFileSync(t, JSON.stringify(G, null, 2), "utf-8");
          }),
      },
    ]);
  });
}
import * as Y from "fs";
import * as ee from "path";
var Z = ["@biomejs/biome"].join(" "),
  X = `{
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
`;
function te(e) {
  return n(this, null, function* () {
    let t = ee.resolve(e, "biome.json");
    yield c("Setting up Biome", [
      {
        text: "Installing Biome dependencies",
        action: () =>
          n(this, null, function* () {
            let i = `npm install --save-dev ${Z}`;
            yield p(i, e);
          }),
      },
      {
        text: "Running Biome initialization",
        action: () =>
          n(this, null, function* () {
            yield p("npx @biomejs/biome init", e);
          }),
      },
      {
        text: "Installing Biome VS Code extension",
        action: () =>
          n(this, null, function* () {
            yield p("code --install-extension biomejs.biome", e);
          }),
      },
      {
        text: "Updating biome.json configuration",
        action: () =>
          n(this, null, function* () {
            Y.writeFileSync(t, X);
          }),
      },
      {
        text: "Running Biome formatting",
        action: () =>
          n(this, null, function* () {
            yield p("npx @biomejs/biome check --write", e);
          }),
      },
    ]);
  });
}
import * as h from "fs";
import * as S from "path";
function oe(e) {
  let t = {
    "i18n-ally.localesPaths": ["src/i18n/locales"],
    "i18n-ally.keystyle": "nested",
    "i18n-ally.sourceLanguage": "fr",
    "editor.formatOnSave": !0,
  };
  return (
    e === "biome"
      ? ((t["editor.defaultFormatter"] = "biomejs.biome"),
        (t["editor.codeActionsOnSave"] = { "quickfix.biome": "explicit" }))
      : e === "eslint" &&
        ((t["editor.defaultFormatter"] = "dbaeumer.vscode-eslint"),
        (t["eslint.format.enable"] = !0),
        (t["editor.codeActionsOnSave"] = { "source.fixAll.eslint": !0 })),
    t
  );
}
function ne(e, t) {
  return n(this, null, function* () {
    let o = S.resolve(e, ".vscode"),
      i = S.resolve(o, "settings.json");
    yield c("Setting up VS Code settings", [
      {
        text: "Creating .vscode folder",
        action: () =>
          n(this, null, function* () {
            h.existsSync(o) || h.mkdirSync(o, { recursive: !0 });
          }),
      },
      {
        text: "Creating VS Code settings.json",
        action: () =>
          n(this, null, function* () {
            h.writeFileSync(i, JSON.stringify(oe(t), null, 2), "utf-8");
          }),
      },
    ]);
  });
}
function ie(e, t) {
  return n(this, null, function* () {
    let o = [
      { name: "Updating .gitignore", action: J },
      { name: "Setting up i18n", action: D },
      { name: "Setting up folder structure and aliases", action: L },
      { name: "Setting up vscode settings", action: () => ne(e, t) },
    ];
    if (t === "prettier-eslint")
      o.push(
        { name: "Setting up Prettier", action: K },
        { name: "Setting up ESLint", action: _ },
      );
    else if (t === "biome") o.push({ name: "Setting up Biome", action: te });
    else throw new Error("Unknown formatter choice.");
    for (let i of o)
      try {
        yield i.action(e);
      } catch (r) {
        throw new Error(`"Error creating Expo app during ${i.name}: ${r}`);
      }
  });
}
import ke from "inquirer";
import * as re from "path";
import * as ae from "fs";
function se(e) {
  let t = e.trim();
  return t
    ? /\s/.test(t)
      ? "App name cannot contain spaces."
      : /[^a-zA-Z0-9]/.test(t)
        ? "App name cannot contain special characters."
        : /[áàäâãåæçéèëêíìïîóòöôõøúùüûýÿ]/i.test(t)
          ? "App name cannot contain accented characters."
          : !0
    : "App name cannot be empty.";
}
function ce() {
  return n(this, null, function* () {
    return ke.prompt([
      {
        type: "input",
        name: "appName",
        message: "What is the name of your new Mobile App?",
        validate: (e) => se(e),
      },
      {
        type: "input",
        name: "appPath",
        message:
          "Where do you want to create your new Mobile App? (Provide full path)",
        default: process.cwd(),
        validate: (e) => {
          let t = re.resolve(e.trim());
          return ae.existsSync(t) ? !0 : "Provided path does not exist.";
        },
      },
    ]);
  });
}
import we from "inquirer";
function le() {
  return n(this, null, function* () {
    let { formatterChoice: e } = yield we.prompt([
      {
        type: "list",
        name: "formatterChoice",
        message: "Which formatting tool do you want to use?",
        choices: [
          { name: "Prettier + ESLint", value: "prettier-eslint" },
          { name: "Biome", value: "biome" },
        ],
      },
    ]);
    return { formatterChoice: e };
  });
}
function pe() {
  return n(this, null, function* () {
    let { appName: e, appPath: t } = yield ce(),
      { formatterChoice: o } = yield le(),
      i = F(e, t);
    yield A(i), yield ie(i, o);
  });
}
import Pe from "chalk";
function Ce() {
  return new Promise(() => {
    C(), pe();
  });
}
Ce()
  .then(() => {
    console.log("App ran successfully.");
  })
  .catch((e) => {
    console.error(Pe.red("An error occurred:"), e);
  });
