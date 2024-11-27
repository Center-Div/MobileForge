#!/usr/bin/env node
import { showMenu } from "@fonctions/showMenu";

function main(): Promise<void> {
  return new Promise((resolve, reject) => {
    showMenu() // Show the menu
      .then(() => resolve()) // Resolve when menu completes
      .catch((error) => reject(error)); // Reject on error
  });
}

// Running the application
main()
  .then(() => {
    console.log("App ran successfully.");
  })
  .catch((error) => {
    console.error("App encountered an error:", error);
  });
