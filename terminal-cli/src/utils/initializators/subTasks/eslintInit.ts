import * as fs from "fs";
import * as path from "path";
import { eslintFile, eslintPackages } from "src/utils/props/eslintProps";
import { execPromise } from "src/utils/fonctions/execPromise";
import { runTaskWithSubtasks } from "src/utils/fonctions/executingTasks";

/**
 * Sets up ESLint configuration in the specified application path.
 * @param appPath - The absolute path to the application directory.
 */

export async function setupEslint(appPath: string): Promise<void> {
  const eslintFilePath = path.resolve(appPath, "eslint.config.mjs");

  const subtasks = [
    {
      text: "Installing ESLint dependencies",
      action: async () => {
        const installCommand = `npm install --save-dev ${eslintPackages}`;
        await execPromise(installCommand, appPath);
      },
    },
    {
      text: "Creating ESLint configuration",
      action: async () => {
        fs.writeFileSync(eslintFilePath, eslintFile, "utf-8");
      },
    },
    {
      text: "Running ESLint with --fix",
      action: async () => {
        const eslintCommand = "npx eslint . --fix";
        await execPromise(eslintCommand, appPath);
      },
    },
  ];

  await runTaskWithSubtasks("Setting up ESLint", subtasks);
}
