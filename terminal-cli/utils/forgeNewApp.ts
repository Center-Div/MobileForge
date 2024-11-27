import chalk from "chalk";
import { promptAppDetails } from "@inputs/forgeInputs";
import { cleaningPath } from "@fonctions/cleaningPath";
import { forgeExpoApp } from "@inits/forgeExpoApp";
import { forgeSetup } from "@inits/forgeSetup";


export async function forgeNewApp(): Promise<void> {
  try {
    const { appName, appPath } = await promptAppDetails();
    const fullPath = cleaningPath(appName, appPath);
    await forgeExpoApp(fullPath);
    await forgeSetup(fullPath);
  } catch (error) {
    console.error(chalk.red("An unexpected error occurred:"), error);
  }
}
