# Manayush - Digital Mental Health Support for Students

## Overview

Manayush is a confidential, AI-powered mental health and psychological support system designed specifically for students in higher education. This web application provides stigma-free tools to help students manage stress, anxiety, sleep issues, and academic pressure within their campus community.

## Features

- **AI First-Aid Chat**: Interactive AI-guided coping strategies and immediate support
- **Confidential Booking**: Private session booking with campus counselors or helpline callbacks
- **Psychoeducational Resources**: Curated mental health resources and educational materials
- **Peer Support Network**: Connect with fellow students for mutual support
- **Anonymous Campus Analytics**: Dashboard for administrators to track campus mental health trends
- **Multilingual Support**: Available in English and Hindi (Hinglish)
- **Responsive Design**: Optimized for desktop and mobile devices

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Variables for theming
- **Charts**: Chart.js for data visualization
- **Storage**: Local Storage for client-side data persistence
- **Fonts**: Google Fonts (Plus Jakarta Sans, DM Sans)

## Usage

1. **Home**: Overview of services and quick check-in
2. **AI First-Aid**: Chat with AI for immediate coping strategies
3. **Book Session**: Schedule confidential appointments
4. **Resources**: Access mental health educational materials
5. **Peer Support**: Connect with other students
6. **Dashboard**: Administrative analytics (for campus staff)

## Configuration

The app includes configurable campus settings in `app.js`:

```javascript
const CAMPUS = {
  name: "Your College",
  counsellorPhone: "+91 00000 00000"
};
```

Update these values to match your institution's details.

## Privacy & Confidentiality

- All data is stored locally in the browser
- No personal information is transmitted or stored on external servers
- Sessions are designed to be completely confidential
- Analytics are anonymous and aggregated

## License

This project is open-source and available under the MIT License.
