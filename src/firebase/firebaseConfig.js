import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAJmZvTW49xep3KTfzfPfd6GPWSMPM2XQA",
  authDomain: "livewebcammonetic.firebaseapp.com",
  projectId: "livewebcammonetic",
  storageBucket: "livewebcammonetic.firebasestorage.app",
  messagingSenderId: "1047913851911",
  appId: "1:1047913851911:web:f234aba68fb9a298834ea2",
  measurementId: "G-TG3GMGFYC7"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Authentification
export const auth = getAuth(app);

// Analytics (facultatif, seulement côté client, non sur GitHub Pages)
getAnalytics(app);
