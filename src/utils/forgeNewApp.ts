import { cleaningPath } from "@fonctions/cleaningPath";
import { forgeExpoApp } from "@inits/forgeExpoApp";
import { forgeSetup } from "@inits/forgeSetup";
import { promptAppDetails } from "@inputs/forgeInputs";

export async function forgeNewApp(): Promise<void> {
  const { appName, appPath } = await promptAppDetails();
  const fullPath = cleaningPath(appName, appPath);
  await forgeExpoApp(fullPath);
  await forgeSetup(fullPath);
}
