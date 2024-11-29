import * as fs from "fs";
import * as path from "path";
import { execPromise } from "@utils/execPromise"; // Assuming we use execPromise for async exec tasks
import { runTaskWithSubtasks } from "@utils/executingTasks";
import { getVscodeSettings } from "@config/vscodeProps";

/**
 * Creates the .vscode folder and a settings.json file inside the specified application path.
 * @param appPath - The absolute path to the application directory.
 */
export async function vscodeSetup(
  appPath: string,
  formatterChoice: string
): Promise<void> {
  const vscodeFolderPath = path.resolve(appPath, ".vscode");
  const settingsFilePath = path.resolve(vscodeFolderPath, "settings.json");

  const createFolderSubtask = {
    text: "Creating .vscode folder",
    action: async () => {
      if (!fs.existsSync(vscodeFolderPath)) {
        fs.mkdirSync(vscodeFolderPath, { recursive: true });
      }
    },
  };

  const createSettingsFileSubtask = {
    text: "Creating VS Code settings.json",
    action: async () => {
      fs.writeFileSync(
        settingsFilePath,
        JSON.stringify(getVscodeSettings(formatterChoice), null, 2),
        "utf-8"
      );
    },
  };

  const subtasks = [createFolderSubtask, createSettingsFileSubtask];

  await runTaskWithSubtasks("Setting up VS Code settings", subtasks);
}
