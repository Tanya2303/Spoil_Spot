# 🧩 SpoilSpot Frontend

This is the **frontend** of **SpoilSpot**, a food spoilage intelligence web app that helps users track food expiration, visualize waste patterns, and explore sustainable solutions for expired food.

---

## 🚀 Tech Stack

| Category     | Tech Used                     |
|--------------|-------------------------------|
| Framework    | React.js                      |
| Styling      | Tailwind CSS                  |
| Routing      | React Router DOM              |
| State Mgmt   | Context API / useState        |
| APIs         | Firebase (Auth, Firestore), Gemini, Mapbox |
| Charts       | Chart.js / Recharts           |
| OCR (optional) | Google Vision API            |

---

## 🧪 Environment Variables

Create a `.env` file in the root of the frontend folder:

```env
VITE_FIREBASE_API_KEY=your-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_MAPBOX_TOKEN=your-mapbox-token
VITE_GEMINI_API_KEY=your-gemini-key


npm install firebase