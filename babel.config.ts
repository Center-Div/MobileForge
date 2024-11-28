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
            "@commands": "./commands",
            "@config": "./config",
            "@tasks": "./tasks",
            "@cli": "./cli",
            "@utils": "./utils",
          },
        },
      ],
    ],
  };
};
