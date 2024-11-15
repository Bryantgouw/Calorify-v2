// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzhdfltkBvXa64Y4p-WczOVTs6A1_aBAc",
  authDomain: "calorify-v3.firebaseapp.com",
  projectId: "calorify-v3",
  storageBucket: "calorify-v3.firebasestorage.app",
  messagingSenderId: "437839799724",
  appId: "1:437839799724:web:559e7b6e4d1678c4bd8609",
  measurementId: "G-SQGNDN1RT7"
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