# NoteMap - Front End

## Overview
NoteMap is a dynamic note-taking application that allows users to create folders and manage multiple notes within them. This front-end interface provides seamless user interaction with the application's features, including user authentication, folder and note management, and real-time synchronization with the back-end database.

## Key Features
- **User Authentication & Sessions:**
  - User login via the browser’s session mechanism.
  - Sessions authenticate and maintain the user state throughout the app.

- **Folder Management:**
  - Create, display, and manage folders in real-time.
  - Updates are immediately visible in the user interface.

- **Note Management:**
  - Create, edit, and delete notes within folders.
  - Real-time updates to the MongoDB database.

- **Real-Time Synchronization:**
  - Automatic UI updates for all changes (folders, notes, user info).

- **Session Handling:**
  - Secure session management, including logout and session expiration handling.

## Tech Stack
- **Frontend Framework:** React (Vite)
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **UI Components:** Lucide React

## Dependencies
```json
"dependencies": {
  "axios": "^1.7.9",
  "lucide-react": "^0.475.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^7.1.4"
}
```

## Instructions to Run the Code
1. **Clone the Repository:**
```sh
git clone https://github.com/Adeun-Ilemobola/Douglas.FullStack
cd Douglas.FullStack
```

2. **Install Dependencies:**
```sh
npm install
```

3. **Start the Development Server:**
```sh
npm run dev
```

4. **Access the Application:**
   Open your browser and navigate to:
```
http://localhost:3000
```

## Deployment
The application is live at: [NoteMap](https://inspiring-fairy-717701.netlify.app)

---

For back-end setup and API details, please refer to the [Back-End Repository](https://github.com/Adeun-Ilemobola/expressNodeVap).

