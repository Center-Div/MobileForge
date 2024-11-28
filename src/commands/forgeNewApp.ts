import { cleaningPath } from "src/utils/cleaningPath";
import { promptAppDetails } from "@cli/forgeInputs";
import { forgeExpoApp } from "./forgeExpoApp";
import { forgeSetup } from "./forgeSetup";

export async function forgeNewApp(): Promise<void> {
  const { appName, appPath } = await promptAppDetails();
  const fullPath = cleaningPath(appName, appPath);
  await forgeExpoApp(fullPath);
  await forgeSetup(fullPath);
}
