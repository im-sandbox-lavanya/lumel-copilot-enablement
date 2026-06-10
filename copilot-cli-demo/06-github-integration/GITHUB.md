# Module 06 — GitHub Integration

> **Goal:** Use Copilot CLI to interact with GitHub — issues, pull requests, Actions, and more — without leaving your terminal.  
> **Time:** ~10 minutes  
> **Prerequisite:** Authenticated with `copilot login` and have access to a GitHub repository

---

## How GitHub Integration Works

The CLI includes a **built-in GitHub MCP server** that gives it access to the GitHub API. This means Copilot can:

- Read and create issues
- Review and merge pull requests
- Check Actions workflow runs
- Search code across repositories

No extra configuration required — it is enabled by default.

---

## Exercise 1 — List Your Open Work

Start the CLI from any directory:

```bash
copilot
```

Then ask:

```
List all open pull requests assigned to me across all my repositories
```

```
List all open issues assigned to me. Sort them by most recently updated.
```

---

## Exercise 2 — Work on an Issue

```
I've been assigned this issue: https://github.com/YOUR-ORG/YOUR-REPO/issues/42
Start working on it. Create a new branch named after the issue and begin implementing a fix.
```

Copilot will:
1. Read the issue details from GitHub
2. Create a branch (`git checkout -b fix/issue-42-...`)
3. Make the necessary code changes
4. Run any tests it can find
5. Ask if you want to create a PR

---

## Exercise 3 — Review a Pull Request

```
Check the changes in PR https://github.com/YOUR-ORG/YOUR-REPO/pull/57
Report any serious bugs, security issues, or logic errors you find.
```

Or use the slash command if you are already in a repository:

```
/pr view
```

```
/review
```

---

## Exercise 4 — Create a Pull Request

After making changes on a branch:

```
/pr create
```

Or with a prompt:

```
Create a pull request for the current branch. Write a detailed description explaining:
- What was changed
- Why it was changed
- How to test it
Target the main branch.
```

---

## Exercise 5 — Manage Issues

```
Raise an issue in my-org/my-repo. Title: "Calculator divide function allows division by zero". Body should include:
- Description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Suggested fix
```

```
Find all 'good first issue' labels in my-org/my-repo that are unassigned
```

---

## Exercise 6 — GitHub Actions

```
List any GitHub Actions workflows in this repo
```

```
Show me the last failed workflow run in this repository and explain what went wrong
```

```
Create a GitHub Actions workflow that:
- Triggers on push to main and pull_request
- Runs npm install and npm test
- Reports test results as PR status checks
```

---

## Exercise 7 — Cross-Repository Code Search

```
Use the GitHub MCP server to search for how other TypeScript projects implement rate limiting with Express
```

```
Find examples of .NET 8 Minimal API authentication middleware in public GitHub repositories
```

---

## MCP Server Tools Available

The built-in GitHub MCP server provides these tools automatically:

| Tool | What it does |
|------|-------------|
| `get_file_contents` | Read any file in a GitHub repo |
| `search_code` | Search code across GitHub |
| `list_issues` | List issues with filters |
| `issue_read` | Read a specific issue |
| `get_pull_request` | Get PR details and diff |
| `list_pull_requests` | List PRs with filters |
| `list_commits` | Get commit history |
| `get_commit` | Read a specific commit |
| `list_workflow_runs` | List Actions runs |
| `get_workflow_run_logs` | Read Actions logs |

---

## Tips for Better GitHub Prompts

1. **Be specific about the repository**: `in my-org/my-repo` prevents ambiguity
2. **Mention the MCP server** when relevant: `Use the GitHub MCP server to find...`
3. **Give context**: Include the issue/PR URL for best results
4. **Chain tasks**: `Find the issue, create a branch, implement a fix, then open a PR`

---

## Next Step

→ **[Cheat Sheet](../cheatsheet.md)** — all important prompts in one place
