import inquirer from "inquirer";
import { forgeNewApp } from "../forgeNewApp";

// This function handles the menu and returns a promise
export function showMenu(): Promise<void> {
  return new Promise((resolve, reject) => {
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
      .then(async (answer: { menuOption: string | number }) => {
        if (answer.menuOption === "exit") {
          console.log("Goodbye!");
          process.exit();
        } else if (answer.menuOption === 1) {
          await forgeNewApp();
          resolve();
        } else {
          console.log(`You selected Option ${answer.menuOption}`);
          showMenu().then(resolve); // Recurse to show the menu again
        }
      })
      .catch((error: any) => {
        console.error("An error occurred:", error);
        reject(error);
      });
  });
}
