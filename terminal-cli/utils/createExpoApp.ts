import { exec } from "child_process";
import chalk from "chalk";
import ora from "ora";
import path from "path";
import { promisify } from "util";
import { setupI18n } from "@inits/i18nInit";
import { setupEslint } from "@inits/eslintInit";
import { applyGitIgnoreChanges } from "@inits/gitignoreUpdater";
import { setupPrettier } from "@inits/prettierInit";
import { promptAppDetails } from "@inputs/forgeInputs";

const execPromise = promisify(exec);
export async function createExpoApp(): Promise<void> {
  try {
    const { appName, appPath } = await promptAppDetails();

    // Prepare paths
    const sanitizedAppName = appName.trim();
    const sanitizedAppPath = path.resolve(appPath.trim());
    const fullPath = path.join(sanitizedAppPath, sanitizedAppName);

    // Spinner setup for creating the app
    const spinner = ora({
      text: "Creating a new Expo app...",
      color: "cyan",
    }).start();

    try {
      // Run the Expo app creation command
      await execPromise(
        `npx create-expo-app@latest "${fullPath}" --template blank-typescript`
      );
      spinner.succeed("Expo app created successfully!\n");
    } catch (error) {
      spinner.fail("Failed to create the Expo app.");
      console.error(chalk.red("Error creating Expo app:"), error);
      return;
    }

    // Apply additional configurations
    const setupTasks = [
      { name: "Updating .gitignore", action: applyGitIgnoreChanges },
      { name: "Setting up Prettier", action: setupPrettier },
      { name: "Setting up i18n", action: setupI18n },
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
  } catch (error) {
    console.error(chalk.red("An unexpected error occurred:"), error);
  }
}
