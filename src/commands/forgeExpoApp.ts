import { promisify } from "node:util";
import chalk from "chalk";
import ora from "ora";
import { exec } from "node:child_process";

export async function forgeExpoApp(fullPath: string) {
  const execPromise = promisify(exec);
  const spinner = ora({
    text: "Forging a new Expo app...",
    color: "cyan",
  }).start();

  try {
    await execPromise(
      `npx create-expo-app@latest "${fullPath}" --template blank-typescript`
    );
    spinner.succeed("Expo app created successfully!\n");
  } catch (error) {
    spinner.fail("Failed to forge the Expo app.\n");
    throw new Error(`${chalk.yellow(error)}`);
  }
}
