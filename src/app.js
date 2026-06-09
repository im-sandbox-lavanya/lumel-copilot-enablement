const http = require('http');
const { TaskController } = require('./controllers/taskController');
const { parseBody, sendJson } = require('./utils/http');

function createApp() {
  const controller = new TaskController();

  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, `http://${req.headers.host}`);
      const path = url.pathname;
      const method = req.method;

      // CORS headers
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      if (method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
      }

      // Routes
      if (path === '/tasks' && method === 'GET') {
        const tasks = controller.getAll();
        sendJson(res, 200, tasks);
      } else if (path === '/tasks' && method === 'POST') {
        const body = await parseBody(req);
        const task = controller.create(body);
        sendJson(res, 201, task);
      } else if (path.match(/^\/tasks\/[\w-]+$/) && method === 'GET') {
        const id = path.split('/')[2];
        const task = controller.getById(id);
        if (task) {
          sendJson(res, 200, task);
        } else {
          sendJson(res, 404, { error: 'Task not found' });
        }
      } else if (path.match(/^\/tasks\/[\w-]+$/) && method === 'PUT') {
        const id = path.split('/')[2];
        const body = await parseBody(req);
        const task = controller.update(id, body);
        if (task) {
          sendJson(res, 200, task);
        } else {
          sendJson(res, 404, { error: 'Task not found' });
        }
      } else if (path.match(/^\/tasks\/[\w-]+$/) && method === 'DELETE') {
        const id = path.split('/')[2];
        const deleted = controller.delete(id);
        if (deleted) {
          sendJson(res, 204, null);
        } else {
          sendJson(res, 404, { error: 'Task not found' });
        }
      } else if (path === '/health' && method === 'GET') {
        sendJson(res, 200, { status: 'ok', uptime: process.uptime() });
      } else {
        sendJson(res, 404, { error: 'Not found' });
      }
    } catch (err) {
      console.error('Request error:', err);
      sendJson(res, 500, { error: 'Internal server error' });
    }
  });

  return server;
}

module.exports = { createApp };
