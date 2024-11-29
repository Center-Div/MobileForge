import { cleaningPath } from "src/utils/cleaningPath";
import { forgeExpoApp } from "./forgeExpoApp";
import { forgeSetup } from "./forgeSetup";
import { forgeAppDetails } from "@cli/forgeAppDetails";
import { forgeSetupsSelection } from "@cli/forgeSetupsSelection";

export async function forgeNewApp(): Promise<void> {
  const { appName, appPath } = await forgeAppDetails();
  const { formatterChoice } = await forgeSetupsSelection();
  const fullPath = cleaningPath(appName, appPath);
  await forgeExpoApp(fullPath);
  await forgeSetup(fullPath, formatterChoice);
}
