# Module 01 — Basics

> **Goal:** Learn the interactive interface, modes, slash commands, and how to have a productive conversation with Copilot CLI.  
> **Time:** ~15 minutes  
> **Start from:** `D:\GITHUB\lumel\copilot-cli-demo\01-basics\demo-project`

---

## Launch the CLI

```bash
cd D:\GITHUB\lumel\copilot-cli-demo\01-basics\demo-project
copilot
```

---

## Exercise 1 — Explore the Demo Project

The `demo-project` folder contains a simple Node.js utility. Ask Copilot to tell you about it:

```
What does this project do? Give me a short summary of each file.
```

**What to observe:**
- Copilot reads files automatically (no manual copy-pasting)
- It uses the `view` and `glob` tools to scan the directory
- The response uses markdown formatting with code blocks

---

## Exercise 2 — Understanding the Three Modes

Press **`Shift + Tab`** to cycle between modes. You will see the mode indicator change in the status bar.

| Mode | What it does | When to use |
|------|-------------|-------------|
| **Standard** (default) | Ask → Copilot acts immediately | Quick tasks, exploration |
| **Plan** | Ask → Copilot builds a plan first, then executes | Complex multi-step work |
| **Autopilot** | Copilot works autonomously with pre-approved tools | Batch work, scripting |

### Try Plan Mode

1. Press `Shift + Tab` twice to enter **Plan** mode (look for "plan" in the status bar)
2. Type:
   ```
   Add a function to utils.js that formats a date as YYYY-MM-DD
   ```
3. Copilot will show you a **structured plan** with numbered steps before writing any code
4. Review the plan and press Enter to approve it, or type feedback to adjust it

---

## Exercise 3 — Essential Slash Commands

Slash commands control the CLI behavior. Type them at the prompt:

### `/help` — Show all available commands
```
/help
```

### `@filename` — Include a file in context
```
@utils.js explain this file in detail
```
This is faster than copy-pasting — Copilot reads the file directly.

### `/model` — Switch the AI model
```
/model
```
A list of available models appears. Select one with arrow keys and Enter.

### `/clear` — Start a fresh conversation
```
/clear
```
Resets the conversation history (but you stay in the same session).

### `/context` — Check token usage
```
/context
```
Shows how much of the context window is used — useful for long sessions.

### `/undo` — Revert the last change
```
/undo
```
Reverts file changes made in the last turn. Use this if Copilot did something unexpected.

### `/diff` — Review all pending changes
```
/diff
```
Shows a diff of every file Copilot has modified in the current session.

---

## Exercise 4 — Permission Prompts

When Copilot needs to run a shell command or modify a file it will ask for your permission.

Ask Copilot to do something that requires a file write:

```
Add a console.log at the start of the greet function in utils.js
```

When the permission prompt appears you will see options like:

```
1. Yes  (allow this once)
2. Yes, and approve write for the rest of the session
3. No  (Esc to cancel and explain why)
```

**Keys:**
- `y` → allow this once
- `!` → allow all similar requests for the rest of the session
- `n` → deny
- `#` → deny all similar requests for the rest of the session
- `?` → show details about what exactly Copilot wants to do

---

## Exercise 5 — The `!` Shell Bypass

You can run any shell command directly without going through Copilot using `!`:

```
! git status
```

```
! dir
```

This is useful for quick checks without leaving the Copilot context.

---

## Exercise 6 — Keyboard Shortcuts

Try these shortcuts in the interactive interface:

| Shortcut | Action |
|----------|--------|
| `Ctrl + L` | Clear the screen |
| `Ctrl + R` | Reverse search through prompt history |
| `Shift + Enter` | Insert a newline (multi-line prompt) |
| `Ctrl + G` | Open prompt in your `$EDITOR` |
| `Ctrl + C` | Cancel the current operation |
| `Ctrl + D` | Exit the CLI |
| `Esc` | Cancel/deny the current tool request |

---

## Exercise 7 — Asking Follow-Up Questions

Copilot CLI maintains conversation history. After it makes a change, ask:

```
Why did you choose to implement it that way?
```

Or if something looks wrong:

```
That doesn't look right. The function should return a string, not a number. Fix it.
```

Copilot will re-evaluate and adjust its approach.

---

## Exercise 8 — Undoing Changes

If a change isn't what you wanted:

```
/undo
```

This reverts file modifications from the **last turn**. You can undo multiple turns by running `/undo` repeatedly.

---

## Key Takeaways

- The CLI is **conversational** — you can steer and correct Copilot as you go
- **Plan mode** is great for complex tasks — always consider it for multi-step work
- Use `@filename` to give Copilot precise context without copy-pasting
- Always **review permission prompts** carefully before approving
- `/undo` is your safety net — use it freely

---

## Next Step

→ **[Module 02 — TypeScript / Node.js Demo](../02-typescript-nodejs/DEMO.md)**
