"""
Demo 2 — Integrated Browser Usage
Flask-based Firmware Dashboard: demonstrates VS Code Simple Browser workflow.
"""
import json
import random
from datetime import datetime, timedelta
from flask import Flask, render_template, jsonify, request, abort

app = Flask(__name__)


# ---------------------------------------------------------------------------
# Mock data helpers
# ---------------------------------------------------------------------------

COMPONENTS = [
    {"id": 1, "name": "SEC Phase",        "module": "SecCore",        "version": "4.8.0.0", "status": "pass", "size_kb": 32},
    {"id": 2, "name": "PEI Core",         "module": "PeiCore",        "version": "4.8.0.0", "status": "pass", "size_kb": 64},
    {"id": 3, "name": "DXE Core",         "module": "DxeCore",        "version": "4.8.0.0", "status": "pass", "size_kb": 128},
    {"id": 4, "name": "BDS Phase",        "module": "BdsDxe",         "version": "4.8.0.0", "status": "warn", "size_kb": 96},
    {"id": 5, "name": "UEFI Shell",       "module": "Shell",          "version": "2.2.0.0", "status": "pass", "size_kb": 512},
    {"id": 6, "name": "SMM Core",         "module": "PiSmmCore",      "version": "4.8.0.0", "status": "fail", "size_kb": 48},
    {"id": 7, "name": "NVMe Driver",      "module": "NvmExpressDxe",  "version": "1.4.0.0", "status": "pass", "size_kb": 80},
    {"id": 8, "name": "Secure Boot",      "module": "SecurityPkg",    "version": "4.8.0.0", "status": "pass", "size_kb": 72},
    {"id": 9, "name": "ACPI Table",       "module": "AcpiTableDxe",   "version": "4.8.0.0", "status": "warn", "size_kb": 16},
    {"id": 10,"name": "USB3 Host",        "module": "XhciDxe",        "version": "3.0.1.0", "status": "pass", "size_kb": 104},
]

BUILD_LOG_ENTRIES = [
    {"ts": "08:01:02", "level": "INFO",  "msg": "Build started — target X64 Release"},
    {"ts": "08:01:05", "level": "INFO",  "msg": "Compiling SecCore/SecMain.c"},
    {"ts": "08:01:12", "level": "INFO",  "msg": "Compiling PeiCore/PeiMain.c"},
    {"ts": "08:01:28", "level": "WARN",  "msg": "BdsDxe: deprecated API BootManagerMenuLib used"},
    {"ts": "08:01:35", "level": "INFO",  "msg": "Compiling DxeCore/DxeMain.c"},
    {"ts": "08:01:52", "level": "ERROR", "msg": "PiSmmCore: NULL pointer dereference — SmmEntryPoint line 342"},
    {"ts": "08:01:53", "level": "INFO",  "msg": "Continuing with remaining modules…"},
    {"ts": "08:02:10", "level": "WARN",  "msg": "AcpiTableDxe: DSDT checksum mismatch — auto-corrected"},
    {"ts": "08:02:31", "level": "INFO",  "msg": "Linking firmware volume FV_MAIN"},
    {"ts": "08:02:45", "level": "INFO",  "msg": "Build complete — 9/10 modules OK, 1 error, 2 warnings"},
]

TEST_SUITES = [
    {"suite": "UEFI SCT — Boot Services",     "total": 42, "passed": 42, "failed": 0,  "skipped": 0},
    {"suite": "UEFI SCT — Runtime Services",  "total": 38, "passed": 36, "failed": 2,  "skipped": 0},
    {"suite": "SMM Handler Validation",        "total": 15, "passed": 10, "failed": 4,  "skipped": 1},
    {"suite": "Secure Boot Chain Verify",      "total": 20, "passed": 20, "failed": 0,  "skipped": 0},
    {"suite": "NVMe Protocol Tests",           "total": 12, "passed": 12, "failed": 0,  "skipped": 0},
    {"suite": "USB3 Enumeration Tests",        "total": 18, "passed": 17, "failed": 0,  "skipped": 1},
    {"suite": "ACPI DSDT Validation",          "total": 8,  "passed": 7,  "failed": 1,  "skipped": 0},
]


def _build_stats():
    total    = len(COMPONENTS)
    passing  = sum(1 for c in COMPONENTS if c["status"] == "pass")
    warnings = sum(1 for c in COMPONENTS if c["status"] == "warn")
    failing  = sum(1 for c in COMPONENTS if c["status"] == "fail")
    return {"total": total, "passing": passing, "warnings": warnings, "failing": failing}


def _test_summary():
    total   = sum(t["total"]   for t in TEST_SUITES)
    passed  = sum(t["passed"]  for t in TEST_SUITES)
    failed  = sum(t["failed"]  for t in TEST_SUITES)
    skipped = sum(t["skipped"] for t in TEST_SUITES)
    return {"total": total, "passed": passed, "failed": failed, "skipped": skipped}


# ---------------------------------------------------------------------------
# Page routes
# ---------------------------------------------------------------------------

@app.route("/")
def dashboard():
    stats     = _build_stats()
    test_sum  = _test_summary()
    return render_template("dashboard.html",
                           stats=stats,
                           test_sum=test_sum,
                           components=COMPONENTS,
                           build_time="08:02:45",
                           firmware_ver="AMI Aptio 5 — v4.8.0.0",
                           build_date=datetime.now().strftime("%Y-%m-%d"))


@app.route("/components")
def components():
    status_filter = request.args.get("status", "all")
    if status_filter != "all":
        filtered = [c for c in COMPONENTS if c["status"] == status_filter]
    else:
        filtered = COMPONENTS
    return render_template("components.html",
                           components=filtered,
                           status_filter=status_filter,
                           total=len(COMPONENTS))


@app.route("/build-log")
def build_log():
    return render_template("build_log.html", log_entries=BUILD_LOG_ENTRIES)


@app.route("/test-results")
def test_results():
    summary = _test_summary()
    return render_template("test_results.html",
                           suites=TEST_SUITES,
                           summary=summary)


# ---------------------------------------------------------------------------
# JSON API routes (demonstrates agent-accessible backend)
# ---------------------------------------------------------------------------

@app.route("/api/health")
def api_health():
    return jsonify({"status": "ok", "service": "ami-firmware-dashboard", "version": "4.8.0.0",
                    "uptime_s": random.randint(120, 9999)})


@app.route("/api/stats")
def api_stats():
    return jsonify({**_build_stats(), **_test_summary()})


@app.route("/api/components")
def api_components():
    return jsonify(COMPONENTS)


@app.route("/api/components/<int:cid>")
def api_component(cid):
    comp = next((c for c in COMPONENTS if c["id"] == cid), None)
    if comp is None:
        abort(404)
    return jsonify(comp)


@app.route("/api/log")
def api_log():
    return jsonify(BUILD_LOG_ENTRIES)


@app.route("/api/test-results")
def api_test_results():
    return jsonify({"summary": _test_summary(), "suites": TEST_SUITES})


# ---------------------------------------------------------------------------
# Error handlers
# ---------------------------------------------------------------------------

@app.errorhandler(404)
def not_found(e):
    return render_template("404.html"), 404


if __name__ == "__main__":
    app.run(debug=True, port=5000)
