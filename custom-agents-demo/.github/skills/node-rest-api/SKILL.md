---
name: node-rest-api
description: >
  Enforces project conventions for the Task Manager API.
  Ensures every code change includes an API test file and follows project patterns.
applyTo: "src/**"
---

# Task Manager API Skill

## Why This Skill Exists

Without this skill, an agent adding a new endpoint will just write the code and stop.
With this skill, the agent **automatically** also:
- Creates a ready-to-use `.http` test file so you can test instantly in VS Code
- Follows the project's existing routing and response patterns
- Runs tests to verify nothing broke

This is what makes skills powerful: they encode **team conventions** so every agent
follows the same standards — without you having to repeat instructions every time.

---

## Rules

### 1. Always generate `api-tests.http`

After adding or modifying ANY endpoint, create/update `api-tests.http` in the project root
using VS Code REST Client format:

```http
@baseUrl = http://localhost:3000

### [Descriptive Name]
METHOD {{baseUrl}}/path
Content-Type: application/json

{ body }
```

Every endpoint must have a corresponding test entry. Use `{{variable}}` for dynamic values.

### 2. Follow existing code patterns

- Routes go in `src/app.js` using the existing `if/else if` URL matching style
- Business logic goes in `src/controllers/taskController.js`
- Use `sendJson(res, statusCode, data)` from `src/utils/http.js` for responses
- Validate input using helpers in `src/utils/validation.js`

### 3. Run tests after changes

After implementing, run `npm test` and fix any failures before considering the task done.

### 4. Response format

All JSON responses use this structure:
- Success: return the resource directly (object or array)
- Error: `{ "error": "message" }` with appropriate HTTP status code
