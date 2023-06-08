import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, set, get, update, remove, ref, child } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsIo4dB67nxUgBZZKcau1dvul0IaAkLc4",
  authDomain: "cs346-shopweb.firebaseapp.com",
  databaseURL: "https://cs346-shopweb-default-rtdb.firebaseio.com",
  projectId: "cs346-shopweb",
  storageBucket: "cs346-shopweb.appspot.com",
  messagingSenderId: "550825126382",
  appId: "1:550825126382:web:22ec29fa6aa33150a4c6ff",
  measurementId: "G-039WHZ6JD0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

var email1 = document.querySelector("#email1");
var password1 = document.querySelector("#password1");
var signup = document.querySelector("#signup");

function InsertData(){
    set(ref(database, "Accounts/" + email1.value), {
        Email: email1.value,
        Password: password1.value
    })
}

signup.addEventListener('click', InsertData);
