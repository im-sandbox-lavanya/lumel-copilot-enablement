// Program.cs
// Minimal API entry point for the TodoApi demo.
//
// EXERCISES for Copilot CLI:
//   Exercise 3: Add PUT /todos/{id}, DELETE /todos/{id}, GET /todos/{id}
//   Exercise 4: Add input validation to POST /todos
//   Exercise 6: Add Swagger/OpenAPI documentation

using TodoApi.Models;
using TodoApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Register the TodoService as a singleton
builder.Services.AddSingleton<TodoService>();

var app = builder.Build();

// GET /todos — return all todos
app.MapGet("/todos", (TodoService service) =>
{
    return Results.Ok(service.GetAll());
});

// POST /todos — create a new todo
app.MapPost("/todos", (TodoService service, Todo todo) =>
{
    // TODO: Add validation (Exercise 4)
    var created = service.Add(todo.Title);
    return Results.Created($"/todos/{created.Id}", created);
});

// TODO: Add GET /todos/{id}   (Exercise 3)
// TODO: Add PUT /todos/{id}   (Exercise 3)
// TODO: Add DELETE /todos/{id} (Exercise 3)

app.Run();
