module.exports = function (api: { cache: (arg0: boolean) => void }) {
  api.cache(true);
  return {
    presets: ["@babel/preset-env", "@babel/preset-typescript"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          extensions: [".js", ".ts", ".tsx", ".json"],
          alias: {
            "@props": "./utils/props",
            "@fonctions": "./utils/fonctions",
            "@inputs": "./utils/inputs",
            "@inits": "./utils/initializators",
          },
        },
      ],
    ],
  };
};
