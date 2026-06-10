# GitHub Copilot CLI — Cheat Sheet

> Print this page or keep it open as a quick reference during demo sessions.

---

## Installation & Auth

```bash
npm install -g @github/copilot-cli   # Install
copilot version                       # Verify
copilot login                         # Authenticate (browser flow)
copilot                               # Launch interactive session
```

---

## Launch Options

```bash
copilot                               # Standard interactive mode
copilot --mode=plan                   # Start in plan mode
copilot --mode=autopilot              # Start in autopilot (no prompts)
copilot --continue                    # Resume last session
copilot --resume                      # Pick a previous session
copilot --model=claude-haiku-4.5      # Use a specific model
copilot --name="my-session"           # Name this session
copilot -p "PROMPT" --allow-all-tools # One-shot programmatic
```

---

## Essential Slash Commands

| Command | What it does |
|---------|-------------|
| `/help` | Show all slash commands |
| `/model` | Switch AI model |
| `/clear` | Start a new conversation |
| `/undo` | Revert last file changes |
| `/diff` | Show all pending changes |
| `/context` | Show token usage |
| `/init` | Generate `copilot-instructions.md` |
| `/plan PROMPT` | Create a plan before coding |
| `/review` | Run code review on current diff |
| `/pr create` | Create a GitHub pull request |
| `/pr view` | View the current branch's PR |
| `/exit` | Exit the CLI |
| `/feedback` | Submit feedback to GitHub |
| `/allow-all on` | Enable all tool permissions |
| `/permissions show` | Show current tool permissions |
| `/session info` | Show session details |
| `/share file` | Export session to Markdown |
| `/share gist` | Export session to GitHub gist |

---

## Context Shortcuts

| Syntax | What it does |
|--------|-------------|
| `@filename.ts` | Include a file's content in context |
| `#123` | Include GitHub issue or PR #123 |
| `! git status` | Run a shell command directly |

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Shift + Tab` | Cycle modes: Standard → Plan → Autopilot |
| `Ctrl + L` | Clear screen |
| `Ctrl + R` | Reverse search history |
| `Shift + Enter` | Insert newline in prompt |
| `Ctrl + G` | Edit prompt in `$EDITOR` |
| `Ctrl + C` | Cancel current operation |
| `Ctrl + D` | Exit |
| `Esc` | Cancel / deny current tool request |
| `y` at prompt | Allow tool use (once) |
| `!` at prompt | Allow tool use (rest of session) |
| `n` at prompt | Deny tool use |

---

## Permission Flags

```bash
# Allow specific tools
--allow-tool='shell(npm)'          # Allow only npm commands
--allow-tool='shell(git)'          # Allow only git commands
--allow-tool='write'               # Allow file writes
--allow-all-tools                  # Allow all tools

# Deny specific tools (always takes priority)
--deny-tool='shell(rm)'            # Never allow rm
--deny-tool='shell(git push)'      # Never allow git push

# Combined example (safe autopilot)
copilot --allow-all-tools --deny-tool='shell(rm)' --deny-tool='shell(git push)'
```

---

## Top 30 Prompts by Category

### Understanding Code

```
What does this project do? Give me a summary of each file.
```
```
@src/app.ts explain this file in detail
```
```
What are the main architectural patterns used in this codebase?
```
```
Find all TODO comments in the src/ directory
```
```
Are there any obvious security vulnerabilities in this project?
```

### Fixing Bugs

```
Run the tests and fix any failures
```
```
@src/calculator.ts find and fix all bugs in this file
```
```
The tests are failing with this error: [paste error]. Fix it.
```
```
There is a null reference exception when calling GetById with an unknown id. Fix it.
```

### Adding Features (TypeScript)

```
Add a POST /calculate endpoint that validates input and returns the result
```
```
Replace all 'any' types with proper TypeScript types
```
```
Add input validation using zod to the Express routes in app.ts
```
```
Add rate limiting (max 100 requests per minute) to all routes
```
```
Generate Jest unit tests for the Calculator class with 100% branch coverage
```

### Adding Features (.NET / C#)

```
Add PUT and DELETE endpoints for /todos/{id} with 404 handling
```
```
Add xUnit tests for all methods in TodoService
```
```
Add Swagger/OpenAPI documentation to all endpoints
```
```
Make TodoService thread-safe using lock or ConcurrentDictionary
```
```
Add FluentValidation to validate the Todo model on POST requests
```

### Git & GitHub

```
Commit all staged changes with a descriptive commit message
```
```
Show me the last 10 commits and summarize what changed
```
```
/pr create
```
```
List all open issues assigned to me in my-org/my-repo
```
```
Create a GitHub Actions workflow that runs tests on every pull request
```
```
Show me the last failed CI run and explain what went wrong
```

### Refactoring

```
Refactor this file to follow the Single Responsibility Principle
```
```
Split the route handlers into separate files by resource
```
```
Convert all callback-based code to async/await
```
```
Replace magic numbers with named constants
```

### Documentation

```
Generate a README.md for this project with setup instructions, API reference, and examples
```
```
Add JSDoc comments to all exported functions
```
```
Write a CHANGELOG entry for the changes made in the last 3 commits
```

---

## Environment Variables

```bash
COPILOT_GITHUB_TOKEN=...    # Auth token (alternative to copilot login)
COPILOT_MODEL=claude-haiku-4.5   # Default model
COPILOT_ALLOW_ALL=true      # Auto-allow all tools (use carefully)
```

---

## Supported Models

| Model | Best for |
|-------|---------|
| `claude-sonnet-4.6` | General coding (default) |
| `gpt-5.4` | Complex reasoning |
| `claude-haiku-4.5` | Fast, cheap, simple tasks |
| `gpt-5.3-codex` | Code-heavy tasks |
| `gemini-3.1-pro-preview` | Google Gemini reasoning |
| `auto` | Let Copilot choose |

---

## Official Links

| Resource | URL |
|----------|-----|
| About Copilot CLI | https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli |
| Command Reference | https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference |
| Installation | https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli |
| Using Copilot CLI | https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli |
