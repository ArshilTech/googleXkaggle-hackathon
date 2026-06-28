<div align="center">

# 🧠 Manayush

### Digital Mental Health & Psychological Support for Students

[![License: MIT](https://img.shields.io/badge/License-MIT-14b8a6.svg?style=for-the-badge)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](index.html)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](styles.css)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](app.js)
[![Google Solution Challenge](https://img.shields.io/badge/Google_Solution_Challenge-4285F4?style=for-the-badge&logo=google&logoColor=white)](#)

<br/>

> *"You're not alone. Support is one click away."*

A **confidential, AI-powered** mental health and psychological support system designed specifically for students in higher education. Manayush provides stigma-free tools to help students manage stress, anxiety, sleep issues, and academic pressure within their campus community.

<br/>

> [!NOTE]
> 🚀 **This project is an upgrade of the SIH 2025 Internal Edition**, rebuilt from the ground up with enhanced features, a modern UI/UX, multilingual support, and a production-grade architecture for the **Google Solution Challenge**.

---

</div>

## 📑 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [📖 Usage Guide](#-usage-guide)
- [⚙️ Configuration](#️-configuration)
- [🔒 Privacy & Confidentiality](#-privacy--confidentiality)
- [🗺️ Roadmap](#️-roadmap)
- [📄 License](#-license)

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🤖 AI First-Aid Chat
Interactive AI-guided coping strategies with keyword-based intent matching. Provides immediate, context-aware support for stress, anxiety, sleep issues, loneliness, and more — with **crisis detection** that auto-surfaces emergency helplines.

</td>
<td width="50%">

### 📅 Confidential Booking
Private session booking with campus counselors or helpline callbacks. Students can select their preferred mode (online/phone), date, time, and relevant topics — all stored securely with **zero data transmission**.

</td>
</tr>
<tr>
<td width="50%">

### 📚 Psychoeducational Resources
Curated mental health resources filterable by **language**, **type** (video, audio, guide), and **keyword search**. Includes guided breathing exercises, exam stress toolkits, sleep meditation, and mindfulness content.

</td>
<td width="50%">

### 🤝 Peer Support Network
Moderated, anonymous peer support community where students can share thoughts safely. Features **content moderation** with automatic flagging of harmful content and community rules enforcement.

</td>
</tr>
<tr>
<td width="50%">

### 📊 Admin Analytics Dashboard
Campus-wide anonymous analytics with real-time tracking of unique users, mood check-ins, and session bookings. Visualized through interactive **Chart.js** doughnut and bar charts for data-driven insights.

</td>
<td width="50%">

### 🌐 Multilingual Support
Full **English** and **Hindi (हिन्दी)** support with a dynamic i18n translation system. All UI elements, navigation, hero sections, and feature descriptions adapt seamlessly to the selected language.

</td>
</tr>
<tr>
<td width="50%">

### 🧘 Self-Care Toolkit
Built-in wellness tools including a **3-minute breathing timer**, **5-4-3-2-1 grounding exercise**, and a **quick journal** — accessible directly alongside the AI chat for immediate relief.

</td>
<td width="50%">

### 🆘 Emergency Panic Button
One-click access to national helplines (Tele MANAS: 14416) and campus counselor contacts. The panic button is **always visible** in the header with a gentle pulse animation to ensure help is never more than a tap away.

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|:------|:-----------|:--------|
| **Structure** | HTML5 | Semantic markup with accessibility (ARIA) |
| **Styling** | CSS3 + CSS Variables | Custom theming, glassmorphism, responsive design |
| **Logic** | JavaScript (ES6+) | SPA routing, state management, i18n |
| **Charts** | Chart.js 4.4 | Interactive data visualization |
| **Typography** | Google Fonts | Plus Jakarta Sans, DM Sans |
| **Storage** | LocalStorage | Client-side data persistence |

---

## 🚀 Getting Started

### Prerequisites

- Any modern web browser (Chrome, Firefox, Edge, Safari)
- No build tools, package managers, or servers required

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/manayush.git

# Navigate to the project
cd manayush

# Open in browser — that's it!
start index.html        # Windows
open index.html         # macOS
xdg-open index.html     # Linux
```

> [!TIP]
> For the best development experience, use a local server like the **Live Server** VS Code extension to enable hot-reloading.

---

## 📖 Usage Guide

| Section | Description |
|:--------|:------------|
| 🏠 **Home** | Overview of services, quick mood check-in with personalized tips |
| 💬 **AI First-Aid** | Chat with AI for immediate coping strategies and self-care tools |
| 📅 **Book Session** | Schedule confidential counselor appointments (online or phone) |
| 📚 **Resources** | Browse curated mental health guides, videos, and audio content |
| 🤝 **Peer Support** | Share anonymously and connect with your campus community |
| 📊 **Dashboard** | Administrative analytics — mood trends, booking patterns |
| ℹ️ **About** | Mission, features, and privacy information |

---

## ⚙️ Configuration

Customize Manayush for your institution by updating the campus settings in [`app.js`](app.js):

```javascript
const CAMPUS = {
  name: "Your College",
  counsellorPhone: "+91 00000 00000"
};
```

| Parameter | Description |
|:----------|:------------|
| `name` | Your institution's display name |
| `counsellorPhone` | Campus counselor's contact number |

---

## 🔒 Privacy & Confidentiality

<table>
<tr>
<td>🗄️</td>
<td><strong>Local Storage Only</strong> — All data resides in the browser. Nothing leaves your device.</td>
</tr>
<tr>
<td>🚫</td>
<td><strong>Zero Data Transmission</strong> — No personal information is sent to external servers.</td>
</tr>
<tr>
<td>🔐</td>
<td><strong>Confidential Sessions</strong> — Booking details and journal entries are private by design.</td>
</tr>
<tr>
<td>📊</td>
<td><strong>Anonymous Analytics</strong> — Admin dashboard data is aggregated and fully de-identified.</td>
</tr>
<tr>
<td>📥</td>
<td><strong>Data Export</strong> — Students can export their personal data as JSON at any time.</td>
</tr>
</table>

> [!IMPORTANT]
> Manayush is **not a medical device**. It provides educational resources and first-aid guidance only. In emergencies, please contact your campus helpline or national emergency numbers immediately.

---

## 🗺️ Roadmap

- [ ] Backend integration with Firebase for persistent, encrypted storage
- [ ] Gemini API integration for advanced AI-powered conversations
- [ ] Push notifications for session reminders
- [ ] Expanded language support (Tamil, Telugu, Bengali)
- [ ] PWA support for offline access
- [ ] Role-based access for counselors and administrators

---

## 📄 License

This project is open-source and available under the **MIT License**.

---

<div align="center">

**Built with 💚 for student well-being**

*Manayush • Upgraded from SIH 2025 Internal Edition → Google Solution Challenge*

</div>
