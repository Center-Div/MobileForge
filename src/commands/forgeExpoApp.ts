import { execPromise } from "src/utils/execPromise";
import { promisify } from "util";
import chalk from "chalk";
import ora from "ora";
import { exec } from "child_process";

export async function forgeExpoApp(fullPath: string) {
  const execPromise = promisify(exec);
  const spinner = ora({
    text: "Forging a new Expo app...",
    color: "cyan",
  }).start();

  try {
    // Run the Expo app creation command
    await execPromise(
      `npx create-expo-app@latest "${fullPath}" --template blank-typescript`
    );
    spinner.succeed("Expo app created successfully!\n");
  } catch (error) {
    spinner.fail("Failed to forge the Expo app.\n");
    throw new Error(`${chalk.yellow(error)}`);
  }
}
