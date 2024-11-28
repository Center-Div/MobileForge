import chalk from "chalk";
import { setupSrcFolder } from "@tasks/aliasesInit";
import { setupEslint } from "@tasks/eslintInit";
import { applyGitIgnoreChanges } from "@tasks/gitignoreUpdater";
import { setupI18n } from "@tasks/i18nInit";
import { setupPrettier } from "@tasks/prettierInit";

export async function forgeSetup(fullPath: string) {
  const setupTasks = [
    { name: "Updating .gitignore", action: applyGitIgnoreChanges },
    { name: "Setting up Prettier", action: setupPrettier },
    { name: "Setting up i18n", action: setupI18n },
    {
      name: "Setting up folder structure and aliases",
      action: setupSrcFolder,
    },
    { name: "Setting up ESLint", action: setupEslint },
  ];

  for (const task of setupTasks) {
    try {
      await task.action(fullPath);
    } catch (error) {
      console.error(chalk.red(`Error during ${task.name}:`), error);
      throw new Error(`"Error creating Expo app: ${error}`);
    }
  }
}
