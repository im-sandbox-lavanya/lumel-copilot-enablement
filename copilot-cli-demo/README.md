# GitHub Copilot CLI — Hands-On Demo

> **Target audience:** Beginners and developers new to GitHub Copilot CLI.  
> **Time to complete:** ~60–90 minutes (all modules end-to-end)  
> **Tech stack covered:** TypeScript / Node.js · .NET / C#

---

## What Is GitHub Copilot CLI?

GitHub Copilot CLI is an AI-powered terminal agent that lets you **chat with Copilot directly from your command line**. Unlike the IDE extension (which sits inside VS Code / JetBrains etc.), the CLI is:

- A **standalone terminal program** you can use anywhere — scripts, SSH sessions, CI pipelines
- An **agentic tool** that can read files, run commands, write code, and open pull requests *on your behalf*
- **Fully interactive** with a rich chat UI, or **fully scriptable** for automation

---

## Demo Modules

Work through them in order — each builds on the previous one.

| # | Module | What You Learn | Time |
|---|--------|---------------|------|
| [00](./00-setup/SETUP.md) | **Setup** | Install CLI, authenticate, first launch | 10 min |
| [01](./01-basics/BASICS.md) | **Basics** | Interactive mode, slash commands, modes | 15 min |
| [02](./02-typescript-nodejs/DEMO.md) | **TypeScript / Node.js** | Generate, debug, refactor TS code via CLI | 20 min |
| [03](./03-dotnet-csharp/DEMO.md) | **.NET / C#** | Scaffold, modify, and test a .NET Web API | 20 min |
| [04](./04-ide-vs-cli/COMPARISON.md) | **IDE vs CLI** | When to use each, key differences, advantages | 10 min |
| [05](./05-advanced/ADVANCED.md) | **Advanced Features** | Plan mode, autopilot, PR creation, MCP tools | 15 min |
| [06](./06-github-integration/GITHUB.md) | **GitHub Integration** | Issues, PRs, Actions from the terminal | 10 min |
| [CHEATSHEET](./cheatsheet.md) | **Cheat Sheet** | Quick-reference for all important prompts | Reference |

---

## Prerequisites at a Glance

```
✅ GitHub account with a Copilot subscription (Free, Pro, Team, or Enterprise)
✅ Node.js 18+ and npm  (for TypeScript modules)
✅ .NET 8 SDK            (for C# modules — optional if skipping module 03)
✅ Git installed and configured
✅ PowerShell or a Unix shell (bash / zsh)
```

→ Jump to [00-setup/SETUP.md](./00-setup/SETUP.md) to install and configure the CLI.

---

## Quick Start (TL;DR)

```bash
# 1. Install
npm install -g @github/copilot-cli

# 2. Authenticate
copilot login

# 3. Launch
copilot
```

Once inside, type a natural language prompt — for example:

```
Show me the files in this directory and summarise what this project does
```

---

## Key Concept: How the CLI Works

```
You (natural language)
        │
        ▼
 ┌─────────────────┐
 │  Copilot CLI    │  ← AI model (Claude Sonnet 4.6 by default)
 │  (terminal UI)  │
 └────────┬────────┘
          │ reads/writes files · runs shell commands · calls GitHub API
          ▼
   Your local project + GitHub.com
```

The CLI **always asks for permission** before it modifies a file or runs a shell command — you are always in control.

---

## Important Safety Rules (Read Before Starting)

1. **Launch the CLI from your project folder** — not from `~` (home directory).
2. **Review every command** before approving it.
3. Use `n` or `Esc` to decline a proposed command.
4. Use `--deny-tool='shell(rm)'` if you never want the CLI to delete files.
5. The CLI is **scoped to the directory you start it from** — it won't touch files outside unless you explicitly allow it.

---

## Folder Structure

```
copilot-cli-demo/
├── README.md                    ← You are here
├── cheatsheet.md                ← Quick-reference prompt card
├── troubleshooting.md           ← Common issues and fixes
│
├── 00-setup/
│   └── SETUP.md                 ← Install + authenticate
│
├── 01-basics/
│   ├── BASICS.md                ← Interactive mode walkthrough
│   └── demo-project/            ← Simple project used in exercises
│
├── 02-typescript-nodejs/
│   ├── DEMO.md                  ← Step-by-step TS exercises
│   └── starter/                 ← Starter TypeScript project
│
├── 03-dotnet-csharp/
│   ├── DEMO.md                  ← Step-by-step C# exercises
│   └── starter/                 ← Starter .NET project
│
├── 04-ide-vs-cli/
│   └── COMPARISON.md            ← IDE vs CLI detailed comparison
│
├── 05-advanced/
│   └── ADVANCED.md              ← Plan mode, autopilot, PR creation
│
└── 06-github-integration/
    └── GITHUB.md                ← Issues, PRs, Actions via CLI
```

---

## Official Documentation

- [About GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli)
- [CLI Command Reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference)
- [Installing Copilot CLI](https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli)
- [Using Copilot CLI](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli)
