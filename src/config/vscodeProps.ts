export function getVscodeSettings(formatterChoice: string): any {
  const vscodeSettings: any = {
    "i18n-ally.localesPaths": ["src/i18n/locales"],
    "i18n-ally.keystyle": "nested",
    "i18n-ally.sourceLanguage": "fr",
    "editor.formatOnSave": true,
  };

  if (formatterChoice === "biome") {
    vscodeSettings["editor.defaultFormatter"] = "biomejs.biome";
    vscodeSettings["editor.codeActionsOnSave"] = {
      "quickfix.biome": "explicit",
    };
  } else if (formatterChoice === "eslint") {
    vscodeSettings["editor.defaultFormatter"] = "dbaeumer.vscode-eslint";
    vscodeSettings["eslint.format.enable"] = true;
    vscodeSettings["editor.codeActionsOnSave"] = {
      "source.fixAll.eslint": true,
    };
  }

  return vscodeSettings;
}
