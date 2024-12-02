export const envFile = `
# SUPABASE API KEYS
EXPO_PUBLIC_URL_IPHONE=
EXPO_PUBLIC_URL_ANDROID=
EXPO_PUBLIC_API_ANON_KEY=
`;

export const envFileToCreate = [
  ".env.example",
  ".env.development",
  ".env.test",
  ".env.production",
];

export const newScriptsPackage = {
  "android:dev": "NODE_ENV=dev npx expo run:android",
  "ios:dev": "NODE_ENV=dev npx expo run:ios",
  "android:stage": "NODE_ENV=test npx expo run:android",
  "ios:stage": "NODE_ENV=test npx expo run:ios",
  "android:prod": "NODE_ENV=production npx expo run:android",
  "ios:prod": "NODE_ENV=production npx expo run:ios",
};

export const scritpsPackageRemove = ["ios", "web", "android"];

export const makefileContent = `
# ===============================
# Makefile for managing Expo commands
# ===============================

# Define environment variables for clarity
NODE_ENV_DEV = development
NODE_ENV_STAGE = test
NODE_ENV_PROD = production

# Define common commands
EXPO_RUN_IOS = npx expo run:ios
EXPO_RUN_ANDROID = npx expo run:android

# ===============================
# Default target
# ===============================
# This is the default goal when no specific target is provided to 'make'
.DEFAULT_GOAL := help

# ===============================
# Help command - Displays all available commands
# ===============================
help:
	@echo "Makefile for running Expo commands"
	@echo ""
	@echo "Available targets:"
	@echo "  install        - Run the command npm install"
	@echo "  ios_dev       - Run iOS app in dev mode"
	@echo "  android_dev   - Run Android app in dev mode"
	@echo "  ios_stage     - Run iOS app in stage mode"
	@echo "  android_stage - Run Android app in stage mode"
	@echo "  ios_prod      - Run iOS app in prod mode"
	@echo "  android_prod  - Run Android app in prod mode"
	@echo ""
	@echo "Set NODE_ENV to control the environment for each command."


# ===============================
# Project Commands
# ===============================
#This target runs an intallation of the package.json
install:
	npm install

# ===============================
# iOS Commands
# ===============================
# This target runs the iOS app in development mode
ios_dev:
	@echo "Running iOS in development mode..."
	$(MAKE) install
	@NODE_ENV=$(NODE_ENV_DEV) $(EXPO_RUN_IOS)

# This target runs the iOS app in staging mode
ios_stage:
	@echo "Running iOS in staging mode..."
	$(MAKE) install
	@NODE_ENV=$(NODE_ENV_STAGE) $(EXPO_RUN_IOS)

# This target runs the iOS app in production mode
ios_prod:
	@echo "Running iOS in production mode..."
	$(MAKE) install
	@NODE_ENV=$(NODE_ENV_PROD) $(EXPO_RUN_IOS)


# ===============================
# Android Commands
# ===============================
# This target runs the Android app in development mode
android_dev:
	@echo "Running Android in development mode..."
	$(MAKE) install
	@NODE_ENV=$(NODE_ENV_DEV) $(EXPO_RUN_ANDROID)

# This target runs the Android app in staging mode
android_stage:
	@echo "Running Android in staging mode..."
	$(MAKE) install
	@NODE_ENV=$(NODE_ENV_STAGE) $(EXPO_RUN_ANDROID)

# This target runs the Android app in production mode
android_prod:
	@echo "Running Android in production mode..."
	$(MAKE) install
	@NODE_ENV=$(NODE_ENV_PROD) $(EXPO_RUN_ANDROID)
`;
