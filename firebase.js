import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAO32OEz3UUdWdpA9RfhbArmls9l17vbRA",
  authDomain: "amazn-2-44376.firebaseapp.com",
  projectId: "amazn-2-44376",
  storageBucket: "amazn-2-44376.appspot.com",
  messagingSenderId: "586601561293",
  appId: "1:586601561293:web:6d8e885b2008a8d0853d84",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
