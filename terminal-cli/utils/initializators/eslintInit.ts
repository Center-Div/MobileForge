import fs from "fs";
import path from "path";
import { exec } from "child_process";
import chalk from "chalk";
import ora from "ora";

export function setupEslint(appPath: string) {
  const eslintConfig = `import globals from "globals";
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

  const eslintConfigPath = path.join(appPath, "eslint.config.mjs");

  const installSpinner = ora({
    text: "Installing Prettier and ESLint dependencies...",
    color: "yellow",
  }).start();

  const dependencies = [
    "eslint",
    "prettier",
    "eslint-plugin-prettier",
    "eslint-config-prettier",
    "globals",
    "@eslint/js",
    "typescript-eslint",
    "eslint-plugin-react",
    "eslint-plugin-react-native",
  ];

  exec(
    `npm install --save-dev ${dependencies.join(" ")}`,
    { cwd: appPath },
    (error, stdout, stderr) => {
      if (error) {
        installSpinner.fail("Failed to install dependencies.");
        console.error(chalk.red("Error:"), stderr);
        return;
      }

      installSpinner.succeed(
        "Prettier and ESLint dependencies installed successfully."
      );

      // Step 3: Create eslint.config.mjs
      const eslintSpinner = ora({
        text: "Creating ESLint configuration...",
        color: "yellow",
      }).start();

      try {
        fs.writeFileSync(eslintConfigPath, eslintConfig, "utf-8");
        eslintSpinner.succeed(
          "ESLint configuration has been created successfully."
        );

        // Step 4: Run ESLint with --fix
        const fixSpinner = ora({
          text: "Running ESLint with --fix...",
          color: "yellow",
        }).start();

        exec(
          "npx eslint . --fix",
          { cwd: appPath },
          (error, stdout, stderr) => {
            if (error) {
              fixSpinner.fail("Failed to run ESLint with --fix.");
              console.error(chalk.red("Error:"), stderr);
              return;
            }

            fixSpinner.succeed("ESLint successfully fixed issues.");
            console.log(chalk.green(stdout));
          }
        );
      } catch (error) {
        eslintSpinner.fail("Failed to create ESLint configuration.");
        console.error(chalk.red("Error:"), error);
      }
    }
  );
}
