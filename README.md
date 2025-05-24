# 🌤️ Weather App

A simple React-based weather application that displays current and hourly weather details using the [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api). The app is containerized using Docker and orchestrated with Docker Compose.

---

## 🚀 Features

- 🌍 Search by city name or automatically detect current location
- 🌡️ Display temperature, wind speed, weather condition, and chance of rain
- 🕐 Shows 24-hour forecast
- 🔄 Refresh weather outlook manually
- 🎨 Optional animations with `framer-motion`
- 📦 Fully containerized with Docker

---

## 🛠️ Tech Stack

- React (Frontend)
- Axios (API calls)
- Framer Motion (Animations)
- Visual Crossing API (Weather data)
- Docker & Docker Compose

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
````

### 2. Add Your API Key

Go to [Visual Crossing Weather](https://www.visualcrossing.com/weather-api) and sign up for a free account.

In the project root, create a `.env` file and insert your key:

```env
REACT_APP_WEATHER_API_KEY=your_api_key_here
```

You can also add this inside `frontend/.env`.

---

## 🐳 Run with Docker

### Build and run the app:

```bash
docker-compose up --build
```

The app will be available at: [http://localhost:3000](http://localhost:3000)

---

## 🧪 API Usage Example

Test the API with curl:

```bash
curl "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Berlin?unitGroup=metric&key=YOUR_API_KEY&include=hours"
```

---
