// =====================================
// V3 Group of Business
// firebase.js
// =====================================

import CONFIG from "./config.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";

// Initialize Firebase
const app = initializeApp(CONFIG.FIREBASE);

// Services
const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);

// Export Services
export {
    app,
    auth,
    db,
    storage
};
