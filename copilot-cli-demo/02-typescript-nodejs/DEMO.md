# Module 02 — TypeScript / Node.js

> **Goal:** Use Copilot CLI to generate, understand, refactor, and test a real TypeScript/Node.js project.  
> **Time:** ~20 minutes  
> **Start from:** `D:\GITHUB\lumel\copilot-cli-demo\02-typescript-nodejs\starter`

---

## Before You Start

Navigate into the starter project and install dependencies:

```bash
cd D:\GITHUB\lumel\copilot-cli-demo\02-typescript-nodejs\starter
npm install
```

Then launch Copilot CLI from this folder:

```bash
copilot
```

---

## What's in the Starter Project?

```
starter/
├── package.json
├── tsconfig.json
└── src/
    ├── app.ts          ← Express HTTP server (basic)
    ├── calculator.ts   ← A class with intentional bugs
    └── types.ts        ← Shared TypeScript types
```

This is a simple **Express REST API** with some rough edges — perfect for practicing Copilot CLI.

---

## Exercise 1 — Understand the Codebase

```
Explain the overall structure of this TypeScript project. What does each file do and what is the purpose of the API?
```

Then dig into a specific file:

```
@src/calculator.ts explain this class in detail. Are there any bugs or improvements you can see?
```

---

## Exercise 2 — Fix a Bug

The `calculator.ts` file has a bug in the `divide` method. Ask Copilot to find and fix it:

```
The divide function in calculator.ts has a bug. Find it and fix it. Also add a guard against division by zero.
```

**Review the permission prompt carefully** — Copilot will ask to modify `calculator.ts`. Approve with `y`.

After the fix, verify it works:

```
! npx ts-node src/calculator.ts
```

---

## Exercise 3 — Add TypeScript Types

The API in `app.ts` uses `any` types in a few places. Ask Copilot to improve the type safety:

```
Replace all uses of 'any' in app.ts with proper TypeScript types. Use the types defined in types.ts where appropriate.
```

---

## Exercise 4 — Add a New Endpoint

```
Add a POST /calculate endpoint to app.ts that accepts a JSON body like:
{ "operation": "add", "a": 5, "b": 3 }
and returns the result. Use the Calculator class for the logic. Validate the input and return a 400 error for invalid operations.
```

This is a multi-step task — consider using **Plan mode** first:
1. Press `Shift + Tab` to switch to Plan mode
2. Type the prompt above
3. Review the plan, then approve

---

## Exercise 5 — Generate Tests

```
Generate Jest unit tests for the Calculator class in calculator.ts. Cover: add, subtract, multiply, divide (including division by zero). Place them in src/__tests__/calculator.test.ts
```

After Copilot creates the file:

```
Update package.json to add a "test" script that runs Jest with ts-jest. Then run the tests.
```

---

## Exercise 6 — Refactor for Readability

```
The app.ts file mixes setup and route handlers in one function. Refactor it to separate concerns: put route handlers in a separate src/routes.ts file and keep app.ts as the entry point only.
```

---

## Exercise 7 — Generate Documentation

```
Generate JSDoc comments for all exported functions and classes in this project. Keep the comments concise and developer-friendly.
```

---

## Exercise 8 — Programmatic Mode (Non-Interactive)

Exit the interactive session (`/exit`), then run a one-shot command:

```bash
copilot -p "List all TODO comments in the TypeScript source files in src/" --allow-tool='shell(grep)'
```

This demonstrates the **programmatic interface** — Copilot runs, completes the task, and exits.

---

## Prompts Reference for This Module

| Task | Prompt |
|------|--------|
| Understand project structure | `Explain the overall structure of this TypeScript project` |
| Find bugs | `Review calculator.ts for bugs and logic errors` |
| Add types | `Replace all 'any' types with proper TypeScript types` |
| Add endpoint | `Add a POST /calculate endpoint that uses the Calculator class` |
| Write tests | `Generate Jest tests for the Calculator class` |
| Refactor | `Separate route handlers into a routes.ts file` |
| Document | `Add JSDoc comments to all exports` |
| Search | `Find all TODO comments in src/` |
| Build check | `Run the TypeScript compiler and fix any errors` |

---

## What You Learned

- Copilot CLI can **read and understand** a full TypeScript project instantly
- **Plan mode** is invaluable for multi-file refactoring
- You can run **one-shot commands** with `-p` for scripting workflows
- The CLI handles **TypeScript-specific tasks** like type improvement and tsconfig adjustments

---

## Next Step

→ **[Module 03 — .NET / C# Demo](../03-dotnet-csharp/DEMO.md)**
