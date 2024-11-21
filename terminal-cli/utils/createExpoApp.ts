import inquirer from "inquirer";
import { exec } from "child_process";
import chalk from "chalk";
import ora from "ora";
import { applyGitIgnoreChanges } from "./initializators/gitignoreUpdater.ts";
import { setupPrettier } from "./initializators/prettierInit.ts";
import { setupEslint } from "./initializators/eslintInit.ts";
import path from "path";

export function createExpoApp() {
  const currentDir = process.cwd();
  const parentDir = path.dirname(currentDir);

  inquirer
    .prompt([
      {
        type: "input",
        name: "appName",
        message: "What is the name of your new Expo app?",
      },
      {
        type: "input",
        name: "appPath",
        message:
          "Where do you want to create your new Expo app? (Provide full path)",
        default: parentDir,
      },
    ])
    .then(({ appName }) => {
      const sanitizedAppPath = parentDir.trim(); // Use the parent directory path
      const sanitizedAppName = appName.trim();
      const fullPath = `${sanitizedAppPath}/${sanitizedAppName}`;
      const command = `npx create-expo-app@latest "${fullPath}" --template blank-typescript`;

      // Spinner setup
      const spinner = ora({
        text: "Creating a new Expo app...",
        color: "cyan",
      }).start();

      // Run the command to create the Expo app
      exec(command, (error) => {
        if (error) {
          spinner.fail("Failed to create the Expo app.");
          console.error(
            chalk.red("An error occurred while creating the Expo app:"),
            error
          );
          return;
        }

        spinner.succeed("Expo app created successfully!");

        // Apply the .gitignore changes
        applyGitIgnoreChanges(fullPath);
        setupPrettier(fullPath);
        setupEslint(fullPath);
      });
    })
    .catch((error) => {
      console.error(chalk.red("An error occurred:"), error);
    });
}
