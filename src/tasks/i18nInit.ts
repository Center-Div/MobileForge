import * as path from "path";
import * as fs from "fs";

import {
  enTranslation,
  frTranslation,
  i18nFile,
  i18nPackages,
} from "@config/i18nProps";
import { execPromise } from "@utils/execPromise";
import { runTaskWithSubtasks } from "@utils/executingTasks";

/**
 * Sets up i18n configuration for the application.
 * @param appPath - The absolute path to the application directory.
 */

export async function setupI18n(appPath: string): Promise<void> {
  const i18nFolderPath = path.resolve(appPath, "i18n");
  const localesFolderPath = path.resolve(i18nFolderPath, "locales");
  const i18nFilePath = path.resolve(i18nFolderPath, "i18n.ts");
  const enJsonPath = path.resolve(localesFolderPath, "en.json");
  const frJsonPath = path.resolve(localesFolderPath, "fr.json");

  const subtasks = [
    {
      text: "Installing i18n dependencies",
      action: async () => {
        const installCommand = `npm install ${i18nPackages}`;
        await execPromise(installCommand, appPath);
      },
    },
    {
      text: "Creating i18n folder structure",
      action: async () => {
        fs.mkdirSync(i18nFolderPath, { recursive: true });
        fs.mkdirSync(localesFolderPath, { recursive: true });
      },
    },
    {
      text: "Adding translation files",
      action: async () => {
        fs.writeFileSync(enJsonPath, enTranslation);
        fs.writeFileSync(frJsonPath, frTranslation);
      },
    },
    {
      text: "Creating i18n configuration file",
      action: async () => {
        fs.writeFileSync(i18nFilePath, i18nFile);
      },
    },
  ];

  await runTaskWithSubtasks("Setting up i18n", subtasks);
}
