const { describe, it } = require('node:test');
const assert = require('node:assert');
const { createApp } = require('./app');

describe('Task Manager API', () => {
  it('should respond to health check', async () => {
    const server = createApp();
    server.listen(0);
    const { port } = server.address();

    const res = await fetch(`http://localhost:${port}/health`);
    const body = await res.json();

    assert.strictEqual(res.status, 200);
    assert.strictEqual(body.status, 'ok');
    server.close();
  });

  it('should create and retrieve a task', async () => {
    const server = createApp();
    server.listen(0);
    const { port } = server.address();

    const createRes = await fetch(`http://localhost:${port}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Test task', priority: 'high' }),
    });
    const task = await createRes.json();

    assert.strictEqual(createRes.status, 201);
    assert.strictEqual(task.title, 'Test task');
    assert.strictEqual(task.priority, 'high');
    assert.ok(task.id);

    const getRes = await fetch(`http://localhost:${port}/tasks/${task.id}`);
    const fetched = await getRes.json();
    assert.strictEqual(fetched.id, task.id);

    server.close();
  });
});
