TERMINAL_CLI_DIR=terminal-cli

lauch:
	cd $(TERMINAL_CLI_DIR) && npm install && npx tsx index.ts
	
