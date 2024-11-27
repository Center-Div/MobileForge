import * as fs from "fs";
import * as path from "path";
import { runTaskWithSubtasks } from "src/utils/fonctions/executingTasks";
import {
  aliasesPath,
  babelConfigContent,
  indexContent,
  srcFolders,
} from "src/utils/props/aliasesProps";

/**
 * Sets up the src folder structure and configures Babel and TypeScript aliases.
 * @param appPath - The absolute path to the application directory.
 */

export async function setupSrcFolder(appPath: string): Promise<void> {
  const srcPath = path.join(appPath, "src");
  const appFilePath = path.join(appPath, "App.tsx");
  const newAppFilePath = path.join(srcPath, "App.tsx");
  const babelConfigPath = path.join(appPath, "babel.config.ts");
  const tsconfigPath = path.join(appPath, "tsconfig.json");
  const indexFilePath = path.join(appPath, "index.ts");

  const subtasks = [
    {
      text: "Creating `src` folder and subfolders",
      action: async () => {
        if (!fs.existsSync(srcPath)) {
          fs.mkdirSync(srcPath);
        }
        for (const folder of srcFolders) {
          const folderPath = path.join(srcPath, folder);
          if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
          }
        }
      },
    },
    {
      text: "Moving App.tsx to `src` folder",
      action: async () => {
        if (fs.existsSync(appFilePath)) {
          fs.renameSync(appFilePath, newAppFilePath);
        }
      },
    },
    {
      text: "Moving existing `assets` folder into `src`",
      action: async () => {
        const assetsPath = path.join(appPath, "assets");
        const newAssetsPath = path.join(srcPath, "assets");

        if (fs.existsSync(assetsPath)) {
          fs.renameSync(assetsPath, newAssetsPath);
        }
      },
    },
    {
      text: "Updating `index.ts` to reference `src/App`",
      action: async () => {
        fs.writeFileSync(indexFilePath, indexContent.trim());
      },
    },
    {
      text: "Creating and configuring `babel.config.ts`",
      action: async () => {
        fs.writeFileSync(babelConfigPath, babelConfigContent.trim());
      },
    },
    {
      text: "Updating `tsconfig.json` with path aliases",
      action: async () => {
        const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, "utf-8"));
        tsconfig.compilerOptions = {
          ...tsconfig.compilerOptions,
          baseUrl: "./",
          paths: aliasesPath,
        };
        fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
      },
    },
  ];

  await runTaskWithSubtasks(
    "Setting up folder structure and aliases",
    subtasks
  );
}
