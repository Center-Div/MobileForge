import { runTaskWithSubtasks } from "@fonctions/executingTasks";
import { gitignoreFile } from "@props/gitignoreProps";
import * as fs from "fs";

/**
 * Applies changes to the .gitignore file.
 * @param path - The absolute path where the .gitignore file should be updated.
 */

export async function applyGitIgnoreChanges(path: string): Promise<void> {
  const subtasks = [
    {
      text: "Writing .gitignore content",
      action: async () => {
        fs.writeFileSync(`${path}/.gitignore`, gitignoreFile, "utf8");
      },
    },
  ];

  await runTaskWithSubtasks("Updating .gitignore file", subtasks);
}
