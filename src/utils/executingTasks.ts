import ora from "ora";
import chalk from "chalk";

/**
 * A helper function that runs a task with multiple subtasks, showing progress for each.
 * @param mainTask - The main task text that will be displayed.
 * @param subtasks - An array of subtasks with a text and action function.
 */
export async function runTaskWithSubtasks(
  mainTask: string,
  subtasks: { text: string; action: () => Promise<void> }[]
): Promise<void> {
  console.log(`${chalk.cyan(mainTask)}...`);

  const subtaskPromises = subtasks.map(async (subtask) => {
    const subtaskSpinner = ora({
      text: `${chalk.yellow("|___")} ${subtask.text}`,
      color: "yellow",
    }).start();

    try {
      await subtask.action();
      subtaskSpinner.succeed(`${chalk.yellow("|___")} ${subtask.text}`);
    } catch (error) {
      subtaskSpinner.fail(`${chalk.yellow("|___")} ${chalk.red(subtask.text)}`);
      // Print the error with the subtask name
      throw new Error(
        `Stopping due to failure in subtask: ${chalk.red(subtask.text)}`
      );
    }
  });

  try {
    await Promise.all(subtaskPromises); // Execute all subtasks concurrently
    console.log(`${mainTask} ${chalk.green("completed successfully!")}\n`);
  } catch (error) {
    throw error;
  }
}
