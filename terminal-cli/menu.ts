// menu.js
import inquirer from "inquirer";
import chalk from "chalk";
import { createExpoApp } from "./utils/createExpoApp.ts";

function displayHeader() {
  console.log(
    chalk.bold.cyan(`
                  ⭑ The Ultimate React Native Development Tooling ⭑ 
    `)
  );
}

function showMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menuOption",
        message: "Please select an option:",
        choices: [
          { name: "Create a new Expo app", value: 1 },
          { name: "Option 2", value: 2 },
          { name: "Option 3", value: 3 },
          { name: "Option 4", value: 4 },
          { name: "Option 5", value: 5 },
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
        createExpoApp();
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
