# NutriNest AI – Personalized Meal Planner 🍽️

NutriNest AI is a cross-platform mobile app built with [Expo](https://expo.dev) and React Native. It helps you generate personalized meal plans using AI, track your nutrition, and stay motivated on your health journey.

---

## 🚀 Project Overview

- **Personalized AI Meal Plans:** Get daily meal plans tailored to your goals, dietary needs, and preferences using Google Gemini AI.
- **Meal Planner & Calendar:** Plan and track your meals, save favorites, and visualize your nutrition streak.
- **Health Tips & Facts:** Explore daily health facts and actionable wellness tips.
- **User Authentication:** Secure sign up and login with Supabase.

---

## ✨ Features

- **AI-Powered Meal Plan Generation**
  - Input your goal, weight, height, age, activity level, and dietary restrictions.
  - Instantly receive a detailed meal plan (calories, macros, recipes, snacks).
- **Meal Planner Calendar**
  - Visualize your meal plans on a calendar.
  - Save meals for each day and track your streak.
- **Explore Section**
  - Browse health facts and everyday wellness tips.
- **Profile & Stats**
  - View saved meals, meal plans, and streaks.
- **Modern UI/UX**
  - Clean, responsive design with theming and haptics.

---

## 📱 Screenshots

> _Add screenshots or GIFs of the app here._

---

## 🛠️ Getting Started

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd meal-planner
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the app:**
   ```bash
   npx expo start
   ```
   - Open in Expo Go, iOS Simulator, or Android Emulator.

---

## ⚙️ Configuration

- **Supabase:**
  - The Supabase URL and anon key are currently hardcoded in `lib/supabaseClient.ts`.
- **Google Gemini API:**
  - The Gemini API key for meal plan generation is hardcoded in `app/(tabs)/index.tsx`.

> **Security Note:**
> For production, move all API keys to environment variables and use a `.env` file. See [Expo environment variables](https://docs.expo.dev/guides/environment-variables/) for setup.

---

## 📂 Folder Structure

```
meal-planner/
  app/              # App screens and routes (file-based routing)
    (auth)/         # Authentication screens (login, signup)
    (tabs)/         # Main app tabs (home, meals, planner, profile, explore)
    data/           # Static data (e.g., meals.json)
    +not-found.tsx  # 404 screen
  components/       # Reusable UI components
  constants/        # Theme and color constants
  hooks/            # Custom React hooks
  lib/              # Supabase client setup
  assets/           # Fonts and images
  scripts/          # Utility scripts (e.g., reset-project.js)
  ...
```

---

## 🔑 Scripts

- `npm start` – Start Expo development server
- `npm run reset-project` – Reset to a blank starter app
- `npm run android` / `npm run ios` / `npm run web` – Run on specific platforms
- `npm run lint` – Lint the codebase

---

## 🧩 Tech Stack

- [Expo](https://expo.dev/) + [React Native](https://reactnative.dev/)
- [Supabase](https://supabase.com/) (auth)
- [Google Gemini API](https://ai.google.dev/) (AI meal plan generation)
- [React Navigation](https://reactnavigation.org/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) (local storage)

---

## 🤝 Contributing

1. Fork the repo and create your branch.
2. Move API keys to environment variables for security.
3. Submit a pull request with a clear description.

---

## 📢 License

MIT

---

## �� Acknowledgements

- [Expo](https://expo.dev/), [Supabase](https://supabase.com/), [Google Gemini](https://ai.google.dev/), and the open-source community.

---

> _Built with ❤️ by Sakshi and contributors._
