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
	@echo "  biome        - Run the biome formater and correct"
	@echo ""

# ===============================
# Project Commands
# ===============================
#This target runs an intallation of the package.json
biome:
	npx @biomejs/biome format --write