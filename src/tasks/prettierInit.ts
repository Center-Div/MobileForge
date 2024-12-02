import * as fs from "fs";
import * as path from "path";
import { prettierConfig } from "@config/prettierProps";
import { runTaskWithSubtasks } from "@utils/executingTasks";

/**
 * Sets up Prettier configuration for the application.
 * @param appPath - The absolute path to the application directory.
 */

export async function setupPrettier(appPath: string): Promise<void> {
  const prettierConfigPath = path.resolve(appPath, ".prettierrc");

  // Define subtasks for setting up Prettier
  const subtasks = [
    {
      text: "Writing Prettier configuration file",
      action: async () => {
        fs.writeFileSync(
          prettierConfigPath,
          JSON.stringify(prettierConfig, null, 2),
          "utf-8",
        );
      },
    },
  ];

  await runTaskWithSubtasks("Setting up Prettier", subtasks);
}
