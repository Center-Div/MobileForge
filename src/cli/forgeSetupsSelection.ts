import { FormatterChoice } from "src/types/inputs";
import inquirer from "inquirer";

export async function forgeSetupsSelection(): Promise<{
  formatterChoice: FormatterChoice;
}> {
  const formatterChoices: { name: string; value: FormatterChoice }[] = [
    { name: "Prettier + ESLint", value: "prettier-eslint" },
    { name: "Biome", value: "biome" },
  ];

  const { formatterChoice } = await inquirer.prompt<{
    formatterChoice: FormatterChoice;
  }>([
    {
      type: "list",
      name: "formatterChoice",
      message: "Which formatting tool do you want to use?",
      choices: formatterChoices,
    },
  ]);

  return { formatterChoice };
}
