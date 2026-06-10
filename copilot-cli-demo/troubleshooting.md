# Troubleshooting Guide

Common problems and their solutions for GitHub Copilot CLI.

---

## Installation Issues

### `copilot: command not found`

**Cause:** npm's global bin folder is not in your PATH.

```bash
# Find the global bin path
npm prefix -g

# Add it to PATH (bash / zsh)
export PATH="$(npm prefix -g)/bin:$PATH"

# Add to ~/.bashrc or ~/.zshrc to make it permanent
echo 'export PATH="$(npm prefix -g)/bin:$PATH"' >> ~/.zshrc
```

**Windows (PowerShell):**
```powershell
$npmPath = npm prefix -g
$env:PATH += ";$npmPath\bin"
```

### Permission errors during `npm install -g`

**Do NOT use `sudo`** — instead configure npm to use a different global directory:

```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
npm install -g @github/copilot-cli
```

---

## Authentication Issues

### `Error: Copilot subscription required`

Your GitHub account needs an active Copilot subscription.
- Check at [github.com/settings/copilot](https://github.com/settings/copilot)
- If on an organization plan, confirm the org admin has enabled Copilot CLI access

### `Error: Authentication failed`

Try re-authenticating:

```bash
copilot logout
copilot login
```

### Browser doesn't open during `copilot login`

Copy the URL printed in the terminal and open it manually in a browser.

### Token-based auth not working

Fine-grained PATs must have the **"Copilot Requests"** permission (not "Copilot" or "repo").  
Classic `ghp_` tokens are **not supported**.

---

## Session / Startup Issues

### CLI hangs at startup

Try clearing the cache:

```bash
# Delete the cache directory
rm -rf ~/.copilot/cache
copilot
```

### `No copilot instructions found` message

This is informational — not an error. Run `/init` to generate instructions, or suppress the message:

```
/init suppress
```

### Session history is too long / context limit reached

```
/compact
```

Or start fresh:

```
/clear
```

---

## File Access Issues

### `Error: File access denied` / `Access outside allowed directory`

The CLI only accesses files in the directory you launched from.

```bash
# Grant access to an additional directory
copilot --add-dir=../other-project

# Or inside a session:
/add-dir ../other-project
```

### CLI modified a file I didn't want it to

Use `/undo` to revert the last change immediately.  
For multiple undos, run `/undo` repeatedly.

---

## Command Execution Issues

### `Permission denied` when running shell commands

For interactive sessions, respond to the tool prompt with `y` (once) or `!` (rest of session).

For programmatic use:

```bash
copilot -p "YOUR PROMPT" --allow-tool='shell(npm)'
```

### Copilot uses the wrong shell command

You can steer it:

```
Don't use npm — use pnpm instead for all package operations
```

Or deny the wrong tool:

```bash
copilot --deny-tool='shell(npm)' --allow-tool='shell(pnpm)'
```

---

## Network Issues

### `Error: Could not reach GitHub API`

Check your internet connection and GitHub status at [githubstatus.com](https://githubstatus.com).

### Corporate proxy / firewall

Set the proxy environment variable:

```bash
export HTTPS_PROXY=http://your-proxy:8080
export HTTP_PROXY=http://your-proxy:8080
copilot
```

---

## Windows-Specific Issues

### `ExecutionPolicy` error in PowerShell

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

### Line ending issues (`\r\n`)

The CLI handles this automatically on Windows. If scripts fail, check:

```bash
git config --global core.autocrlf input
```

### WSL vs PowerShell

Both are supported. Use **PowerShell** for Windows-native projects and **WSL** for Linux-based projects.

---

## Getting Help

- In the CLI: `/feedback` or `/bug`
- GitHub Docs: https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli
- GitHub Community: https://github.com/orgs/community/discussions
