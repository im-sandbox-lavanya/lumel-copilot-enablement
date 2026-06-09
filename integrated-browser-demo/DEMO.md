# Demo 2 — Integrated Browser Usage
## Flask Firmware Dashboard · VS Code Simple Browser Demo

This Flask application is a **live demo** for Day 2, Section 2 — *Integrated Browser Usage*.
It shows how GitHub Copilot Agent Mode can build a full-stack web app and how VS Code's
**Simple Browser** lets you preview it side-by-side with your code.

---

### Pages

| Route | Description |
|-------|-------------|
| `/` | Dashboard — KPIs, donut chart, module table |
| `/components` | Firmware component cards with status filter |
| `/build-log` | Build output viewer with level filter |
| `/test-results` | UEFI SCT test suites with pass rate bars |
| `/api/health` | JSON health endpoint |
| `/api/stats` | JSON build + test summary |
| `/api/components` | JSON list of all modules |
| `/api/test-results` | JSON test suite data |

---

### Quick Start

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Start the dev server
python app.py

# 3. Open in VS Code Simple Browser
#    Command Palette → "Simple Browser: Show" → http://127.0.0.1:5000
```

---

### Demo Walkthrough (for trainer)

#### Step 1 — Start the server from Copilot Agent
Prompt Copilot Agent Mode:
```
Start the Flask app in demo2-flask-browser/ and open it in the Simple Browser.
```
Agent will: run `python app.py` in the terminal, detect port 5000, open Simple Browser.

#### Step 2 — Visual verification
```
Take a screenshot of the dashboard and verify the KPI cards render correctly.
```
Agent uses the `open_browser_page` / `screenshot_page` tools (or Playwright MCP) to capture
and analyse the rendered output.

#### Step 3 — Navigate and inspect
```
Click the "Components" link in the sidebar and verify the component cards appear
with correct status colours (green/yellow/red).
```

#### Step 4 — Filter interaction test
```
Click the "Fail" filter button on the Components page and verify only the
failed modules are shown.
```

#### Step 5 — API validation
```
Navigate to /api/health and verify the JSON response contains "status": "ok".
```

#### Step 6 — Fix a UI issue (instructor-led)
Introduce a deliberate bug (e.g., comment out the CSS import in base.html),
then let the agent identify and fix it using the browser's visual feedback.

---

### What this demo teaches

- VS Code Simple Browser opens **side-by-side** with code (no external browser needed)
- Copilot Agent can **start a dev server**, wait for it to be ready, then open the browser
- Agent uses `open_browser_page`, `screenshot_page`, `click_element` to **validate UI**
- The **self-healing loop**: build → preview → detect error → fix → re-preview
- JSON API routes give agents a structured way to validate backend data
