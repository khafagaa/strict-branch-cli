import inquirer from "inquirer";
import chalk from "chalk";
import { DEFAULT_BRANCH_TYPES, getStoredBranches } from "./storage.js";

// Helper for consistent styling
const styledPrompt = (message, color = "blue") => chalk?.[color].bold(message);

export const askBranchNaming = () =>
  inquirer.prompt([
    {
      name: "baseBranch",
      type: "input",
      message: styledPrompt("What is your development branch called?"),
      default: "development",
      validate: input => (input.trim() ? true : "Branch name cannot be empty"),
      transformer: input => chalk.cyan(input),
    },
    {
      name: "prodBranch",
      type: "input",
      message: styledPrompt("What is your production branch called?"),
      default: "prod",
      validate: input => (input.trim() ? true : "Branch name cannot be empty"),
      transformer: input => chalk.cyan(input),
    },
  ]);

export const askTicketFormat = async () => {
  const response = await inquirer.prompt([
    {
      name: "format",
      type: "input",
      message: styledPrompt(
        "Enter your team's ticket ID format (e.g. 1234aa5bc, CU-5678):"
      ),
      validate: value => {
        if (value.length < 3) return "Format must be at least 3 characters";
        if (!/[a-zA-Z0-9]/.test(value))
          return "Must contain letters or numbers";
        return true;
      },
      transformer: input => chalk.cyan(input),
    },
  ]);

  return response;
};

export const askBranchType = (types = DEFAULT_BRANCH_TYPES) => {
  return inquirer.prompt([
    {
      name: "branchType",
      type: "list",
      message: styledPrompt("Select branch type:"),
      choices: types.map(t => ({
        name: `${chalk.yellow(t.name)} - ${chalk.dim(t.description)}`,
        value: t.name,
        short: chalk.cyan(t.name),
      })),
      pageSize: types.length,
    },
  ]);
};

export const askTicketId = (formatRegex, formatExample) => {
  return inquirer.prompt([
    {
      name: "ticketId",
      type: "input",
      message: styledPrompt(
        `Enter ticket ID (format: ${chalk.yellow(formatExample)}):`
      ),
      validate: value => {
        if (!value.trim()) return "Ticket ID cannot be empty";
        if (!formatRegex.test(value)) {
          return `Please match the format: ${formatExample}`;
        }
        return true;
      },
      transformer: input => chalk.cyan(input),
    },
  ]);
};

export const askBranchDescription = () => {
  return inquirer.prompt([
    {
      name: "branchDescription",
      type: "input",
      message: styledPrompt("Enter branch description (2-4 words):"),
      validate: value => {
        if (!/^[\w\s-]+$/.test(value)) {
          return "Use only letters, numbers, hyphens and underscores";
        }
        const wordCount = value.trim().split(/\s+/).length;
        if (wordCount < 2 || wordCount > 4) {
          return "Please enter 2-4 words";
        }
        return true;
      },
      transformer: input => chalk.cyan(input),
      filter: input => input.trim().replace(/\s+/g, "-").toLowerCase(),
    },
  ]);
};

export const askEnhanceType = () => {
  return inquirer.prompt([
    {
      name: "enhanceType",
      type: "list",
      message: styledPrompt("Does this enhancement have a ticket?"),
      choices: [
        {
          name: `${chalk.green("Yes")} - Has ticket ID`,
          value: "hasID",
          short: "with ticket",
        },
        {
          name: `${chalk.yellow("No")} - No ticket needed`,
          value: "noTicket",
          short: "no ticket",
        },
      ],
    },
  ]);
};
