import fs from "fs";
import path from "path";
import chalk from "chalk";
import ora from "ora";

export function setupPrettier(appPath: string) {
  const prettierConfig = {
    arrowParens: "always",
    bracketSpacing: true,
    jsxSingleQuote: false,
    quoteProps: "as-needed",
    singleQuote: false,
    semi: true,
    printWidth: 100,
    trailingComma: "es5",
  };

  const prettierConfigPath = path.join(appPath, ".prettierrc");
  const eslintConfigPath = path.join(appPath, "eslint.config.mjs");

  // Step 1: Set up Prettier configuration file (.prettierrc)
  const prettierSpinner = ora({
    text: "Setting up Prettier...",
    color: "yellow",
  }).start();

  try {
    fs.writeFileSync(
      prettierConfigPath,
      JSON.stringify(prettierConfig, null, 2),
      "utf-8"
    );
    prettierSpinner.succeed("Prettier configuration has been created.");
  } catch (error) {
    prettierSpinner.fail("Failed to create Prettier configuration.");
    console.error(chalk.red("Error:"), error);
    return;
  }
}
