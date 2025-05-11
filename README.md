# 🚀 Strict-Branch-CLI - Git Branch Enforcer 🛡

A lightweight, zero-configuration CLI tool to enforce consistent branch naming conventions across GitHub, GitLab, and Bitbucket.

---

## ✅ Why Use `strict-branch-cli`?

- ✅ **No Complex Setup** – Just install and run. No lengthy config files.
- ✅ **Works Everywhere** – Compatible with GitHub, GitLab, and Bitbucket.
- ✅ **Flexible Rules** – Define `dev`/`prod` branches and ticket ID formats on the fly.
- ✅ **Prevents Mistakes** – Blocks invalid branch names before commits.
- ✅ **Zero Dependencies** – Lightweight and fast.

---

## 🔍 Alternatives Comparison

| Feature          | `strict-branch-cli`  | Husky + Regex Hooks    | Git Hooks Manual Setup |
| ---------------- | -------------------- | ---------------------- | ---------------------- |
| No Config Needed | ✅ Yes               | ❌ Requires setup      | ❌ Complex setup       |
| Cross-Platform   | ✅ All Git Providers | ❌ Often repo-specific | ❌ Manual per repo     |
| Dynamic Rules    | ✅ Change anytime    | ❌ Static config       | ❌ Hard to modify      |
| Run Anywhere     | ✅ `npx` or global   | ❌ Requires install    | ❌ Repo-dependent      |

---

## ⚙️ Features

- 🔹 Enforces branch naming patterns (e.g., `feat/JIRA-123`, `fix/bug-description`)
- 🔹 Blocks accidental pushes to protected branches (`main`, `prod`)
- 🔹 Customizable prefixes (`feature/`, `bugfix/`, etc.)
- 🔹 Dynamic ticket ID validation (JIRA, Trello, ClickUp)
- 🔹 Instant feedback before invalid branch creation

---

# 🧭 Step-by-Step Setup

## 🔧 Step 1: Install

Install globally (recommended):

```bash
npm install -g strict-branch-cli
```

Or with Yarn:

```bash
yarn global add strict-branch-cli
```

<!-- ## 🚀 Usage
To get started, run:
```
npx strict-branch
```
or
```
npx cli
``` -->

## 🚀 Usage

To run without installing globally:

```bash
npx strict-branch-cli
# or if aliased
npx cli
```

## 🛠 First-Time Setup

You'll be guided through initial configuration:

```
$ strict-branch

███████╗████████╗██████╗ ██╗ ██████╗████████╗     ██████╗ ██████╗  █████╗ ███╗  ██╗ ██████╗ ██████╗
██╔════╝╚══██╔══╝██╔══██╗██║██╔════╝╚══██╔══╝    ██╔════╝ ██╔══██╗██╔══██╗████╗ ██║██╔════╝ ██╔══██╗
███████╗   ██║   ██████╔╝██║██║        ██║       ██║  ██╗ ██████╔╝███████║██╔██╗██║██║  ███╗██████╔╝
╚════██║   ██║   ██╔═══╝ ██║██║        ██║       ██║  ╚██╗██╔═══╝ ██╔══██║██║╚████║██║   ██║██╔═══╝
███████║   ██║   ██║     ██║╚██████╗   ██║       ╚██████╔╝██║     ██║  ██║██║ ╚███║╚██████╔╝██║
╚══════╝   ╚═╝   ╚═╝     ╚═╝ ╚═════╝   ╚═╝        ╚═════╝ ╚═╝     ╚═╝  ╚═╝╚═╝  ╚══╝ ╚═════╝ ╚═╝

A structured Git branch workflow

⚠️  First-time configuration required!

? What is your development branch called? (development) › **dev**
? What is your production branch called? › **prod**
? Enter your team's ticket ID format (e.g. CU-5678): › **CU-5678**

✓ Configuration saved!
```

## 🌿 Create a New Branch

```
? What would you like to do?
❯ 🌱  Create new branch
  ⚙️  Configure settings
  ❌  Exit

? Select branch type:
❯ feature     – New feature development
  enhance     – Enhancement of existing feature
  hotfix      – Critical production fix
  bugfix      – Bug fix not in production yet

? Enter ticket ID (format: CU-5678): › CU-5678
? Describe this branch: › add-login-page

✓ Created branch: feature/CU-5678_add-login-page
```

## ⚙️ Configure Settings Anytime

```
? What would you like to do?
❯ ⚙️  Configure settings

Current configuration:
{
  "baseBranch": "dev",
  "prodBranch": "prod",
  "ticketFormat": "CU-5678"
}

? Configure:
❯ ✏️   Change branch names
  🔢  Change ticket format
  🔄  Reset all settings
  🔙  Back to main menu
```

## 🗂 .strictbranchrc

Your configuration is saved automatically:

```
{
  "baseBranch": "dev",
  "prodBranch": "prod",
  "ticketFormat": "CU-5678"
}
```

Right now it ends with:

> Happy (Strict) Branching!

---

## 🤝 Contributing

Found a bug or have a suggestion? [Open an issue](https://github.com/your-username/strict-branch-cli/issues) or submit a pull request!

---

## 🛡 License

[![npm version](https://img.shields.io/npm/v/strict-branch-cli.svg)](https://www.npmjs.com/package/strict-branch-cli)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Made with ❤️ by [Ghobashy & Khafagaa](https://github.com/khafagaa)
