# Movie Library App

A React Native application that allows users to browse, like, and save movies using TMDb API and Firebase Authentication & Firestore.

## 🚀 Features

* 🔐 Firebase Authentication (Login / Register)
* 🏠 Home screen with popular movies
* 🔍 Search movies by genre and rating
* ❤️ Add to favorites (Firestore)
* 📄 Movie detail page
* 📱 Stack and Tab navigation

---

## 📱 Screens & Details

### 🏠 Home Tab

- Fetches and displays popular or trending movies from the TMDb API  
- Movie list includes poster, title, release date, etc.  
- Tapping a movie navigates to the **Movie Detail** screen  

### 🔍 Search Tab

- Filter movies by genre, rating, or both  
- Matching results are listed with lazy loading or pagination  
- Each movie item is tappable and navigates to **Movie Detail**  

### 🎬 Movie Detail Screen

- Shows detailed info about the selected movie (summary, genres, rating, etc.)  
- Includes a "Like" button to save the movie  
- Saves liked movies to the user’s **Firestore profile**  

### ❤️ Favorites Tab

- Displays all liked movies of the signed-in user  
- Retrieves data directly from **Firebase Firestore**  

---

## 🛠️ Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/berna-ikiz/MovieLibraryApp.git
```

3. **Install dependencies**

```bash
yarn install
```

4. **Run on Android**

```bash
yarn android
```

5. **Run on iOS**

```bash
cd ios
pod install
cd ..
yarn ios
```

## 🔐 Test User Accounts

Use these accounts to test login functionality:

* **User 1**
  Email: `test@gmail.com`
  Password: `test12345`

* **User 2**
  Email: `test2@gmail.com`
  Password: `test12345`

## 🧱 Folder Structure

```
/src
├── assets          # Static files (icons, images)
├── components      # Reusable UI components
├── navigation      # Navigation configuration
├── screens         # App screens (Home, Login, etc.)
├── services        # API and Firebase services
├── state           # Redux or Context setup
├── theme           # Colors, fonts, spacing
├── utils           # Helpers and constants
```

## 🔌 APIs Used

* [Firebase Authentication](https://firebase.google.com/docs/auth)
* [Firebase Firestore](https://firebase.google.com/docs/firestore)
* [TMDb API](https://developers.themoviedb.org/3)

To get an API key from TMDb:

1. Create a TMDb account
2. Navigate to settings > API
3. Generate a developer API key

