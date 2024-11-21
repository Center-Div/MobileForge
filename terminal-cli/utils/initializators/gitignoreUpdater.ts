import fs from "fs";
import chalk from "chalk";
import ora from "ora";

// Function to apply .gitignore changes to a specified path
export function applyGitIgnoreChanges(path) {
  const gitignoreContent = `
# dependencies
node_modules/

# Expo
.expo/
dist/
web-build/
.idea/


# Native
*.orig.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision

# Metro
.metro-health-check*

# debug
npm-debug.*
yarn-debug.*
yarn-error.*

# native builds
android/
ios/
*.apk
*.aab
builds/
google-services.json
build-*.tar.gz


# keystore
credentials.json
*.keystore
!debug.keystore


# macOS
.DS_Store
*.pem

# local env files
.env*.local
.env.*
!.env.example

package-lock.json
gql/

# typescript
*.tsbuildinfo
database.types.ts


#VS CODE
.vscode/*
!.vscode/settings.json
`;

  const spinner = ora({
    text: "Updating .gitignore file...",
    color: "cyan",
  }).start();

  try {
    // Write the .gitignore file
    fs.writeFileSync(`${path}/.gitignore`, gitignoreContent, "utf8");
    spinner.succeed("Successfully updated .gitignore file.");
  } catch (error) {
    spinner.fail("Failed to update .gitignore.");
    console.error(chalk.red("Error details:"), error);
  }
}
