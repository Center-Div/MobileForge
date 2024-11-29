import * as fs from "fs";
import * as path from "path";
import { execPromise } from "@utils/execPromise";
import { runTaskWithSubtasks } from "@utils/executingTasks";
import { biomeFile, biomePackages } from "@config/biomeProps";

/**
 * Sets up Biome configuration and installs the necessary packages in the specified application path.
 * @param appPath - The absolute path to the application directory.
 */

export async function setupBiome(appPath: string): Promise<void> {
  const biomeJsonPath = path.resolve(appPath, "biome.json");
  const subtasks = [
    {
      text: "Installing Biome dependencies",
      action: async () => {
        const installCommand = `npm install --save-dev ${biomePackages}`;
        await execPromise(installCommand, appPath);
      },
    },
    {
      text: "Running Biome initialization",
      action: async () => {
        const biomeInitCommand = "npx @biomejs/biome init";
        await execPromise(biomeInitCommand, appPath);
      },
    },
    {
      text: "Installing Biome VS Code extension",
      action: async () => {
        const vscodeInstallCommand = "code --install-extension biomejs.biome";
        await execPromise(vscodeInstallCommand, appPath);
      },
    },
    {
      text: "Updating biome.json configuration",
      action: async () => {
        // Write the biomeFile contents to biome.json
        fs.writeFileSync(biomeJsonPath, biomeFile);
      },
    },
    {
      text: "Running Biome formatting",
      action: async () => {
        const formatCommand = "npx @biomejs/biome check --write";
        await execPromise(formatCommand, appPath);
      },
    },
  ];

  await runTaskWithSubtasks("Setting up Biome", subtasks);
}
