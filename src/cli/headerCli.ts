import chalk from "chalk"; // For colored text

export function displayHeader() {
  const flames = chalk.red("🔥");
  const title = chalk.bold.hex("#FFA500")(" Mobile Forge Active ");
  const message = chalk.gray(" Ready to forge a new app!\n");

  console.clear(); // Clear terminal for a clean look
  console.log(`${flames} ${title} ${flames}`);
  console.log(message);
  console.log(chalk.gray("------------------------------------------\n"));
}
