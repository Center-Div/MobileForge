import inquirer from "inquirer";

/**
 * Prompt the user to choose a formatting and linting tool, and database type.
 * @returns {Promise<{ formatterChoice: string; dbChoice: string }>} The chosen formatter and database type.
 */
export async function forgeSetupsSelection(): Promise<{
  formatterChoice: string;
}> {
  const { formatterChoice } = await inquirer.prompt([
    {
      type: "list",
      name: "formatterChoice",
      message: "Which formatting tool do you want to use?",
      choices: [
        { name: "Prettier + ESLint", value: "prettier-eslint" },
        { name: "Biome", value: "biome" },
      ],
    },
  ]);

  return { formatterChoice };
}
