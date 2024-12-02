import chalk from "chalk";
import ora from "ora";

export async function runTaskWithSubtasks(
  mainTask: string,
  subtasks: { text: string; action: () => Promise<void> }[]
): Promise<void> {
  console.log(`${chalk.cyan(mainTask)}...`);

  // Using a for...of loop to ensure each subtask is awaited before starting the next
  for (const subtask of subtasks) {
    const subtaskSpinner = ora({
      text: `${chalk.yellow("|___")} ${subtask.text}`,
      color: "yellow",
    }).start();

    try {
      // Wait for the action to complete before moving on
      await subtask.action();
      subtaskSpinner.succeed(`${chalk.yellow("|___")} ${subtask.text}`);
    } catch (error) {
      subtaskSpinner.fail(`${chalk.yellow("|___")} ${chalk.red(subtask.text)}`);
      // Log and stop further execution on failure
      throw new Error(
        `Stopping due to failure in subtask: ${chalk.red(subtask.text)}`
      );
    }
  }

  console.log(`${mainTask} ${chalk.green("completed successfully!")}\n`);
}
