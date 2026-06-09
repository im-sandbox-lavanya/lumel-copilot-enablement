const crypto = require('crypto');

class TaskStore {
  constructor() {
    this.tasks = new Map();
  }

  findAll() {
    return Array.from(this.tasks.values());
  }

  findById(id) {
    return this.tasks.get(id) || null;
  }

  create(data) {
    const task = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.tasks.set(task.id, task);
    return task;
  }

  update(id, data) {
    const existing = this.tasks.get(id);
    if (!existing) return null;

    const updated = {
      ...existing,
      ...data,
      id, // prevent id override
      updatedAt: new Date().toISOString(),
    };
    this.tasks.set(id, updated);
    return updated;
  }

  delete(id) {
    return this.tasks.delete(id);
  }
}

module.exports = { TaskStore };
