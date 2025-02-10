import * as path from "path";
import * as fs from "fs";

import { runTaskWithSubtasks } from "@utils/executingTasks";

/**
 * Updates all asset paths in app.json from './assets/' to './src/assets/'.
 * @param appPath - The absolute path to the application directory.
 */
export default async function updateAppJson(appPath: string): Promise<void> {
  const appJsonPath = path.resolve(appPath, "app.json");

  const subtasks = [
    {
      text: "Reading and parsing app.json",
      action: async () => {
        if (!fs.existsSync(appJsonPath)) {
          throw new Error(`app.json not found at ${appJsonPath}`);
        }
      },
    },
    {
      text: "Updating asset paths in app.json",
      action: async () => {
        const appJsonContent = fs.readFileSync(appJsonPath, "utf8");
        const appJson = JSON.parse(appJsonContent);

        // Recursive function to update asset paths
        const updatePaths = (obj: Record<string, string>) => {
          for (const key in obj) {
            if (
              typeof obj[key] === "string" &&
              obj[key].startsWith("./assets/")
            ) {
              obj[key] = obj[key].replace("./assets/", "./src/assets/");
            } else if (typeof obj[key] === "object" && obj[key] !== null) {
              updatePaths(obj[key]);
            }
          }
        };

        updatePaths(appJson);

        // Write the updated content back to app.json
        fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));
      },
    },
    {
      text: "Validating updated app.json",
      action: async () => {
        const updatedContent = fs.readFileSync(appJsonPath, "utf8");
        const appJson = JSON.parse(updatedContent);
        if (!appJson) throw new Error("Failed to parse updated app.json.");
      },
    },
  ];

  await runTaskWithSubtasks("Updating app.json asset paths", subtasks);
}
