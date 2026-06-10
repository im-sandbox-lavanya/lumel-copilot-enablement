# Module 00 — Setup

> **Goal:** Install GitHub Copilot CLI, authenticate with GitHub, and launch your first session.  
> **Time:** ~10 minutes

---

## Step 1 — Prerequisites Check

Open a terminal (PowerShell on Windows, bash/zsh on Mac/Linux) and verify these are installed:

```bash
# Check Node.js version (need 18+)
node --version

# Check npm
npm --version

# Check Git
git --version
```

If Node.js is missing, download it from [nodejs.org](https://nodejs.org).

---

## Step 2 — Install GitHub Copilot CLI

```bash
npm install -g @github/copilot-cli
```

Verify the installation:

```bash
copilot version
```

You should see something like:
```
GitHub Copilot CLI v1.x.x
```

> **Windows users:** Run PowerShell as a regular user (not Administrator). If you see a permission error, try:
> ```powershell
> npm install -g @github/copilot-cli --prefix "$env:APPDATA\npm"
> ```

---

## Step 3 — Authenticate with GitHub

```bash
copilot login
```

This opens a browser window and walks you through GitHub's OAuth flow:

1. A code is displayed in your terminal (e.g., `ABCD-1234`)
2. The browser opens GitHub's device activation page
3. Paste the code and click **Authorize**
4. Return to the terminal — you should see `Authentication successful`

### Alternative: Token-based authentication

If you are in a headless environment (CI, SSH):

```bash
# Set a fine-grained Personal Access Token with "Copilot Requests" permission
export COPILOT_GITHUB_TOKEN=github_pat_YOUR_TOKEN_HERE
copilot
```

---

## Step 4 — Navigate to a Project Folder

**Always launch the CLI from inside a project directory** — not your home folder.

```bash
# Navigate to the demo project included in this repo
cd D:\GITHUB\lumel\copilot-cli-demo\01-basics\demo-project

# Or navigate to any of your own projects:
# cd C:\MyProjects\my-app
```

> **Why does this matter?**  
> The CLI scopes its file access to the folder you start from. This is a safety feature — it prevents accidental changes outside your project.

---

## Step 5 — Launch the Interactive Interface

```bash
copilot
```

You will see the Copilot CLI welcome screen with a text input at the bottom.

### What to expect on first launch:

1. **Trust prompt** — Copilot asks: *"Do you trust the files in this directory?"*  
   → Type `y` and press Enter.

2. **Missing instructions notice** — Copilot may say:  
   *"💡 No copilot instructions found. Run /init to generate a copilot-instructions.md file."*  
   → This is normal. We'll cover `/init` in Module 05.

3. **Welcome message** — A chat interface appears. You are ready!

---

## Step 6 — Your First Prompt

Type this into the prompt and press Enter:

```
What files are in this directory and what do they do?
```

Copilot will read the directory, list the files, and give you a summary. Notice:
- It uses **syntax highlighting** in responses
- It shows **which tools** it used (e.g., `view`, `glob`)
- It asks for **permission** before running any shell command

---

## Step 7 — Exit the CLI

```
/exit
```

Or press `Ctrl + D`.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `copilot: command not found` | Add npm global bin to PATH: `export PATH="$(npm prefix -g)/bin:$PATH"` |
| Browser doesn't open during login | Run `copilot login` and manually visit the URL shown |
| `Error: Copilot subscription required` | Ensure your GitHub account has an active Copilot subscription |
| Permission errors on Windows | Run PowerShell (not as Administrator) and use `--prefix` flag |
| Slow startup | Normal on first run — the CLI downloads model configs |

→ See [troubleshooting.md](../troubleshooting.md) for more.

---

## Next Step

→ **[Module 01 — Basics](../01-basics/BASICS.md)**
