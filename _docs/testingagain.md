---
category: HSCP 3
order: 8
title: தமிழ் - Teacher Page
---

<script src="{{ site.baseurl }}/scripts/track.js">tracker();</script>
<style>
  .container {
    display: flex;
    flex-direction: row;
  }
  .sidebar {
    width: 200px;
    border-right: 1px solid #ccc;
    padding: 10px;
  }
  .content {
    flex-grow: 1;
    padding: 20px;
  }
  .week-button {
    display: block;
    margin: 10px 0;
    cursor: pointer;
  }
</style>

<div class="container">
  <!-- Sidebar for Week Buttons -->
  <div class="sidebar">
    <h3>Weeks</h3>
    <button class="week-button" onclick="showHomework(1)">Week 1</button>
    <button class="week-button" onclick="showHomework(2)">Week 2</button>
    <button class="week-button" onclick="showHomework(3)">Week 3</button>
    <button class="week-button" onclick="showHomework(4)">Week 4</button>
    <button class="week-button" onclick="showHomework(5)">Week 5</button>
  </div>

  <!-- Content Area -->
  <div class="content">
    <h2 id="week-title">Select a week to view homework</h2>
    <p id="homework-text"></p>
    <button id="assign-btn" onclick="assignHomework()" style="display:none;">Assign to Students</button>
  </div>
</div>

<script>
  const homeworkByWeek = {
    1: "Week 1 Homework: Write 5 Tamil sentences using the new vocabulary.",
    2: "Week 2 Homework: Read Chapter 2 and answer questions on page 5.",
    3: "Week 3 Homework: Practice the song for Pongal celebration.",
    4: "Week 4 Homework: Complete grammar worksheet on tenses.",
    5: "Week 5 Homework: Write a short essay about your family in Tamil."
  };

  function showHomework(week) {
    document.getElementById("week-title").innerText = "Week " + week;
    document.getElementById("homework-text").innerText = homeworkByWeek[week];
    document.getElementById("assign-btn").style.display = "inline-block";
  }

  function assignHomework() {
    alert("Homework assigned to all students in the section!");
    // TODO: Replace with backend call to assign to students
  }
</script>
