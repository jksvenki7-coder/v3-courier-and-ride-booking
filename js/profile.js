// ==========================================
// V3 Group of Business
// profile.js
// ==========================================

import { auth, db, storage } from "./firebase.js";

import {
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

import {
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";

const saveBtn = document.getElementById("saveProfile");
const logoutBtn = document.getElementById("logout");
const imageUpload = document.getElementById("imageUpload");

const phone = localStorage.getItem("userPhone");

if (!phone) {
    window.location.href = "login.html";
}

// Display mobile number
document.getElementById("mobile").value = phone;

// ===============================
// Load Profile
// ===============================

async function loadProfile() {

    const profileRef = doc(db, "users", phone);

    const profileSnap = await getDoc(profileRef);

    if (profileSnap.exists()) {

        const data = profileSnap.data();

        document.getElementById("name").value = data.name || "";

        document.getElementById("email").value = data.email || "";

        document.getElementById("address").value = data.address || "";

        document.getElementById("city").value = data.city || "";

        document.getElementById("state").value = data.state || "";

        document.getElementById("pincode").value = data.pincode || "";

        if (data.photo) {

            document.getElementById("profileImage").src = data.photo;

        }

    }

}

loadProfile();

// ===============================
// Save Profile
// ===============================

saveBtn.addEventListener("click", async () => {

    let photoURL = "";

    if (imageUpload.files.length > 0) {

        const file = imageUpload.files[0];

        const storageRef = ref(storage, "profiles/" + phone);

        await uploadBytes(storageRef, file);

        photoURL = await getDownloadURL(storageRef);

    }

    const profile = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        phone: phone,

        address: document.getElementById("address").value,

        city: document.getElementById("city").value,

        state: document.getElementById("state").value,

        pincode: document.getElementById("pincode").value,

        photo: photoURL,

        updatedAt: new Date().toISOString()

    };

    await setDoc(doc(db, "users", phone), profile);

    alert("Profile Saved Successfully");

});

// ===============================
// Logout
// ===============================

logoutBtn.addEventListener("click", async () => {

    await auth.signOut();

    localStorage.clear();

    window.location.href = "login.html";

});
