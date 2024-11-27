import chalk from "chalk";
import { setupSrcFolder } from "./subTasks/aliasesInit";
import { setupEslint } from "./subTasks/eslintInit";
import { applyGitIgnoreChanges } from "./subTasks/gitignoreUpdater";
import { setupI18n } from "./subTasks/i18nInit";
import { setupPrettier } from "./subTasks/prettierInit";

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
      return;
    }
  }
}
