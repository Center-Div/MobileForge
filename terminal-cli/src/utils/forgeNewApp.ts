import chalk from "chalk";
import { promptAppDetails } from "src/utils/inputs/forgeInputs";
import { cleaningPath } from "src/utils/fonctions/cleaningPath";
import { forgeExpoApp } from "src/utils/initializators/forgeExpoApp";
import { forgeSetup } from "src/utils/initializators/forgeSetup";

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
