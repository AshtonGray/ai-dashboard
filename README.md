# AI Engineering Landing

A **React** frontend for AI Engineering offerings: main landing page, dedicated product pages, and learning path pages. Built with **Vite** and **React Router**. White, bubbly UI; data is local (no backend). The **Python Flask** backend is reserved for future use.

## Structure

```
ai-landingpage/
├── frontend/                 # React (Vite) app
│   ├── index.html            # Vite entry
│   ├── src/
│   │   ├── components/      # Header, Footer, Hero, cards, StateBadge
│   │   ├── data/             # offerings.js (products, learning paths)
│   │   ├── pages/            # HomePage, ProductPage, LearningPathPage
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── backend/                  # Python Flask (for future use, not connected)
│   ├── app.py
│   └── requirements.txt
└── README.md
```

## Requirements

- **Node.js** 18+

## Run

```bash
cd frontend
npm install
npm run dev
```

App runs at **http://localhost:3000**.

**Production build:**

```bash
npm run build
npm run preview
```

Preview serves the built app (default port 4173).

## Pages

| URL | Description |
|-----|-------------|
| `/` | Main landing: Products & Tools, Learning Paths |
| `/products/:id` | Product page (logo/name, details, state, materials, actions) |
| `/learning-paths/:id` | Learning path page (name, description, duration, topics, actions) |

## Product page contents

- Logo/name and tagline  
- Product description  
- Current state: **Available** \| **Pilot** \| **Evaluation**  
- Additional materials (e.g. evaluation notes)  
- User actions: **Self-service onboarding** or **Join pilot list**

## Backend (Flask, optional / future)

The backend in `backend/` is not used by the React app. Use it later for other tasks. To run it:

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
python app.py
```

API runs at **http://localhost:5000**.
