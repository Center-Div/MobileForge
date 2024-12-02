# ===============================
# Default target
# ===============================
# This is the default goal when no specific target is provided to 'make'
.DEFAULT_GOAL := help

# ===============================
# Help command - Displays all available commands
# ===============================
help:
	@echo "__________________________________________"
	@echo "Makefile for running Mobile Forge commands"
	@echo "__________________________________________"
	@echo "Available targets:"
	@echo "  biome        - Run the biome formater and correct"
	@echo "  test         - Run the program locally"
	@echo ""

# ===============================
# Project Commands
# ===============================
#This target runs an intallation of the package.json
biome:
	npx @biomejs/biome format --write

test:
	npm run dev