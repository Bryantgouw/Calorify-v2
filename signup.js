// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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
const database = getFirestore(aplikasi);

const signup_form = document.getElementById('signup');

signup_form.addEventListener('submit', async(event)=>{
  event.preventDefault();

  const username = signup_form.Username.value;
  const email = signup_form.Email.value;
  const password = signup_form.Password.value;

  try {
    const kredensial = await createUserWithEmailAndPassword(autentikasi, email, password);

    await setDoc(doc(database, 'calorify_users', kredensial.user.uid), {
      Username: username,
      Email: email,
      Password: password,
      CreatedAt: new Date()
    });

    window.location.href = '/login.html';
  } 

  catch(error) {
    console.error("Sign Up gagal karena ", error);
    alert("Proses Sign Up gagal! Pastikan password terdiri dari minimum 6 karakter");
  }
});