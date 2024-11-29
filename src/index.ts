#!/usr/bin/env node
import { displayHeader } from "@cli/headerCli";
import { forgeNewApp } from "@commands/forgeNewApp";
import chalk from "chalk";

function main(): Promise<void> {
  return new Promise(() => {
    displayHeader();
    forgeNewApp();
  });
}

// Running the application
main()
  .then(() => {
    console.log("App ran successfully.");
  })
  .catch((error) => {
    console.error(chalk.red("An error occurred:"), error);
  });
