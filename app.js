
window.addEventListener("load", () => {
  localStorage.clear();
  sessionStorage.clear();
});


const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));


const i18n = {
  en: {
    tagline: "Digital Psychological Support for Students",
    "nav.home": "Home",
    "nav.chat": "AI First-Aid",
    "nav.booking": "Book Session",
    "nav.resources": "Resources",
    "nav.peer": "Peer Support",
    "nav.admin": "Dashboard",
    "nav.about": "About",
    panic: "Need Help?",
    "hero.title": "You're not alone. Support is one click away.",
    "hero.desc": "Confidential, stigma - free tools to help you manage stress, anxiety, sleep, and academic pressure - designed specifically for your campus community.",
    "hero.cta1": "Try AI First-Aid",
    "hero.cta2": "Book a Counsellor",
    "feat.ai": "AI-guided coping strategies",
    "feat.confidential": "Confidential appointments",
    "feat.local": "Regional languages & context",
    "feat.analytics": "Anonymous campus analytics",
    "hero.quickCheck": "Quick Check-In",
    "hero.quickCheckDesc": "How are you feeling today?",
    "hero.quickCheckCTA": "Get personalized tips →",
    "chat.selfcare": "🧘 Self-care Tools",
    "booking.title": "📅 Confidential Booking",
    "booking.desc": "Book a private session with your campus counsellor or request a helpline callback.",
    "resources.title": "📚 Psychoeducational Resources"
  },
  hi: {
    tagline: "छात्रों के लिए डिजिटल मनोवैज्ञानिक सहायता",
    "nav.home": "होम",
    "nav.chat": "एआई फर्स्ट-एड",
    "nav.booking": "सेशन बुक करें",
    "nav.resources": "संसाधन",
    "nav.peer": "पीयर सपोर्ट",
    "nav.admin": "डैशबोर्ड",
    "nav.about": "परिचय",
    panic: "तुरंत मदद चाहिए?",
    "hero.title": "आप अकेले नहीं हैं। सहायता बस एक क्लिक दूर है।",
    "hero.desc": "गोपनीय, कलंक-मुक्त उपकरण - तनाव, चिंता, नींद और शैक्षणिक दबाव में मदद - आपके कैम्पस के लिए।",
    "hero.cta1": "एआई फर्स्ट-एड आज़माएँ",
    "hero.cta2": "काउंसलर बुक करें",
    "feat.ai": "एआई आधारित कॉपिंग स्ट्रैटेजी",
    "feat.confidential": "गोपनीय अपॉइंटमेंट",
    "feat.local": "स्थानीय भाषा व संदर्भ",
    "feat.analytics": "अनाम एनालिटिक्स",
    "hero.quickCheck": "त्वरित चेक-इन",
    "hero.quickCheckDesc": "आज आप कैसा महसूस कर रहे हैं?",
    "hero.quickCheckCTA": "सलाह लें →",
    "chat.selfcare": "🧘 सेल्फ-केयर टूल्स",
    "booking.title": "📅 गोपनीय बुकिंग",
    "booking.desc": "कैंपस काउंसलर के साथ निजी सेशन बुक करें या हेल्पलाइन कॉल-बैक माँगें।",
    "resources.title": "📚 मनोशैक्षणिक संसाधन"
  }
};


const CAMPUS = {
  name: "Your College",
  counsellorPhone: "+91 00000 00000"
};


const store = {
  key: "manayush-data",
  
  read() {
    try {
      return JSON.parse(localStorage.getItem(this.key) || "{}");
    } catch {
      return {};
    }
  },
  
  write(data) {
    localStorage.setItem(this.key, JSON.stringify(data));
  },
  
  update(updater) {
    const data = this.read();
    const next = updater({ ...data });
    this.write(next);
    return next;
  }
};


function setRoute(id) {

  $$(".route").forEach(section => {
    section.classList.toggle("active", section.id === id);
  });
  
  
  $$(".nav-link").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.target === id);
  });
  
 
  $("#mainNav").classList.remove("open");
  
  
  if (id === "admin") renderAdmin();
  if (id === "resources") renderResources();
  if (id === "peer") renderPosts();
  
 
  window.scrollTo({ top: 0, behavior: "smooth" });
}


$$(".nav-link").forEach(btn => {
  btn.addEventListener("click", () => setRoute(btn.dataset.target));
});

$$("[data-jump]").forEach(btn => {
  btn.addEventListener("click", () => setRoute(btn.dataset.jump));
});


$("#mobileMenuBtn")?.addEventListener("click", () => {
  $("#mainNav").classList.toggle("open");
});


const langSelect = $("#langSelect");

function applyLanguage(lang) {
  const dict = i18n[lang] || i18n.en;
  
  $$("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key]) el.textContent = dict[key];
  });
  
 
  if ($("#resLang")) {
    $("#resLang").value = lang;
  }
  
  
  store.update(d => ({ ...d, lang }));
}

langSelect?.addEventListener("change", e => applyLanguage(e.target.value));


applyLanguage(store.read().lang || "en");


const yearEl = $("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();


const counsellorLine = $("#counsellorLine");
if (counsellorLine) counsellorLine.textContent = CAMPUS.counsellorPhone;

$("#panicBtn")?.addEventListener("click", () => {
  $("#panicModal")?.showModal();
});


const moodMessages = {
  calm: "Nice! Keep doing what works for you. Consider journaling what made today good. 🌟",
  stressed: "Try box-breathing: inhale 4s, hold 4s, exhale 4s, hold 4s. Repeat 4 times. 🧘",
  anxious: "Ground yourself: Name 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste. 🌍",
  sad: "It's okay to feel this way. A short walk or a chat with someone you trust may help. 💚",
  angry: "Pause and breathe. Splash cold water on your face or step away for a moment. 💧",
  tired: "Rest is important! A 20-minute power nap or gentle stretch could help restore energy. 😴"
};

$$(".mood-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const mood = btn.dataset.mood;
    
    
    $$(".mood-btn").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    
    
    const msgEl = $("#moodMsg");
    if (msgEl) {
      msgEl.textContent = moodMessages[mood] || "";
      msgEl.style.display = "block";
    }
    
   
    store.update(d => ({
      ...d,
      checkins: [...(d.checkins || []), { mood, ts: Date.now() }]
    }));
  });
});


$$(".chip[data-prompt]").forEach(chip => {
  chip.addEventListener("click", () => {
    const chatInput = $("#chatText");
    if (chatInput) {
      chatInput.value = chip.dataset.prompt;
      chatInput.focus();
    }
  });
});


function getBotReply(text) {
  const t = text.toLowerCase();
  const replies = [];
  
  // Keyword-based intent matching
  if (/sleep|insomnia|tired|rest/.test(t)) {
    replies.push("💤 Sleep tips: Maintain a fixed schedule, avoid screens 1 hour before bed, and try a 10-minute breathing exercise.");
  }
  
  if (/exam|exams|test|study|studies|academic|assign|homework/.test(t)) {
    replies.push("📚 Study stress relief: Try the Pomodoro technique (25 min focus, 5 min break), break large tasks into smaller ones, and set 3 priorities for today.");
  }
  
  if (/anx|panic|worry|nervous/.test(t)) {
    replies.push("😰 Anxiety first-aid: Try 5-4-3-2-1 grounding and slow exhale-focused breathing (inhale 4s, exhale 6-8s).");
  }
  
  if (/lonely|alone|isolation|no friends/.test(t)) {
    replies.push("💙 Feeling isolated is tough. Consider reaching out to a friend, joining a campus club, or simply taking a walk in a common area.");
  }
  
  if (/depress|hopeless|harm|suicide|kill|hurt myself/.test(t)) {
    replies.push("🆘 If you feel unsafe or have thoughts of self-harm, please use 'Need Help?' at the top for immediate support. You matter. 💚");
  }
  
  if (/relationship|friend|family|parent|roommate/.test(t)) {
    replies.push("💕 Relationship challenges are common. Consider talking to a counsellor who can provide confidential support and perspective.");
  }
  

  if (replies.length === 0) {
    replies.push("I'm here to help. 💬 Can you share a bit more about what you're feeling right now?");
  }
  
  
  
  return replies;
}

function addMessage(role, text) {
  const chatWindow = $("#chatWindow");
  if (!chatWindow) return;
  
  const msgDiv = document.createElement("div");
  msgDiv.className = `msg ${role}`;
  msgDiv.innerHTML = `<div class="bubble">${escapeHtml(text)}</div>`;
  
  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}


addMessage("bot", "Hi! I'm your support companion. 💚 Share what's on your mind, and I'll help with coping strategies.");


$("#chatForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const input = $("#chatText");
  const text = input?.value.trim();
  
  if (!text) return;
  

  addMessage("user", text);
  input.value = "";
  
  
  const replies = getBotReply(text);
  replies.forEach((reply, i) => {
    setTimeout(() => addMessage("bot", reply), 400 + (i * 600));
  });
});


$("#timerBtn")?.addEventListener("click", () => {
  const toolArea = $("#toolArea");
  if (!toolArea) return;
  
  let seconds = 180;
  toolArea.innerHTML = `
    <div style="text-align: center;">
      <p style="font-size: 16px; margin-bottom: 12px;">🧘 Focus on slow, deep breaths</p>
      <div style="font-size: 48px; font-weight: 700; color: var(--primary-600);" id="timerDisplay">3:00</div>
      <p style="margin-top: 8px; color: var(--text-muted);">Inhale deeply... hold... exhale slowly...</p>
    </div>
  `;
  
  const display = $("#timerDisplay");
  const interval = setInterval(() => {
    seconds--;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    display.textContent = `${mins}:${secs.toString().padStart(2, "0")}`;
    
    if (seconds <= 0) {
      clearInterval(interval);
      display.textContent = "✓ Done!";
      display.style.color = "var(--success)";
    }
  }, 1000);
});


$("#groundBtn")?.addEventListener("click", () => {
  const toolArea = $("#toolArea");
  if (!toolArea) return;
  
  toolArea.innerHTML = `
    <div>
      <p style="font-weight: 600; margin-bottom: 12px;">🌍 5-4-3-2-1 Grounding Exercise</p>
      <ol style="padding-left: 20px; line-height: 2;">
        <li><strong>5</strong> things you can <em>see</em> 👀</li>
        <li><strong>4</strong> things you can <em>touch</em> ✋</li>
        <li><strong>3</strong> things you can <em>hear</em> 👂</li>
        <li><strong>2</strong> things you can <em>smell</em> 👃</li>
        <li><strong>1</strong> thing you can <em>taste</em> 👅</li>
      </ol>
      <p style="margin-top: 12px; color: var(--text-muted); font-size: 13px;">Take your time with each one. This helps bring you back to the present moment.</p>
    </div>
  `;
});


$("#journalBtn")?.addEventListener("click", () => {
  const entry = prompt("📝 Write a quick journal entry:\n\nWhat's on your mind right now?");
  
  if (entry && entry.trim()) {
    store.update(d => ({
      ...d,
      journal: [...(d.journal || []), { text: entry.trim(), ts: Date.now() }]
    }));
    
    const toolArea = $("#toolArea");
    if (toolArea) {
      toolArea.innerHTML = `
        <div style="text-align: center;">
          <p style="font-size: 24px; margin-bottom: 8px;">✓</p>
          <p style="color: var(--success); font-weight: 600;">Journal entry saved!</p>
          <p style="color: var(--text-muted); font-size: 13px; margin-top: 8px;">You can export all your data from the footer.</p>
        </div>
      `;
    }
  }
});


$("#bookForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const topics = $$("input[name='topics']:checked", form).map(i => i.value);
  
  const booking = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    sid: formData.get("sid"),
    mode: formData.get("mode"),
    date: formData.get("date"),
    time: formData.get("time"),
    topics,
    notes: formData.get("notes") || "",
    ts: Date.now()
  };
  
 
  store.update(d => ({
    ...d,
    bookings: [...(d.bookings || []), booking]
  }));
  
  
  const msgEl = $("#bookMsg");
  if (msgEl) {
    msgEl.textContent = "✓ Request submitted successfully! You'll receive a confirmation via campus email.";
    msgEl.style.display = "block";
  }
  
  
  renderBookings();
  
  
  form.reset();
  
  
  setTimeout(() => {
    if (msgEl) msgEl.style.display = "none";
  }, 5000);
});

function renderBookings() {
  const list = $("#myBookings");
  const emptyState = $("#noBookings");
  if (!list) return;
  
  const { bookings = [] } = store.read();
  list.innerHTML = "";
  
  if (bookings.length === 0) {
    if (emptyState) emptyState.style.display = "block";
    return;
  }
  
  if (emptyState) emptyState.style.display = "none";
  
  bookings.slice().reverse().forEach(b => {
    const li = document.createElement("li");
    const topicsText = b.topics.length ? b.topics.join(", ") : "General";
    const modeIcon = b.mode === "online" ? "🖥️" : "📞";
    
    li.innerHTML = `
      <strong>${modeIcon} ${b.date} at ${b.time}</strong>
      <br>
      <span style="color: var(--text-muted);">Topics: ${topicsText}</span>
      <br>
      <span style="font-size: 12px; color: var(--text-muted);">${b.firstName} ${b.lastName} • ${b.email}</span>
    `;
    list.appendChild(li);
  });
}


renderBookings();


const RESOURCES = [
  { id: 1, lang: "en", type: "video", title: "Guided Breathing Exercise (3 min)", by: "Campus Wellness", url: "https://www.youtube.com/watch?v=DbDoBzGY3vo", tags: ["anxiety", "breathing", "calm"] },
  { id: 2, lang: "en", type: "guide", title: "Exam Stress Survival Toolkit", by: "Student Affairs", url: "#", tags: ["exam", "stress", "study"] },
  { id: 3, lang: "en", type: "audio", title: "Sleep Relaxation Meditation (10 min)", by: "Counselling Center", url: "#", tags: ["sleep", "relaxation"] },
  { id: 4, lang: "hi", type: "guide", title: "तनाव प्रबंधन - शुरुआती गाइड", by: "मनोविज्ञान विभाग", url: "#", tags: ["stress", "beginner"] },
  { id: 5, lang: "hi", type: "video", title: "नींद को बेहतर कैसे करें", by: "आईक्यूएसी", url: "#", tags: ["sleep", "tips"] },
  { id: 6, lang: "en", type: "guide", title: "Overcoming Loneliness: Small Steps", by: "Peer Support Team", url: "#", tags: ["lonely", "social"] },
  { id: 7, lang: "en", type: "video", title: "Understanding Anxiety", by: "Mental Health Team", url: "#", tags: ["anxiety", "education"] },
  { id: 8, lang: "en", type: "audio", title: "Morning Mindfulness (5 min)", by: "Wellness Center", url: "#", tags: ["mindfulness", "morning"] }
];

function renderResources() {
  const grid = $("#resGrid");
  if (!grid) return;
  
  const lang = $("#resLang")?.value || "en";
  const type = $("#resType")?.value || "all";
  const query = ($("#resSearch")?.value || "").toLowerCase();
  
  grid.innerHTML = "";
  
  const filtered = RESOURCES
    .filter(r => (lang === "all" || r.lang === lang))
    .filter(r => (type === "all" || r.type === type))
    .filter(r => !query || 
      r.title.toLowerCase().includes(query) || 
      r.tags.some(t => t.includes(query))
    );
  
  if (filtered.length === 0) {
    grid.innerHTML = '<p class="empty-state">No resources found matching your criteria.</p>';
    return;
  }
  
  filtered.forEach(r => {
    const typeIcon = { video: "🎬", audio: "🎧", guide: "📖" }[r.type] || "📄";
    
    const card = document.createElement("article");
    card.className = "resource-card";
    card.innerHTML = `
      <div class="resource-content">
        <div class="resource-meta">
          <span>${r.lang.toUpperCase()}</span>
          <span>${typeIcon} ${r.type.toUpperCase()}</span>
        </div>
        <h4>${r.title}</h4>
        <p style="font-size: 13px; color: var(--text-muted);">By ${r.by}</p>
        <a class="btn btn-secondary btn-sm" href="${r.url}" target="_blank" rel="noopener">
          Open Resource →
        </a>
      </div>
    `;
    grid.appendChild(card);
  });
}


["resLang", "resType", "resSearch"].forEach(id => {
  $("#" + id)?.addEventListener("input", renderResources);
});


renderResources();


const HARMFUL_PATTERNS = /(suicide|self-harm|kill myself|harm others|violence|want to die)/i;

$("#postForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const content = (formData.get("content") || "").trim();
  
  if (!content) return;
  
  const isFlagged = HARMFUL_PATTERNS.test(content);
  

  if (isFlagged) {
    $("#panicModal")?.showModal();
  }
  
  
  store.update(d => ({
    ...d,
    posts: [...(d.posts || []), { content, ts: Date.now(), flagged: isFlagged }]
  }));
  

  const msgEl = $("#postMsg");
  if (msgEl) {
    msgEl.textContent = "✓ Posted anonymously!";
    msgEl.style.display = "block";
  }
  
  form.reset();
  renderPosts();
  
  setTimeout(() => {
    if (msgEl) msgEl.style.display = "none";
  }, 3000);
});

function renderPosts() {
  const list = $("#postList");
  const emptyState = $("#noPosts");
  if (!list) return;
  
  const { posts = [] } = store.read();
  list.innerHTML = "";
  
  if (posts.length === 0) {
    if (emptyState) emptyState.style.display = "block";
    return;
  }
  
  if (emptyState) emptyState.style.display = "none";
  

  posts.slice().reverse().forEach(p => {
    const li = document.createElement("li");
    const date = new Date(p.ts).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
    
    li.innerHTML = `
      <div>${escapeHtml(p.content)}</div>
      <div class="post-time">
        ${date}
        ${p.flagged ? ' • <span class="flagged">⚠️ Under Review</span>' : ""}
      </div>
    `;
    list.appendChild(li);
  });
}


let moodChart = null;
let topicChart = null;

function renderAdmin() {
  const data = store.read();
  
 
  const userCount = 1 + (data.posts?.length ? 1 : 0) + (data.bookings?.length ? 1 : 0);
  $("#statUsers").textContent = userCount;
  $("#statCheckins").textContent = data.checkins?.length || 0;
  $("#statBookings").textContent = data.bookings?.length || 0;
  
 
  const moodCounts = (data.checkins || []).reduce((acc, c) => {
    acc[c.mood] = (acc[c.mood] || 0) + 1;
    return acc;
  }, {});
  
  const moodCanvas = $("#moodChart");
  if (moodCanvas && typeof Chart !== "undefined") {
    if (moodChart) moodChart.destroy();
    
    moodChart = new Chart(moodCanvas, {
      type: "doughnut",
      data: {
        labels: Object.keys(moodCounts),
        datasets: [{
          data: Object.values(moodCounts),
          backgroundColor: [
            "#10b981", "#f59e0b", "#6366f1", "#ef4444", "#ec4899", "#64748b"
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" }
        }
      }
    });
  }
  

  const topicCounts = {};
  (data.bookings || []).forEach(b => {
    (b.topics || []).forEach(t => {
      topicCounts[t] = (topicCounts[t] || 0) + 1;
    });
  });
  
  const topicCanvas = $("#topicChart");
  if (topicCanvas && typeof Chart !== "undefined") {
    if (topicChart) topicChart.destroy();
    
    topicChart = new Chart(topicCanvas, {
      type: "bar",
      data: {
        labels: Object.keys(topicCounts),
        datasets: [{
          label: "Bookings by Topic",
          data: Object.values(topicCounts),
          backgroundColor: "#14b8a6"
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 1 } }
        }
      }
    });
  }
}


$("#exportBtn")?.addEventListener("click", (e) => {
  e.preventDefault();
  
  const data = store.read();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = `manayush-export-${new Date().toISOString().split("T")[0]}.json`;
  link.click();
  
  URL.revokeObjectURL(url);
});

// ===== Utility Functions =====
function escapeHtml(str) {
  const entities = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  };
  return str.replace(/[&<>"']/g, m => entities[m]);
}


if (location.hash) {
  const target = location.hash.replace("#", "");
  if ($("#" + target)) {
    setRoute(target);
  }
}


console.log(`
%c🧠 Manayush — Mental Health Support Platform
%c
If you're viewing this, you might be interested in how this works!
This is a client-side demo with localStorage persistence.

Remember: You're not alone. 💚
`, 
  "color: #14b8a6; font-size: 18px; font-weight: bold;",
  "color: #64748b; font-size: 12px;",
  "color: #64748b; font-size: 11px;"
);
