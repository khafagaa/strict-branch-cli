import { getStoredBranches, storeBranches } from "./storage.js";
import { askBranchNaming, askTicketFormat } from "./asks.js";
import { clearAllConfig } from "./storage.js";
import chalk from "chalk";
import inquirer from "inquirer";

export const requireInitialSetup = async () => {
  const config = getStoredBranches();
  if (!config.baseBranch || !config.prodBranch || !config.ticketFormat) {
    console.log(
      chalk.yellow.bold("\n⚠️  First-time configuration required!\n")
    );
    console.log(chalk.dim("Please set up your branch conventions first.\n"));

    const branches = await askBranchNaming();
    const { format } = await askTicketFormat();
    const newConfig = { ...branches, ticketFormat: format };
    storeBranches(newConfig);

    console.log(chalk.green.bold("\n✓ Configuration saved!\n"));
    return newConfig;
  }
  return config;
};

export const updateBranchNames = async () => {
  try {
    const branches = await askBranchNaming();
    storeBranches({
      ...getStoredBranches(),
      devBranch: branches.devBranch,
      prodBranch: branches.prodBranch,
    });
    console.log(chalk.green("\n✓ Branch names updated!"));
  } catch (error) {
    console.error(
      chalk.red("\n✗ Failed to update branch names:", error.message)
    );
  }
};

export const updateTicketFormat = async () => {
  try {
    const { format } = await askTicketFormat();
    storeBranches({
      ...getStoredBranches(),
      ticketFormat: format,
    });
    console.log(chalk.green("\n✓ Ticket format updated!"));
  } catch (error) {
    console.error(
      chalk.red("\n✗ Failed to update ticket format:", error.message)
    );
  }
};

export const resetAllSettings = async () => {
  const { confirm } = await inquirer.prompt([
    {
      name: "confirm",
      type: "confirm",
      message: chalk.red.bold("Are you sure you want to reset ALL settings?"),
      default: false,
    },
  ]);

  if (confirm) {
    if (clearAllConfig()) {
      console.log(chalk.green("\n✓ All settings have been reset!"));
      // Force initial configuration
      console.log(chalk.yellow("\nInitial configuration required!\n"));
      try {
        await requireInitialSetup();
      } catch (error) {
        console.error(chalk.red("\n✗ Configuration failed:", error.message));
        console.log(
          chalk.yellow(
            "You'll need to configure manually before using the CLI."
          )
        );
      }
    } else {
      console.log(chalk.yellow("\nNo settings to reset."));
    }
  } else {
    console.log(chalk.dim("\nReset cancelled."));
  }
  return; // Return to main menu after reset
};
