**🎮 Tic-Tac-Toe Multiplayer (Firebase)**

A real-time multiplayer Tic-Tac-Toe web game built using HTML, CSS, JavaScript, and Firebase Firestore, allowing two players to play from different devices using a shared game link or code.

**🌐 Live Demo:**

👉 https://chimerical-dasik-bbebed.netlify.app/

**✨ Features**

🔄 Real-time Multiplayer Gameplay
🔗 Shareable Game Link & Game Code
⚡ Instant Move Synchronization using Firestore
🎯 Turn-based Logic (X & O)
🧠 Win & Draw Detection
🎨 Responsive & Modern UI
📋 Copy Invite Link Button
🔁 Restart Game Option

**🛠️ Technologies Used**

HTML5 – Structure
CSS3 – Styling & Responsiveness
Vanilla JavaScript – Game Logic
Firebase Firestore – Real-time database
Firebase SDK v8.10.0
Netlify – Deployment

**📁 Project Structure**

tic-tac-toe-multiplayer/
│
├── index.html        # Main UI
├── style.css         # Styling
├── index.js          # Game logic & Firebase sync
├── firebase-config.js# Firebase configuration
└── README.md         # Project documentation

**🎮 How to Play**

-> 🆕 Create a Game
-> Open the live site
-> Click "Create New Game"
-> Copy the Game Code or Invite Link
-> Share it with your friend
-> Wait for them to join
-> 🔗 Join a Game
-> Open the invite link
   OR
   Enter the Game Code manually
-> Click "Join Game"
-> Start playing!

**📜 Game Rules**

Player X always starts
Players take turns placing X or O
First to align 3 symbols wins
If all 9 cells fill with no winner → Draw
Game automatically locks after completion

**🔥 Firebase Setup (For Developers)**

1️⃣ Create Firebase Project
Go to https://console.firebase.google.com
Create a new project
Enable Firestore Database (Test mode)
2️⃣ Firestore Rules (Development)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}


⚠️ Note: These rules are for testing only.

**🚀 Deployment**

Netlify (Used)
Drag & drop project folder into Netlify
Instant deployment
Live URL generated automatically

**🧪 Testing Instructions**

Open the site in two different browsers / devices
Create a game in one
Join using the link/code in the other

**Verify:**

Turn switching
Real-time updates
Win / Draw logic

**🐛 Common Issues & Fixes**
Issue	Solution
Moves not working	Ensure correct turn logic
Firestore error	Check rules & Firebase config
Buttons disabled	Ensure isMyTurn logic updates before UI

**🔒 Security Notes**

Firestore rules currently allow public access
Firebase keys are client-side (OK for demo)

**For production:**

Add Firebase Authentication
Restrict Firestore rules
Enable App Check

**📈 Future Improvements**

🔐 User authentication
💬 In-game chat
🧾 Match history
⏱️ Turn timer
🧑‍🤝‍🧑 Spectator mode
🤖 AI opponent
🌙 Dark mode

**👩‍💻 Authors**

Surabhi Kumari
Samir Akash

Built as a learning project to understand real-time multiplayer systems using Firebase.

**📄 License**

MIT License
Free to use, modify, and distribute.

🎉 Enjoy the game & happy coding!