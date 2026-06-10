# Module 04 — IDE vs CLI: When to Use Which

> This module is **reading + discussion** — no hands-on exercises.  
> Use it as a reference when deciding which tool to reach for.

---

## Side-by-Side Comparison

| Dimension | GitHub Copilot in IDE | GitHub Copilot CLI |
|-----------|----------------------|-------------------|
| **Where it lives** | Inside VS Code / JetBrains / Visual Studio | Inside any terminal |
| **Primary mode** | Inline completions + Chat sidebar | Conversational agent (chat or one-shot) |
| **Context awareness** | Deep IDE integration (open files, errors, LSP) | Directory-scoped (reads any file you reference) |
| **Execution** | Suggests code only — you run it | Can **execute** shell commands and modify files |
| **Autonomy** | Low — always requires you to accept/reject | High — can complete multi-step tasks autonomously |
| **Best for** | Writing code while you type | Running tasks while you think |
| **Runs when** | You are actively editing | You are in a terminal (including SSH / remote) |
| **Supports scripting** | No | Yes — `-p` flag for automation |
| **Multi-file tasks** | Edits open files | Works across the entire project tree |
| **PR creation** | No (needs GitHub website) | Yes — `/pr create` or natural language |
| **GitHub integration** | Limited (some extensions) | Built-in (issues, PRs, Actions via MCP) |
| **Offline / headless** | Requires IDE running | Works in CI, Docker, SSH |

---

## When to Use the IDE Extension

Use Copilot **in your IDE** when you are:

- **Actively writing new code** — inline completions are instant and context-aware
- **In the flow of development** — you want suggestions without switching context
- **Reviewing a small change** — the diff is right there in front of you
- **Using LSP features** — hover types, references, error squiggles guide the suggestions
- **Pairing the suggestion with compilation** — you see red underlines immediately

### Example IDE Strengths

```
// You type: function calculateTax(
// IDE Copilot instantly suggests the full function signature and body
// based on the types it can see in the surrounding code
```

---

## When to Use the CLI

Use Copilot **in the CLI** when you are:

- **Running a multi-step task** — "add an endpoint, write tests, create a PR"
- **Working in a terminal-only environment** — SSH session, CI pipeline, Docker container
- **Automating repetitive work** — batch renaming, code migrations, dependency audits
- **Working with Git/GitHub** — commit, PR, issue management without leaving the terminal
- **Starting a new project from scratch** — let Copilot scaffold the whole structure
- **Not in an IDE** — using Vim, nano, or a remote server

### Example CLI Strengths

```bash
# One command that does 10 manual steps:
copilot -p "Read all TypeScript files, find any function that has no JSDoc comment,
add a JSDoc block to each one, then run tsc to verify there are no type errors"
--allow-all-tools
```

---

## The Key Difference: Suggestions vs Actions

```
IDE Extension                    CLI
─────────────────────────────    ──────────────────────────────────
Suggests code                    Writes AND executes code
You accept/reject inline         You review tool permission prompts
Passive                          Active (agentic)
One file at a time               Whole project at once
```

---

## Advantages of Copilot CLI

### 1. Agentic — It Does the Work

The CLI is not just a code suggestor. It is an **autonomous agent** that can:
- Create and modify multiple files
- Run shell commands (`npm test`, `dotnet build`, `git commit`)
- Call the GitHub API (list issues, open PRs)
- Chain tasks together in one prompt

### 2. Terminal-First = Universal

Any language, any editor, any OS. Works over SSH. Works in Docker. Works in CI.

### 3. GitHub Integration Without a Browser

```
List all open issues assigned to me in my-org/my-repo
```

```
Create a PR from the current branch with a description of the changes I made today
```

```
Check the last 10 commits and write a CHANGELOG entry
```

### 4. Plan Mode — Think Before Acting

Press `Shift + Tab` to enter Plan mode. Copilot **asks clarifying questions** and builds a **structured plan** before touching a single file. This prevents costly misunderstandings on large tasks.

### 5. Session Memory

Copilot CLI remembers the entire conversation. You can say:

```
Actually, revert what you just did to calculator.ts and try a different approach
```

### 6. Programmatic / Scriptable

```bash
# Run in CI — no interactive UI needed
copilot -p "Run the test suite and if any test fails, output the failing test names" \
  --allow-tool='shell(npm)' \
  --output-format=json
```

---

## Advantages of the IDE Extension

### 1. Zero Friction for Code Completion

No context switching — suggestions appear as you type in exactly the right place.

### 2. Type-Aware Completions

The IDE extension uses the Language Server Protocol to understand types, imports, and errors — making completions more precise.

### 3. Better for Focused File Edits

When you are editing a single function and want a quick suggestion, the IDE extension is faster.

### 4. Visual Diff Review

Accepted suggestions appear as standard IDE diffs — easy to review with familiar tools.

---

## Rule of Thumb

```
                  "Am I writing code right now?"
                          │
               ┌──────────┴──────────┐
              YES                   NO
               │                    │
        Use IDE Extension     "Is it a multi-step task?"
                                    │
                         ┌──────────┴──────────┐
                        YES                   NO
                         │                    │
                    Use CLI (Plan mode)   Use CLI (Standard mode)
                                          or IDE Copilot Chat
```

---

## They Work Best Together

A typical workflow using **both**:

1. **IDE Extension** — write the feature (inline completions)
2. **CLI** — review the diff, run tests, fix errors, create the PR

```bash
copilot
> /diff         # review what I changed
> Run the tests and fix any failures
> /pr create    # open a PR with an AI-generated description
```

---

## Next Step

→ **[Module 05 — Advanced Features](../05-advanced/ADVANCED.md)**
