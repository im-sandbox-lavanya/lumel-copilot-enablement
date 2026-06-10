/**
 * app.ts
 * A minimal Express REST API.
 *
 * EXERCISES for Copilot CLI:
 *   1. "Replace all 'any' types with proper TypeScript types"
 *   2. "Add a POST /calculate endpoint using the Calculator class"
 *   3. "Add input validation and proper error handling"
 */

import express, { Request, Response, NextFunction } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// GET /health
app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// GET /greet/:name
app.get("/greet/:name", (req: Request, res: Response) => {
  const { name } = req.params;
  res.json({ message: `Hello, ${name}!` });
});

// GET /items — returns a static list (placeholder)
app.get("/items", (_req: Request, res: Response) => {
  const items: any[] = [
    { id: 1, name: "Item A" },
    { id: 2, name: "Item B" },
    { id: 3, name: "Item C" },
  ];
  res.json(items);
});

// TODO: Add POST /calculate endpoint (Exercise 4 in DEMO.md)

// Basic error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("Try: GET /health  |  GET /greet/YourName  |  GET /items");
});

export default app;
