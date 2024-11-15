// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, query, where, getDocs} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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

let countfulfilled = 0;
let countdays = 0;
let percentagefulfilled = 0;
let percentagenotfulfilled = 0;

function analysis(){
    percentagefulfilled = (countfulfilled / countdays) * 100;
    percentagenotfulfilled = 100 - percentagefulfilled;
    const kalorifulfill = document.getElementById('kaloriterpenuhi');
    kalorifulfill.textContent = `${percentagefulfilled.toFixed(2)} %`; 
    const kalorinotfulfill = document.getElementById('kaloritidakterpenuhi');
    kalorinotfulfill.textContent = `${percentagenotfulfilled.toFixed(2)} %`; 
    const daysanalysis = document.getElementById('jumlahhariyangdianalisa');
    daysanalysis.textContent = `${countdays}`; 
}

document.addEventListener('DOMContentLoaded',()=>{
    onAuthStateChanged(autentikasi, async(user)=>{
        if (user){
            try {
                const emailuser = user.email; 
                const userkuery = query(collection(database, 'savedata_users'), where('User', '==', emailuser));
        
                const exeKuery = await getDocs(userkuery);
                countdays = exeKuery.size;
                console.log("Jumlah dokumen yang ditemukan :", countdays);

                const buatKonteiner = document.querySelector('.kotaknya-kotak-save');
                buatKonteiner.innerHTML = ""; 
                exeKuery.forEach((doc)=>{
                    const dataneeds = doc.data();
                    const calory = dataneeds.Calory;
                    const caloriesCount = dataneeds.CaloriesCount;
                    const namaAktivitas = dataneeds.NamaKegiatan;
                    const tanggal = dataneeds.CreatedAt.toDate();

                    const buatElement = document.createElement('div');
                    buatElement.classList.add('kotak-save');
                    buatElement.innerHTML = `
                        <div class="kotak-save-left">
                            <div class="nama-scenario">${namaAktivitas}</div>
                            <div class="tanggal">${tanggal.toLocaleDateString()}</div>
                            <div class="Calory-needed">
                                <span class="cn1">Kalori yang dibutuhkan : </span>
                                <span class="cn2">${calory}</span>
                            </div>
                            <div class="Calory-consumed">
                                <span class="cc1">Kalori yang dikonsumsi : </span>
                                <span class="cc2">${caloriesCount}</span>
                            </div>
                        </div>
                    `;
                    buatKonteiner.appendChild(buatElement);

                    if (calory <= caloriesCount) {
                        countfulfilled = countfulfilled + 1;
                    } 
                });

                analysis();
            }
            
            catch (error) {
                console.error("Gagal dapatin dokumen karena : ", error);
            }
        }
        
        else {
            console.log("Pengguna belum masuk ke dalam akun!");
        }
    });
});