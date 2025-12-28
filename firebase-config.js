// firebase-config.js
console.log("🔥 Loading Firebase config...");

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1VzAY6REsdOhd4XRxncHSV2Bf22CJydo",
  authDomain: "tic-tac-toe-8d76b.firebaseapp.com",
  projectId: "tic-tac-toe-8d76b",
  storageBucket: "tic-tac-toe-8d76b.firebasestorage.app",
  messagingSenderId: "813773226910",
  appId: "1:813773226910:web:94bccc2917494a8e35cc8f",
  measurementId: "G-39YFCNTVEJ"
};

// Initialize Firebase
try {
  // Check if Firebase is already initialized
  if (!firebase.apps.length) {
    const app = firebase.initializeApp(firebaseConfig);
    console.log("✅ Firebase app initialized");
  } else {
    console.log("✅ Firebase app already initialized");
  }
  
  // Get Firestore instance
  const db = firebase.firestore();
  
  // Make it available globally
  window.db = db;
  console.log("✅ Firestore database ready");
  
  // Test connection
  db.collection('test').doc('init').set({
    initialized: true,
    timestamp: new Date().toISOString()
  }).then(() => {
    console.log("✅ Firebase test write successful");
  }).catch(error => {
    console.error("❌ Firebase test write failed:", error.message);
  });
  
} catch (error) {
  console.error("❌ Firebase initialization error:", error);
}