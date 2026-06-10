# Demo: Custom Agents & Handoffs (Node.js)

## Objective

Demonstrate **custom agent creation**, **tool restrictions**, and **handoff workflows** using a Node.js codebase. Show how different agents (Plan, Implement, Review) each have specialized tool access and can pass context between each other in a pipeline.

## Prerequisites

- VS Code with GitHub Copilot extension (v1.250+ for custom agents support)
- Node.js 18+ installed
- This workspace opened in VS Code

## Scenario

A Task Manager REST API is already built. We'll create a pipeline of 3 custom agents to plan, implement, and review a new feature — each with different tool permissions:

```
┌──────────┐    plan     ┌─────────────┐    code    ┌──────────┐
│   Plan   │───────────▶│  Implement   │──────────▶│  Review  │
│ (read +  │            │ (read+edit+  │           │ (read    │
│  docs/)  │            │  terminal)   │           │  only)   │
└──────────┘            └─────────────┘           └──────────┘
                              ▲                         │
                              │    critical issues      │
                              └─────────────────────────┘
```

---

## Setup (For Participants)

### Step 0: Verify the Project Works

```bash
cd custom-agents-demo
npm install
npm test
```

Then start the server and test:

```bash
npm start
# In another terminal:
curl http://localhost:3000/health
curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d "{\"title\":\"Hello World\"}"
curl http://localhost:3000/tasks
# Ctrl+C to stop the server
```

Confirm you see:
- ✅ 2 tests passing
- ✅ Health endpoint returns `{"status":"ok", ...}`
- ✅ Task creation and retrieval works

---

## Demo Steps

### Step 1: Create the Custom Agents

> **Goal:** Show that custom agents are just markdown files with YAML frontmatter. We'll create all three agents from scratch.

#### 1a. Create the Plan Agent

In Copilot Chat, type:

```
/create-agent
```

When prompted, provide these details:

```
Create an agent called "Plan" that:
- Analyzes codebases and creates implementation plans
- Has tools: read, search, edit
- Has handoffs to: implement
- Can ONLY write files inside the docs/ folder
- Must NOT edit source files, run terminal commands, or install packages
- Always saves its plan to docs/implementation-plan.md
- Follows a structured approach: understand the request → explore codebase → identify impact → produce plan
```

**What happens:** VS Code creates `.github/agents/plan.agent.md` automatically with the proper YAML frontmatter and instructions.

**Explain the generated frontmatter:**

| Field | Purpose |
|-------|---------|
| `name` | Display name in the Copilot Chat agent dropdown |
| `description` | How VS Code decides when to suggest this agent |
| `tools: [read, search, edit]` | Which tools the agent is allowed to use |
| `handoffs: ["implement"]` | Who this agent can pass work to next |

**Key point:** *The Plan agent has `edit` but its instructions restrict it to `docs/` only. Two layers of security: tool availability + instruction scoping.*

---

#### 1b. Create the Implement Agent

Again in Copilot Chat:

```
/create-agent
```

Provide:

```
Create an agent called "Implement" that:
- Has full access to write code and run commands
- Has tools: read, edit, search, execute, todo
- Has handoffs to: review
- Executes implementation plans from docs/implementation-plan.md
- Tracks progress using a todo list
- Implements incrementally, running npm test after each step
- Must not deviate from the plan without stating why
- Must not introduce unnecessary dependencies
- Hands off to the Review agent when done
```

**Key points to highlight:**
- `tools: [read, edit, search, execute, todo]` — full access: read, write, terminal commands, and progress tracking
- `handoffs: ["review"]` — after implementation, passes to Review
- Reads from `docs/implementation-plan.md` — context flows between agents via file artifacts
- **Skills auto-detection** — the workspace has a skill at `.github/skills/node-rest-api/SKILL.md` with `applyTo: "src/**"`. When the Implement agent touches files in `src/`, the skill auto-activates — no explicit reference needed. The skill instructs the agent to also generate an `api-tests.http` file and follow project conventions.

---

#### 1c. Create the Review Agent

```
/create-agent
```

Provide:

```
Create an agent called "Review" that:
- Is strictly read-only — can only read and search, NOT edit
- Has tools: read, search (NO edit, NO execute)
- Reviews code for bugs, security vulnerabilities, and quality issues
- Checks against OWASP Top 10, Node.js best practices, error handling
- Produces a structured report with severity levels (Critical / Warning / Info)
- Must NEVER edit files or run terminal commands — only report findings
```

**Key points:**
- `tools: [read, search]` — NO `edit` tool. The agent physically cannot modify files, regardless of instructions.
- No `handoffs:` — this is the terminal stage in the pipeline.

---

#### 1d. Create the Pipeline Orchestrator (Optional)

```
/create-agent
```

Provide:

```
Create an agent called "Pipeline" that:
- Orchestrates the Plan → Implement → Review workflow end-to-end
- Has tools: read, search, agent
- Has agents: plan, implement, review
- Delegates to Plan for analysis, Implement for execution, Review for quality
- If Review finds critical issues, sends them back to Implement, then re-reviews
- Does NOT implement code itself — only coordinates
```

**Key points:**
- `tools: [read, search, agent]` — the `agent` tool lets it invoke other agents
- `agents: [plan, implement, review]` — declares which agents it can delegate to

---

#### 1e. Verify Agents Appear

1. The agents should immediately appear in Copilot Chat's agent dropdown
2. If not, reload the window: `Ctrl+Shift+P` → **Developer: Reload Window**
3. Open the dropdown and confirm: **Plan**, **Implement**, **Review**, **Pipeline**
4. Check the file explorer — `.github/agents/` was created automatically with all four `.agent.md` files

**Summary of what we built:**

| Agent | Tools | Can Do | Cannot Do |
|-------|-------|--------|-----------|
| **Plan** | `read, search, edit` | Read code, write to `docs/` | Edit source, run commands |
| **Implement** | `read, edit, search, execute, todo` | Everything | — |
| **Review** | `read, search` | Read and analyze | Edit files, run commands |
| **Pipeline** | `read, search, agent` | Delegate to other agents | Direct edits |

---

### Step 2: Use the Plan Agent

1. Open Copilot Chat (`Ctrl+Shift+I`)
2. Select **Plan** from the agent dropdown (or type `@Plan`)
3. Enter:

```
Analyze this Task Manager API codebase. Plan how to add:
1. A search/filter endpoint (GET /tasks?status=pending&priority=high)
2. Rate limiting middleware (max 100 requests per minute per IP)
3. Request logging middleware (method, path, status code, duration)

Save the plan to docs/implementation-plan.md.
```

**What to observe:**
- ✅ Reads files to understand the codebase
- ✅ Produces a structured implementation plan
- ✅ Saves to `docs/implementation-plan.md` — a tangible artifact for the next agent
- ❌ Does NOT edit source files or run terminal commands

---

### Step 3: Prove the Tool Restrictions

Still using **@Plan**, try:

```
Go ahead and create src/middleware/rate-limiter.js with the implementation.
```

- ❌ The agent refuses — its instructions restrict writes to `docs/` only

Now switch to **@Review** and try:

```
Fix the issues you found — edit the files directly.
```

- ❌ The Review agent has no `edit` tool — it physically cannot make changes

**Key point:** *Two enforcement layers — the Plan agent has `edit` but is scoped by instructions. The Review agent doesn't have `edit` at all. Tool removal is the strongest enforcement; instruction scoping adds flexibility.*

---

### Step 4: Hand Off to the Implement Agent (Skill Auto-Activation)

1. Switch to **@Implement**
2. Enter:

```
Read the plan in docs/implementation-plan.md and execute it. Start with the search/filter endpoint, then rate limiting, then logging. Run tests after each step.
```

**What to observe:**
- ✅ Creates new files in `src/`
- ✅ Edits existing files (app.js, etc.)
- ✅ Runs `npm test` to verify
- ✅ Uses the todo list to track progress
- ✅ Has full terminal access
- ✅ **Auto-generates `api-tests.http`** — you never asked for this! The skill injected this behavior.

**Key point:** *The Plan agent saved to a file, and the Implement agent reads it. No copy-paste — context flows through workspace artifacts.*

> **Skill demo moment:** Open `api-tests.http` in VS Code. You'll see REST Client entries for every new endpoint — click "Send Request" to test them live. You never mentioned this file in any prompt. The skill at `.github/skills/node-rest-api/SKILL.md` auto-activated because the agent edited files matching `src/**`, and injected the convention to always produce a test file.
>
> **This is the value of skills:** encode your team's standards once, and every agent follows them automatically — without you repeating instructions each time.

---

### Step 5: Hand Off to the Review Agent

1. Switch to **@Review**
2. Enter:

```
Review the changes in this codebase. Check for:
- Security vulnerabilities (especially in rate limiting and input handling)
- Missing error handling
- Code quality issues
- Node.js best practices

Focus on any new middleware files and changes to src/app.js.
```

**What to observe:**
- ✅ Reads all modified files
- ✅ Checks for OWASP Top 10 issues
- ✅ Produces a structured review with severity levels
- ❌ Does NOT fix issues — it only reports them

**Key point:** *The Review agent is a senior developer doing code review. It identifies issues but can't fix them — that goes back through Implement, maintaining the audit trail.*

---

### Step 6: Pipeline Orchestrator (Optional)

1. Switch to **@Pipeline**
2. Give it a single feature request:

```
Add a PATCH /tasks/:id/status endpoint that only updates the status field. It should validate that status is one of: pending, in-progress, done. Return 400 for invalid values.
```

**What to observe:**
- Delegates to Plan → Implement → Review automatically
- Coordinates handoffs without manual switching
- Each sub-agent stays within its tool restrictions

---

## Summary for Presenter

| Concept | How It's Demonstrated |
|---------|----------------------|
| **Agent creation** | Step 1 — just markdown files with YAML frontmatter |
| **Tool restrictions** | Plan scoped to `docs/`; Review has NO edit tool |
| **Least privilege** | Each agent gets minimum tools for its role |
| **Handoffs** | `handoffs: ["implement"]` in frontmatter defines the flow |
| **Context passing** | Plan saves to `docs/` → Implement reads → Review reads source |
| **Two enforcement layers** | Tool removal (Review) + instruction scoping (Plan) |
| **Skills (auto-detection)** | `.github/skills/node-rest-api/SKILL.md` auto-activates on `src/**` files — agent generates `api-tests.http` without being asked |

---

## Bonus Demos (If Time Permits)

### Bonus A: Create an Agent Manually

Show the alternative to `/create-agent` — create an agent by hand to demonstrate it's just a markdown file:

1. Create `.github/agents/security-scanner.agent.md` directly in the file explorer
2. Add YAML frontmatter: `tools: [read, search]`, no `edit`
3. Write instructions focused on OWASP Top 10 scanning for Node.js
4. Show it appears in the dropdown immediately — no restart needed

This demonstrates both creation paths: command-driven (`/create-agent`) and manual (just create a `.md` file).

### Bonus B: Show Agent Conflict

Ask the Plan agent to run tests:

```
@Plan Run npm test and show me the results.
```

The agent explains it cannot execute terminal commands — the restriction is real, not just a suggestion.

### Bonus C: Review Existing Code

```
@Review Review this entire codebase for production readiness. Is it safe to deploy? What's missing?
```

Shows the Review agent working on the existing code, not just new changes.

---

## Files in This Demo

| File | Purpose |
|------|---------|
| `src/app.js` | HTTP server & routing (main code to extend) |
| `src/index.js` | Server entry point |
| `src/controllers/taskController.js` | Business logic for tasks |
| `src/models/taskStore.js` | In-memory data store |
| `src/utils/validation.js` | Input validation helpers |
| `src/utils/http.js` | HTTP response utilities |
| `src/app.test.js` | Test suite (2 tests) |
| `package.json` | Project configuration |
| `docs/` | Output folder for Plan agent artifacts |
| `.github/skills/node-rest-api/SKILL.md` | **Skill** — project conventions that auto-activate on `src/**` edits; instructs agents to generate `api-tests.http` and follow routing patterns |

**Created during the demo:**

| File | Purpose |
|------|---------|
| `.github/agents/plan.agent.md` | Planning agent (writes to `docs/` only) |
| `.github/agents/implement.agent.md` | Full-access implementation agent |
| `.github/agents/review.agent.md` | Read-only code review agent |
| `.github/agents/pipeline.agent.md` | Orchestrator that coordinates all three |
| `docs/implementation-plan.md` | Plan artifact (context passed between agents) |
| `api-tests.http` | Auto-generated by skill — REST Client file (click to test) |

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Agents don't appear in dropdown | Reload VS Code window; ensure `.github/agents/` path is correct |
| "Agent not found" error | Check filename matches `*.agent.md` pattern |
| Plan agent edits source files | Verify instructions restrict to `docs/` folder |
| Tests fail after implementation | Ask `@Implement`: "Fix the failing tests" |
| Handoff not working | Ensure `handoffs:` is in the YAML frontmatter |

---

## Key Takeaways

1. **Custom agents = role-based access control for AI** — each agent gets only the tools it needs
2. **Two layers of restriction** — tool removal (can't use it at all) + instruction scoping (can use it, but only for X)
3. **Artifact-based handoffs** — Plan writes to `docs/`, Implement reads from `docs/` — no copy-paste needed
4. **Agents are just markdown files** — easy to version control, share, and customize
5. **The pipeline pattern scales** — add security scanners, documentation generators, test writers as additional stages
6. **Skills = reusable team conventions** — `.github/skills/` files auto-activate based on file patterns (`applyTo: "src/**"`). No agent needs to explicitly reference the skill — it just kicks in. The visible proof: an `api-tests.http` file appears that you never asked for
