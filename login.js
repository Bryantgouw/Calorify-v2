// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "YOUR API KEY",
  authDomain: "YOUR AUTH DOMAIN",
  projectId: "YOUR PROJECT ID",
  storageBucket: "YOUR STORAGE BUCKET",
  messagingSenderId: "YOUR MSG SENDER ID",
  appId: "YOUR APP ID",
  measurementId: "YOUR MEASURE ID"
};

const aplikasi = initializeApp(firebaseConfig);
const autentikasi = getAuth(aplikasi);

const login_form = document.getElementById('login');

login_form.addEventListener('submit', async(event)=>{
    event.preventDefault();

    const email = login_form.Email.value;
    const password = login_form.Password.value;

    try{
      const kredensial = await signInWithEmailAndPassword(autentikasi, email, password);
      
      window.location.href = 'homepage.html';
    } 
    catch(error) {
      console.error("Login gagal karena", error);
      alert("Akun Calorify tidak ditemukan! Pastikan anda memasukkan alamat email dan password yang benar");
    }
});

onAuthStateChanged(autentikasi, (user) => {
  if (user) {
    const Email = user.email;
    console.log("User masuk ke dalam aplikasi :", Email);
    sessionStorage.setItem('EmailUser', Email);
  } 
});