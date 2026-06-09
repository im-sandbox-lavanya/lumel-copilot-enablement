/* app.js — AMI Firmware Dashboard (Demo 2) */

// Animate KPI counters on load
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".kpi-value").forEach(el => {
    const target = parseInt(el.textContent, 10);
    if (isNaN(target)) return;
    let current = 0;
    const step  = Math.max(1, Math.ceil(target / 25));
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 30);
  });

  // Highlight active nav on history navigation
  document.querySelectorAll(".nav-item").forEach(item => {
    if (item.getAttribute("href") === window.location.pathname) {
      item.classList.add("active");
    }
  });
});
