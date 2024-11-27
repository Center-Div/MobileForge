// menu.js
import inquirer from "inquirer";
import chalk from "chalk";
import { i18nFile } from "@props/i18nProps.ts";
import { forgeNewApp } from "utils/forgeNewApp";

function displayHeader() {
  console.log(
    chalk.bold.cyan(`
                  ⭑ The Ultimate React Native Development Tooling ⭑ 
    `)
  );
}

i18nFile;

function showMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menuOption",
        message: "Please select an option:",
        choices: [
          { name: "Forge a new Mobile App", value: 1 },
          new inquirer.Separator(),
          { name: "Exit", value: "exit" },
        ],
      },
    ])
    .then((answer) => {
      if (answer.menuOption === "exit") {
        console.log("Goodbye!");
        process.exit();
      } else if (answer.menuOption === 1) {
        forgeNewApp();
      } else {
        console.log(`You selected Option ${answer.menuOption}`);
        showMenu();
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}

function runApp() {
  displayHeader();
  showMenu();
}

runApp();
