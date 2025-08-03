---
title: Teacher Homework Dashboard
layout: default
---

<h2 style="color:#1e90ff;">📘 Homework Dashboard</h2>

<div style="display:flex;">
  <div style="width:220px; padding:10px;">
    <h4>Weeks</h4>
    <ul id="weekList"></ul>
  </div>

  <div style="flex:1; padding:10px;">
    <h4>Assignment</h4>
    <pre id="assignmentBox" style="background:#f0f0f0; padding:12px; white-space:pre-wrap;"></pre>
    <button id="assignButton">📤 Assign to Students</button>
  </div>
</div>

<script>
  const weeks = [1, 2, 3, 5, 16, 17, 18]; // same keys as backend
  const weekListEl = document.getElementById("weekList");
  const assignmentBox = document.getElementById("assignmentBox");

  function loadWeek(week) {
    fetch("/api/homework/" + week)
      .then((res) => res.json())
      .then((data) => {
        assignmentBox.textContent = data.instructions || "No instructions found.";
      })
      .catch(() => {
        assignmentBox.textContent = "❌ Failed to load assignment.";
      });
  }

  weeks.forEach((w) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="#" onclick="loadWeek(${w})">Week ${w}</a>`;
    weekListEl.appendChild(li);
  });

  loadWeek(weeks[0]); // default to week 1

  document.getElementById("assignButton").onclick = () => {
    alert("✅ Assigned to students!");
  };
</script>
