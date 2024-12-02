import * as path from "path";
import * as fs from "fs";
import {
  envFile,
  envFileToCreate,
  makefileContent,
  newScriptsPackage,
  scritpsPackageRemove,
} from "@config/envProps";
import { runTaskWithSubtasks } from "@utils/executingTasks";

export async function setupEnv(appPath: string): Promise<void> {
  const makefileFilePath = path.resolve(appPath, "makefile");

  const subtasks = [
    {
      text: "Creating Env File",
      action: async () => {
        for (const fileName of envFileToCreate) {
          const envFilePath = path.resolve(appPath, fileName);
          fs.writeFileSync(envFilePath, envFile, "utf-8");
        }
      },
    },
    {
      text: "Generating new scripts in package.json",
      action: async () => {
        const packageJsonPath = path.resolve(appPath, "package.json");
        const packageJson = JSON.parse(
          fs.readFileSync(packageJsonPath, "utf-8")
        );

        for (const script of scritpsPackageRemove) {
          delete packageJson.scripts[script];
        }

        packageJson.scripts = {
          ...packageJson.scripts,
          ...newScriptsPackage,
        };
        fs.writeFileSync(
          packageJsonPath,
          JSON.stringify(packageJson, null, 2),
          "utf-8"
        );
      },
    },
    {
      text: "Generating makefile",
      action: async () => {
        fs.writeFileSync(makefileFilePath, makefileContent, "utf-8");
      },
    },
  ];

  await runTaskWithSubtasks("Setting up .env", subtasks);
}
