# Module 03 — .NET / C#

> **Goal:** Use Copilot CLI to scaffold, understand, extend, and test a .NET 8 Web API written in C#.  
> **Time:** ~20 minutes  
> **Prerequisite:** .NET 8 SDK installed (`dotnet --version` should show `8.x.x`)  
> **Start from:** `D:\GITHUB\lumel\copilot-cli-demo\03-dotnet-csharp\starter`

---

## Before You Start

Navigate to the starter project and verify it builds:

```bash
cd D:\GITHUB\lumel\copilot-cli-demo\03-dotnet-csharp\starter\TodoApi
dotnet build
dotnet run
```

The API starts on `http://localhost:5000`. Press `Ctrl + C` to stop it.

Then launch Copilot CLI:

```bash
# Go back to the starter root
cd D:\GITHUB\lumel\copilot-cli-demo\03-dotnet-csharp\starter
copilot
```

---

## What's in the Starter Project?

```
starter/
└── TodoApi/
    ├── TodoApi.csproj
    ├── Program.cs          ← Minimal API entry point
    ├── Models/
    │   └── Todo.cs         ← Todo entity
    └── Services/
        └── TodoService.cs  ← In-memory service (with intentional issues)
```

This is a **minimal .NET 8 REST API** for managing to-do items — with rough edges for you to fix.

---

## Exercise 1 — Understand the Codebase

```
Explain the structure of this .NET project. What pattern does it use? What does each file do?
```

Then:

```
@TodoApi/Services/TodoService.cs review this service. Are there any bugs, thread-safety issues, or missing validations?
```

---

## Exercise 2 — Fix Bugs in the Service

The `TodoService.cs` has a race condition and a missing null check. Ask Copilot:

```
Fix the thread-safety issue in TodoService.cs. Use a proper locking mechanism. Also add null checks for the 'title' parameter.
```

---

## Exercise 3 — Add Missing Endpoints

The API only has `GET /todos` and `POST /todos`. Ask Copilot to add the rest:

```
Add the following endpoints to Program.cs:
- PUT /todos/{id} to update a todo's title and completed status
- DELETE /todos/{id} to remove a todo by id
- GET /todos/{id} to fetch a single todo by id
Return 404 if the todo is not found. Use the TodoService for all operations.
```

Use **Plan mode** for this:
1. Press `Shift + Tab` → **Plan** mode
2. Type the prompt above
3. Review the plan before approving

---

## Exercise 4 — Add Data Validation

```
Add input validation to the POST /todos endpoint. The title field should:
- Be required (not null or empty)
- Be at most 200 characters long
Return a 400 Bad Request with a descriptive error message if validation fails.
```

---

## Exercise 5 — Generate xUnit Tests

```
Generate xUnit tests for TodoService. Cover:
- Adding a todo
- Getting all todos
- Getting a todo by id (found and not found)
- Updating a todo
- Deleting a todo
Place the tests in a new TodoApi.Tests project alongside TodoApi.
```

After Copilot creates the test project:

```
Run the tests and show me the output.
```

---

## Exercise 6 — Add OpenAPI / Swagger

```
Add Swagger/OpenAPI documentation to this .NET 8 Minimal API. Include XML comments for each endpoint. Configure it so the Swagger UI is available at /swagger when running in development.
```

---

## Exercise 7 — Programmatic One-Shot

Exit the interactive session and try a programmatic command:

```bash
# Find all TODO comments in the C# source files
copilot -p "Find all TODO comments in .cs files in the TodoApi folder" --allow-tool='shell(grep)'
```

```bash
# Check for any NuGet package vulnerabilities
copilot -p "Check the TodoApi.csproj for outdated or vulnerable NuGet packages and suggest updates" --allow-tool='shell(dotnet)'
```

---

## Prompts Reference for This Module

| Task | Prompt |
|------|--------|
| Understand structure | `Explain the structure of this .NET project` |
| Review for bugs | `Review TodoService.cs for bugs, thread-safety issues, and missing validations` |
| Add CRUD endpoints | `Add PUT, DELETE, and GET /todos/{id} endpoints to Program.cs` |
| Add validation | `Add input validation to the POST /todos endpoint` |
| Generate tests | `Generate xUnit tests for TodoService` |
| Add Swagger | `Add Swagger/OpenAPI documentation to this Minimal API` |
| Build and check | `Run dotnet build and fix any compilation errors` |
| Package audit | `Check TodoApi.csproj for outdated NuGet packages` |
| Dockerfile | `Generate a Dockerfile for this .NET 8 API` |

---

## What You Learned

- Copilot CLI understands C# / .NET project structure natively
- It can scaffold entire test projects (`xUnit`, etc.) without manual setup
- **Plan mode** prevents surprises when modifying multiple files
- One-shot (`-p`) commands integrate well with CI pipelines and scripts

---

## Next Step

→ **[Module 04 — IDE vs CLI Comparison](../04-ide-vs-cli/COMPARISON.md)**
