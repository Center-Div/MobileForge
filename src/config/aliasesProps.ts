export const srcFolders = [
  "components",
  "context",
  "hooks",
  "navigation",
  "screens",
  "utils",
  "clients",
];

export const babelConfigContent = `
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
`;

export const aliasesPath = {
  "@assets/*": ["src/assets/*"],
  "@components/*": ["src/components/*"],
  "@context/*": ["src/context/*"],
  "@hooks/*": ["src/hooks/*"],
  "@navigation/*": ["src/navigation/*"],
  "@screens/*": ["src/screens/*"],
  "@utils/*": ["src/utils/*"],
};

export const indexContent = `
import { registerRootComponent } from "expo";
import App from "./src/App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
`;
