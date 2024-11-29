import inquirer from "inquirer";
import * as path from "path";
import * as fs from "fs";
import { validateAppName } from "@utils/validateAppName";

/**
 * Prompts the user for Expo app details.
 * @returns {Promise<{ appName: string; appPath: string }>} The app name and path.
 */

export async function forgeAppDetails(): Promise<{
  appName: string;
  appPath: string;
}> {
  return inquirer.prompt([
    {
      type: "input",
      name: "appName",
      message: "What is the name of your new Mobile App?",
      validate: (input) => validateAppName(input),
    },
    {
      type: "input",
      name: "appPath",
      message:
        "Where do you want to create your new Mobile App? (Provide full path)",
      default: process.cwd(),
      validate: (input) => {
        const resolvedPath = path.resolve(input.trim());
        return fs.existsSync(resolvedPath)
          ? true
          : "Provided path does not exist.";
      },
    },
  ]);
}
