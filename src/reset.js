#!/usr/bin/env node
import { clearAllConfig } from "./storage.js";
import chalk from "chalk";

console.log(
  chalk.yellow.bold("\n🧹 Clearing all Strict-Branch configurations...")
);

if (clearAllConfig()) {
  console.log(
    chalk.green.bold("✓ Successfully cleared all saved configurations!")
  );
  console.log(chalk.dim("You will be prompted for fresh setup on next run.\n"));
} else {
  console.log(chalk.dim("No configurations found to clear.\n"));
}
