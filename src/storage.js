import fs from "fs";
import path from "path";
import { simpleGit } from "simple-git";
import chalk from "chalk";
const git = simpleGit();
const CONFIG_PATH = path.resolve(process.cwd(), ".strictbranchrc");

export const DEFAULT_BRANCH_TYPES = [
  { name: "feature", description: "New feature development" },
  { name: "enhance", description: "Enhancement of existing feature" },
  { name: "hotfix", description: "Critical production fix" },
  { name: "bugfix", description: "Bug fix not in production yet" },
];

export const DEFAULT_CONFIG = {
  baseBranch: "",
  prodBranch: "",
  ticketFormat: "", // Default format example
};

/**
 * Loads configuration with defaults
 */
export const getStoredBranches = () => {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
      return { ...DEFAULT_CONFIG, ...config };
    }
  } catch (error) {
    console.error("Error reading config file:", error.message);
  }
  return { ...DEFAULT_CONFIG };
};

/**
 * Saves branch configuration
 */
export const storeBranches = config => {
  try {
    const currentConfig = getStoredBranches();
    const newConfig = { ...currentConfig, ...config };
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(newConfig, null, 2), "utf8");
    return newConfig;
  } catch (error) {
    console.error("Error saving config:", error.message);
    throw error;
  }
};

/**
 * Creates a new branch with proper git workflow
 */
export const createBranch = async (branchName, baseBranch) => {
  try {
    console.log(chalk.blue(`Syncing with ${baseBranch}...`));
    await git.fetch();
    await git.pull("origin", baseBranch);

    console.log(chalk.blue(`Creating branch: ${branchName}`));
    await git.checkoutBranch(branchName, baseBranch);

    console.log(chalk.green(`✓ Successfully created ${branchName}`));
    return true;
  } catch (error) {
    console.error(chalk.red(`✗ Failed to create branch: ${error.message}`));

    // Try to recover by checking out the original branch
    try {
      await git.checkout(baseBranch);
    } catch {}

    throw error;
  }
};

/**
 * Gets or initializes ticket format
 */
export const getTicketFormat = () => {
  const config = getStoredBranches();
  return config.ticketFormat || DEFAULT_CONFIG.ticketFormat;
};

/**
 * Updates ticket format
 */
export const setTicketFormat = format => {
  return storeBranches({ ticketFormat: format });
};

/**
 * Reset Storage
 */
export const clearAllConfig = () => {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      fs.unlinkSync(CONFIG_PATH);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error clearing config:", error.message);
    return false;
  }
};
