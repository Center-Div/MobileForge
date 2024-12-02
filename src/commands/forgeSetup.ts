import chalk from "chalk";
import { setupSrcFolder } from "@tasks/aliasesInit";
import { setupEslint } from "@tasks/eslintInit";
import { applyGitIgnoreChanges } from "@tasks/gitignoreUpdater";
import { setupI18n } from "@tasks/i18nInit";
import { setupPrettier } from "@tasks/prettierInit";
import { setupBiome } from "@tasks/biomeInit";
import { setupVSCode } from "@tasks/vscodeInit";
import { FormatterChoice } from "src/types/inputs";
import { setupEnv } from "@tasks/envInit";

/**
 * Function to set up the app with selected options like formatter and database type.
 * @param {string} appPath - The full path where the app will be set up.
 * @param {string} formatterChoice - The chosen formatter (either "prettier-eslint" or "biome").
 */

export async function forgeSetup(
  appPath: string,
  formatterChoice: FormatterChoice,
) {
  const setupTasks = [
    { name: "Updating .gitignore", action: applyGitIgnoreChanges },
    { name: "Setting up i18n", action: setupI18n },
    {
      name: "Setting up folder structure and aliases",
      action: setupSrcFolder,
    },
    {
      name: "Setting up vscode settings",
      action: () => setupVSCode(appPath, formatterChoice),
    },
    {
      name: "Setting up .env",
      action: () => setupEnv(appPath),
    },
  ];

  if (formatterChoice === "prettier-eslint") {
    setupTasks.push(
      { name: "Setting up Prettier", action: setupPrettier },
      { name: "Setting up ESLint", action: setupEslint },
    );
  } else if (formatterChoice === "biome") {
    setupTasks.push({ name: "Setting up Biome", action: setupBiome });
  } else {
    throw new Error("Unknown formatter choice.");
  }

  for (const task of setupTasks) {
    try {
      await task.action(appPath);
    } catch (error) {
      throw new Error(
        `"Error creating Expo app during ${chalk.yellow(task.name)}: ${error}`,
      );
    }
  }
}
