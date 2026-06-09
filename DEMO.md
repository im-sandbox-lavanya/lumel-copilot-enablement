# Demo: Custom Agents & Handoffs (Node.js)

## Objective

Demonstrate **custom agent creation**, **tool restrictions**, and **handoff workflows** using a Node.js codebase. Show how different agents (Plan, Implement, Review) each have specialized tool access and can pass context between each other in a pipeline.

## Prerequisites

- VS Code with GitHub Copilot extension (v1.250+ for custom agents support)
- Node.js 18+ installed
- This workspace opened in VS Code

## Scenario

A Task Manager REST API is already built. We'll use a pipeline of 3 custom agents to plan, implement, and review a new feature — each with different tool permissions:

| Agent | Tools | Access Level |
|-------|-------|--------------|
| **Plan** | `read`, `search`, `edit` | Read + write to `docs/` only |
| **Implement** | `read`, `edit`, `search`, `execute`, `todo` | Full access |
| **Review** | `read`, `search` | Read-only + diagnostics |

```
┌──────────┐    plan     ┌─────────────┐    code    ┌──────────┐
│   Plan   │───────────▶│  Implement   │──────────▶│  Review  │
│ (read)   │            │ (read+edit+  │           │ (read)   │
│          │            │  terminal)   │           │          │
└──────────┘            └─────────────┘           └──────────┘
                              ▲                         │
                              │    critical issues      │
                              └─────────────────────────┘
```

---

## Setup (For Participants)

### Step 0: Clone and Verify the Project

```bash
# Clone or open the workspace
cd custom-agents-demo

# Verify the app works
npm test
npm start
# Ctrl+C to stop

# Test the API
curl http://localhost:3000/health
curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d "{\"title\":\"Hello World\"}"
curl http://localhost:3000/tasks
```

Confirm you see:
- ✅ 2 tests passing
- ✅ Health endpoint returns `{"status":"ok"}`
- ✅ Task creation works

---

## Demo Steps

### Step 1: Explore the Agent Definitions

Open and examine the three agent files:

| File | Key Properties |
|------|----------------|
| `.github/agents/plan.agent.md` | `tools: [read, search, edit]` — can only write to `docs/` |
| `.github/agents/implement.agent.md` | `tools: [read, edit, search, execute, todo]` — full access |
| `.github/agents/review.agent.md` | `tools: [read, search]` — cannot edit at all |

**What to point out:**
- The `tools:` frontmatter restricts what each agent can do
- The Plan agent has `edit` but is instruction-scoped to `docs/` only — two layers of control
- The `handoffs:` field defines who the agent passes work to next
- The `description:` field is how VS Code knows when to suggest the agent

---

### Step 2: Use the Plan Agent (Read-Only Analysis)

1. Open Copilot Chat (`Ctrl+Shift+I`)
2. Select the **Plan** agent from the agent dropdown (or type `@Plan`)
3. Enter this prompt:

```
Analyze the Task Manager API in this workspace. Plan how to add:
1. A search/filter endpoint (GET /tasks?status=pending&priority=high)
2. Rate limiting middleware (max 100 requests per minute per IP)
3. Request logging middleware (method, path, status code, duration)

Save the plan to docs/implementation-plan.md so the Implement agent can pick it up.
```

**What to observe:**
- ✅ The Plan agent reads files to understand the codebase structure
- ✅ It produces a structured implementation plan
- ✅ It saves the plan to `docs/implementation-plan.md` — creating a tangible artifact
- ❌ It does NOT attempt to edit source files or run commands

**Key talking point:** *"The Plan agent writes its output to a docs file — creating an artifact the next agent can pick up. It has the edit tool but is scoped to only write to `docs/`. This shows instruction-level scoping on top of tool availability."*

---

### Step 3: Demonstrate Tool Restriction (Proof)

Still using the **Plan** agent, try to trick it:

```
Actually, go ahead and create src/middleware/rate-limiter.js with the implementation.
```

**What to observe:**
- ❌ The agent will refuse — it's instructed to only write to `docs/`
- It has `edit` but won't touch `src/` — the instruction scoping works

Now switch to the **Review** agent and try:

```
@Review Fix the issues you found — edit the files directly.
```

- ❌ The Review agent has NO edit tool at all — it physically cannot make changes

**Key talking point:** *"Two layers of restriction in action: the Plan agent has edit but is scoped by instructions to `docs/` only. The Review agent doesn't have the edit tool at all — it can't write even if instructed to. Tool removal is the strongest enforcement; instruction scoping adds flexibility for agents that need limited write access."*

---

### Step 4: Hand Off to the Implement Agent

1. Switch to the **Implement** agent from the dropdown (or type `@Implement`)
2. Point it at the plan the Plan agent just saved:

```
Read the implementation plan in docs/implementation-plan.md and execute it.
Start with the search/filter endpoint, then add rate limiting, then logging.
Run tests after each step.
```

> **Why this works:** The Plan agent saved its output to `docs/implementation-plan.md` — a real file in the workspace. The Implement agent reads it directly. No copy-paste, no context loss, and there's an auditable artifact trail between agents.

**What to observe:**
- ✅ The Implement agent creates new files
- ✅ It edits existing files (app.js, etc.)
- ✅ It runs `npm test` to verify
- ✅ It uses the todo list to track progress
- ✅ It has full terminal access for running commands

**Key talking point:** *"Same workspace, different agent, completely different capabilities. The Implement agent can do everything the Plan agent cannot."*

---

### Step 5: Hand Off to the Review Agent

1. Switch to the **Review** agent from the dropdown (or type `@Review`)
2. Ask it to review what was just implemented:

```
Review the latest changes to this codebase. Check for:
- Security vulnerabilities (especially in the rate limiter and input handling)
- Missing error handling
- Code quality issues
- Whether the implementation follows Node.js best practices

Focus on src/middleware/ and any changes to src/app.js.
```

**What to observe:**
- ✅ The Review agent reads all modified files
- ✅ It checks for OWASP Top 10 issues
- ✅ It produces a structured review with severity levels
- ❌ It does NOT fix the issues itself — it only reports them

**Key talking point:** *"The Review agent acts like a senior developer doing code review. It can identify issues but intentionally cannot fix them — that forces the fix back through the Implement agent, maintaining the audit trail."*

---

### Step 6: Use the Pipeline Orchestrator (Optional Advanced Demo)

1. Switch to the **Pipeline** agent (or type `@Pipeline`)
2. Give it a single feature request:

```
Add a PATCH /tasks/:id/status endpoint that only updates the status field. 
It should validate that the status is one of: pending, in-progress, done.
Return 400 for invalid status values.
```

**What to observe:**
- The Pipeline agent delegates to Plan → Implement → Review automatically
- It coordinates the handoffs without manual switching
- Each sub-agent operates within its tool restrictions

---

## What to Highlight (Summary for Presenter)

| Concept | How It's Demonstrated |
|---------|----------------------|
| **Tool restrictions** | Plan agent scoped to `docs/` only; Review agent has NO edit tool |
| **Least privilege** | Each agent gets the minimum tools for its role |
| **Handoff transitions** | `handoffs: ["implement"]` in frontmatter defines the flow |
| **Context passing** | Plan saves to `docs/` → Implement reads from `docs/` → Review reads source |
| **Enforcement vs guidance** | Two layers: tool removal (Review) + instruction scoping (Plan) |
| **Node.js specific** | Agents understand CommonJS, HTTP patterns, npm workflows |

---

## Bonus Demos (If Time Permits)

### Bonus A: Create a New Agent Live

Use Copilot Chat to create a new agent on-the-fly:

```
/create-agent

Create a "Security Scanner" agent that:
- Has read-only access (tools: read, search)
- Specializes in finding OWASP Top 10 vulnerabilities in Node.js code
- Checks for: injection, broken auth, sensitive data exposure, XXE, broken access control
- Produces findings in a structured report with CVE references where applicable
```

Show how the `.github/agents/security-scanner.agent.md` file is created and immediately usable.

### Bonus B: Show Agent Conflict

Try using the Plan agent to run tests:

```
@Plan Run npm test and show me the results
```

The agent will explain it cannot execute terminal commands — demonstrating the restriction is real.

### Bonus C: Review the Existing Code

```
@Review Review this entire codebase for production readiness. 
Is it safe to deploy? What's missing?
```

This shows the Review agent working on existing code (not just new changes).

---

## Files in This Demo

| File | Purpose |
|------|---------|
| `.github/agents/plan.agent.md` | Planning agent (writes to `docs/` only) |
| `.github/agents/implement.agent.md` | Full-access implementation agent definition |
| `.github/agents/review.agent.md` | Read-only code review agent definition |
| `.github/agents/pipeline.agent.md` | Orchestrator that coordinates all three |
| `src/app.js` | HTTP server & routing (main code to extend) |
| `src/controllers/taskController.js` | Business logic |
| `src/models/taskStore.js` | In-memory data store |
| `src/utils/validation.js` | Input validation |
| `src/utils/http.js` | HTTP helper utilities |
| `src/app.test.js` | Test suite |
| `package.json` | Project configuration |

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Agents don't appear in dropdown | Restart VS Code; ensure `.github/agents/` path is correct |
| "Agent not found" error | Check filename matches `*.agent.md` pattern |
| Plan agent edits source | Check agent instructions restrict to `docs/` folder only |
| Tests fail after implementation | Ask Implement agent: `"Fix the failing tests"` |
| Handoff button not visible | Ensure `handoffs:` is in the YAML frontmatter |

---

## Key Takeaways for Participants

1. **Custom agents = role-based access control for AI** — each agent gets only the tools it needs
2. **Two layers of restriction** — tool removal (can't use it at all) + instruction scoping (can use it, but only for X)
3. **Artifact-based handoffs** — Plan writes to `docs/`, Implement reads from `docs/` — no copy-paste needed
4. **Agents are just markdown files** — easy to version control, share, and customize
5. **The pipeline pattern scales** — add security scanners, documentation generators, test writers as additional stages
