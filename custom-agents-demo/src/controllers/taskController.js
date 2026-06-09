const { TaskStore } = require('../models/taskStore');
const { validateTask } = require('../utils/validation');

class TaskController {
  constructor() {
    this.store = new TaskStore();
  }

  getAll() {
    return this.store.findAll();
  }

  getById(id) {
    return this.store.findById(id);
  }

  create(data) {
    const errors = validateTask(data);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }

    return this.store.create({
      title: data.title,
      description: data.description || '',
      status: data.status || 'pending',
      priority: data.priority || 'medium',
    });
  }

  update(id, data) {
    const existing = this.store.findById(id);
    if (!existing) return null;

    return this.store.update(id, {
      title: data.title ?? existing.title,
      description: data.description ?? existing.description,
      status: data.status ?? existing.status,
      priority: data.priority ?? existing.priority,
    });
  }

  delete(id) {
    return this.store.delete(id);
  }
}

module.exports = { TaskController };
