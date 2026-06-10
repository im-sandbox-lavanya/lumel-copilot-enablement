// Services/TodoService.cs
// In-memory service for managing Todo items.
//
// INTENTIONAL ISSUES (find them with Copilot CLI!):
//   1. Thread-safety: _todos and _nextId are not protected against concurrent access
//   2. Missing null/empty check for the 'title' parameter in Add()
//   3. GetById returns the internal object reference (should return a copy)

using TodoApi.Models;

namespace TodoApi.Services;

public class TodoService
{
    private readonly List<Todo> _todos = new();
    private int _nextId = 1;

    public IEnumerable<Todo> GetAll()
    {
        return _todos;
    }

    public Todo? GetById(int id)
    {
        // BUG: Returns a direct reference — caller can mutate internal state
        return _todos.FirstOrDefault(t => t.Id == id);
    }

    public Todo Add(string title)
    {
        // BUG: No null/empty check on title
        // BUG: _nextId and _todos are not thread-safe
        var todo = new Todo
        {
            Id = _nextId++,
            Title = title,
            IsCompleted = false,
            CreatedAt = DateTime.UtcNow
        };
        _todos.Add(todo);
        return todo;
    }

    public bool Update(int id, string title, bool isCompleted)
    {
        var todo = _todos.FirstOrDefault(t => t.Id == id);
        if (todo is null) return false;
        todo.Title = title;
        todo.IsCompleted = isCompleted;
        return true;
    }

    public bool Delete(int id)
    {
        var todo = _todos.FirstOrDefault(t => t.Id == id);
        if (todo is null) return false;
        _todos.Remove(todo);
        return true;
    }
}
