---
title: Teacher Homework Dashboard
layout: default
---

<h2 style="color:#1e90ff;">📘 Homework Dashboard</h2>

<div style="display:flex; gap: 30px;">
  <div style="width:200px; padding:10px; border-right: 1px solid #ddd;">
    <h4>Weeks</h4>
    <ul id="weekList" style="list-style:none; padding-left:0;"></ul>
  </div>

  <div style="flex:1; padding:10px;">
    <h4>Assignment</h4>
    <div id="assignmentBox" style="background:#f0f0f0; padding:15px; border-radius:8px; white-space:pre-wrap; font-family: monospace;"></div>
  </div>
</div>

<script>
  // Hardcoded homework JSON data from you
  const homeworkData = {
    1: {
      intro: [
        "தமிழ் உரையாடல் பயிற்சி . முழு வாக்கியங்களாக பேசவும்",
        "இன்றைய தலைப்பு \"பூங்கா\""
      ],
      conversations: [
        "நீ பூங்காவிற்கு சென்றிருக்கிறாயா?",
        "பூங்காவில் என்ன பார்த்தாய் ?",
        "பூங்காவில் விளையாட உனக்கு பிடிக்குமா ?",
        "உனக்கு பிடித்த பூங்காவின் பெயர் என்ன ?",
        "பூங்காவில் என்ன செய்வாய் ?"
      ],
      words: ["பூங்கா"],
      test: []
    },
    2: {
      intro: [
        "எச் எஸ் சி பி ஒன்றுக்கு உங்களை வரவேற்கிறோம்",
        "இன்றைய தலைப்பு \"பூங்கா\""
      ],
      conversations: [
        "உன் பெயர் என்ன ?",
        "நீ பூங்காவிற்கு சென்றிருக்கிறாயா?",
        "பூங்காவில் விளையாட உனக்கு பிடிக்குமா ?",
        "உனக்கு பிடித்த பூங்காவின் பெயர் என்ன ?",
        "பூங்காவில் என்ன செய்வாய் ?",
        "பூங்காவில் என்ன பார்த்தாய் ?",
        "நன்றி வணக்கம்"
      ],
      words: ["பூங்கா"],
      test: []
    },
    3: {
      intro: [
        "தமிழ் உரையாடல் பயிற்சி . முழு வாக்கியங்களாக பேசவும்",
        "இன்றைய தலைப்பு \"நன்றி மறவாத புலி\""
      ],
      conversations: [
        "உன் பெயர் என்ன ?",
        "புலியின் காலில் என்ன குத்தியது ?",
        "புலி காலில் இருந்த முள்ளை  எடுக்க முயற்சி செய்ததா?",
        "அவர் ஏன் புலியின் காலில் இருந்த முள்ளை எடுத்தார் ?",
        "கொள்ளைக்காரர்கள் ஏன் மனிதனை புலி இருந்த கூண்டினுள் தூக்கி போட்டனர் ?",
        "இந்த கதையிலிருந்து  நீ தெரிந்து கொண்டது என்ன ?",
        "நன்றி வணக்கம்"
      ],
      words: ["பூங்கா"],
      test: []
    },
    16: {
      intro: [
        "தமிழ் உரையாடல் பயிற்சி . முழு வாக்கியங்களாக பேசவும்",
        "இன்றைய தலைப்பு \"மரபு விளையாட்டுகள்\""
      ],
      conversations: [
        "உன் பெயர் என்ன ?",
        "ஜல்லிக்கட்டு  விளையாட்டை பார்த்திருக்கிறாயா ?",
        "நன்றி. வணக்கம்"
      ],
      words: ["மரபு விளையாட்டுகள்"],
      test: []
    },
    17: {
      intro: [
        "தமிழ் உரையாடல் பயிற்சி . முழு வாக்கியங்களாக பேசவும்",
        "இன்றைய தலைப்பு \"மரபு விளையாட்டுகள்\""
      ],
      conversations: [
        "உன் பெயர் என்ன ?",
        "உனக்குத் தெரிந்த மரபு விளையாட்டுகள் சிலவற்றை கூறு?",
        "கயிறு இழுத்தல் போட்டியில் நீ கலந்து கொண்டிருக்கிறாயா",
        "நீ உன் நண்பர்களுடன் கண்ணாம்பூச்சி விளையாட்டு விளையாண்டிருக்கிறாயா",
        "கபடி விளையாட தெரியுமா ?",
        "கபடியில் என்ன பாடி விளையாடுவார்கள் ?",
        "உறி அடித்தல் விளையாட்டு  பற்றி கூறு ?",
        "உன் நண்பர்களுடன் ஓடி பிடித்தல் விளையாடி இருக்கிறாயா ?",
        "ஆடும் புலி ஆட்டத்தில் எத்தனை புலி எத்தனை ஆடு இருக்கும் ?",
        "உனக்கு தாயம் விளையாட தெரியுமா ?",
        "பச்சைக் குதிரை எப்படி விளையாடுவார்கள் ?",
        "ஜல்லிக்கட்டு  விளையாட்டை பார்த்திருக்கிறாயா ?",
        "நன்றி. வணக்கம்"
      ],
      words: ["மரபு விளையாட்டுகள்"],
      test: []
    }
  };

  const weeks = Object.keys(homeworkData);
  const weekListEl = document.getElementById("weekList");
  const assignmentBox = document.getElementById("assignmentBox");

  function renderAssignment(week) {
    if (!homeworkData[week]) {
      assignmentBox.textContent = "❌ No homework found for week " + week;
      return;
    }
    const data = homeworkData[week];
    let text = "";
    text += "Intro:\n" + data.intro.join("\n") + "\n\n";
    text += "Conversations:\n" + data.conversations.map((c, i) => (i+1) + ". " + c).join("\n") + "\n\n";
    text += "Words:\n" + data.words.join(", ") + "\n\n";
    text += "Test:\n" + (data.test.length ? data.test.join("\n") : "No test questions.");
    assignmentBox.textContent = text;

    // highlight selected week link
    [...weekListEl.children].forEach(li => {
      li.classList.toggle("selected", li.dataset.week === week);
    });
  }

  // build week list with clickable items
  weeks.forEach(w => {
    const li = document.createElement("li");
    li.textContent = "Week " + w;
    li.style.cursor = "pointer";
    li.dataset.week = w;
    li.style.padding = "8px 6px";
    li.style.borderRadius = "4px";
    li.style.marginBottom = "6px";

    li.onclick = () => renderAssignment(w);

    weekListEl.appendChild(li);
  });

  // default display week 1 or first available week
  renderAssignment(weeks[0]);
</script>

<style>
  #weekList li.selected {
    background-color: #1e90ff;
    color: white;
    font-weight: 700;
  }
  #weekList li:hover:not(.selected) {
    background-color: #cce6ff;
  }
</style>
