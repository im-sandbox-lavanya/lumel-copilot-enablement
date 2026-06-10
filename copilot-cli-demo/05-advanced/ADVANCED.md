# Module 05 — Advanced Features

> **Goal:** Explore Plan mode, Autopilot, PR creation, model switching, custom instructions, and programmatic use.  
> **Time:** ~15 minutes

---

## Feature 1 — Plan Mode

Plan mode is the safest way to tackle complex, multi-file tasks. Copilot **builds a numbered execution plan**, lets you review and amend it, then executes only when you say go.

### How to activate

Press `Shift + Tab` twice (cycles: Standard → Plan → Autopilot)  
or start the CLI in plan mode directly:

```bash
copilot --mode=plan
```

### Try it

Navigate to the TypeScript starter:

```bash
cd D:\GITHUB\lumel\copilot-cli-demo\02-typescript-nodejs\starter
copilot --mode=plan
```

Then ask:

```
Refactor the project so that:
1. All route handlers move to a new src/routes folder with one file per endpoint group
2. The Calculator class gets a generic history type parameter
3. All public methods have JSDoc comments
4. Existing tests (if any) still pass
```

Copilot will:
1. Ask clarifying questions
2. Output a numbered plan
3. Wait for your `go` or let you edit the plan
4. Execute step by step

---

## Feature 2 — Autopilot Mode

Autopilot is for **hands-off execution** — Copilot works without asking for tool permissions on each step.

> ⚠️ Only use autopilot when you trust the task is well-scoped and safe.

```bash
# Enable autopilot from the start
copilot --mode=autopilot

# Or toggle inside a session
/allow-all on
```

### Safe autopilot pattern

Allow only the tools you know you need:

```bash
copilot --mode=autopilot \
  --allow-tool='shell(npm)' \
  --allow-tool='write' \
  --deny-tool='shell(rm)'
```

---

## Feature 3 — Pull Request Creation

One of the most powerful CLI features: create a PR from the terminal in natural language.

### Prerequisites

You need a GitHub repository and the current branch must have un-merged commits.

```bash
cd your-project
git checkout -b feature/my-feature
# ... make some changes ...
git add . && git commit -m "Add feature"

copilot
```

Inside the session:

```
/pr create
```

Copilot will:
1. Analyze the diff between your branch and `main`
2. Generate a PR title and description
3. Ask you to review before submitting
4. Open the PR on GitHub.com

### Or with a custom description:

```
Create a pull request for the changes on this branch. The PR should explain what was changed and why. Target the main branch.
```

---

## Feature 4 — Model Switching

Switch models mid-session to match the task complexity:

```
/model
```

| Model | Best for | Credit cost |
|-------|---------|------------|
| `claude-sonnet-4.6` | General coding (default) | Medium |
| `gpt-5.4` | Complex reasoning | High |
| `claude-haiku-4.5` | Quick lookups, simple tasks | Low |
| `gpt-5.3-codex` | Code-heavy tasks | Medium |
| `gemini-3.1-pro-preview` | Google Gemini reasoning | High |

Or set it at startup:

```bash
copilot --model=claude-haiku-4.5    # Fast, cheap
copilot --model=gpt-5.4             # Maximum reasoning
copilot --model=auto                # Let Copilot pick
```

---

## Feature 5 — Custom Instructions (`/init`)

Custom instructions teach Copilot about your project conventions so you don't have to repeat them every session.

```
/init
```

Copilot analyzes your codebase and writes (or updates) `.github/copilot-instructions.md` with:
- Build and test commands
- Coding style preferences
- Project architecture notes
- Naming conventions

**Example output:**

```markdown
## Build
- Run `npm run build` to compile TypeScript
- Run `npm test` to run Jest tests

## Style
- Use `snake_case` for variables, `PascalCase` for classes
- All functions must have JSDoc comments

## Architecture
- Route handlers live in `src/routes/`
- Business logic lives in `src/services/`
```

After creating the file, **every future session** in this repo automatically loads these instructions.

---

## Feature 6 — Research Mode

Ask Copilot to do deep research on a topic combining your codebase + web sources:

```
/research How do I add rate limiting to an Express TypeScript API? Show me the recommended npm packages, best practices, and how to integrate it with our existing app.ts
```

Copilot uses its built-in `research` sub-agent to:
1. Search the web
2. Read your codebase for context
3. Produce a structured report

---

## Feature 7 — Code Review

Run Copilot's code review agent on your current changes:

```
/review
```

Or with a specific focus:

```
/review Focus on security vulnerabilities and input validation issues
```

The review agent (backed by `claude-sonnet-4.6`) analyzes the diff and reports:
- Bugs and logic errors
- Security issues
- Performance concerns
- Style violations

---

## Feature 8 — Session Management

Copilot CLI keeps session history. Pick up where you left off:

```bash
# Resume the most recent session
copilot --continue

# Browse and pick a session
copilot --resume

# Name a session for easy retrieval
copilot --name="todo-api-refactor"
```

Inside a session:

```
/session info          # show session details
/share file            # export session to Markdown
/share gist            # export to a GitHub gist
```

---

## Feature 9 — Parallel Subagents with `/fleet`

For large tasks, split work across multiple agents running in parallel:

```
/fleet Add JSDoc comments to all TypeScript files in src/. Run all files in parallel.
```

Copilot spawns sub-agents for each file simultaneously — much faster than sequential processing.

---

## Feature 10 — Connect to VS Code (`/ide`)

You can connect the CLI to VS Code so they share context:

```
/ide
```

This lets the CLI see which files are open in VS Code and use the IDE's diagnostics.

---

## Programmatic Use Examples

```bash
# One-shot: summarise this week's commits
copilot -p "Show me commits from the last 7 days and write a summary" \
  --allow-tool='shell(git)' \
  --silent

# CI: run tests and fail the pipeline if any fail
copilot -p "Run npm test. If any tests fail, exit with code 1 and list the failed tests." \
  --allow-tool='shell(npm)' \
  --output-format=json

# Batch: add types to all TS files
copilot -p "Find all TypeScript files with 'any' types and replace them with proper types." \
  --allow-all-tools \
  --autopilot
```

---

## Next Step

→ **[Module 06 — GitHub Integration](../06-github-integration/GITHUB.md)**
