// ==========================================
// V3 Group of Business
// notifications.js
// Final Version 1.0
// ==========================================

import { db } from "./firebase.js";

import {
    collection,
    query,
    where,
    orderBy,
    getDocs,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// ===============================
// Customer Mobile
// ===============================

const phone = localStorage.getItem("userPhone");

if (!phone) {

    window.location.href = "login.html";

}

const notificationList =
document.getElementById("notificationList");

// ===============================
// Load Notifications
// ===============================

async function loadNotifications() {

    notificationList.innerHTML =
    "<h3>Loading...</h3>";

    const q = query(

        collection(db, "notifications"),

        where("mobile", "==", phone),

        orderBy("createdAt", "desc")

    );

    const snapshot = await getDocs(q);

    notificationList.innerHTML = "";

    if (snapshot.empty) {

        notificationList.innerHTML = `

<div class="profile-card">

<h3>No Notifications</h3>

<p>Your notifications will appear here.</p>

</div>

`;

        return;

    }

    snapshot.forEach((notificationDoc) => {

        const data = notificationDoc.data();

        const id = notificationDoc.id;

        notificationList.innerHTML += `

<div class="profile-card">

<h3>${data.title}</h3>

<p>${data.message}</p>

<p><b>Status :</b> ${data.status}</p>

<p><small>${data.createdAt?.toDate().toLocaleString() || ""}</small></p>

<br>

<button
class="primary-btn"
onclick="markAsRead('${id}')">

Mark as Read

</button>

</div>

<br>

`;

    });

}

loadNotifications();

// ===============================
// Mark As Read
// ===============================

window.markAsRead = async function(id){

    try{

        await updateDoc(

            doc(db,"notifications",id),

            {

                status:"Read"

            }

        );

        loadNotifications();

    }

    catch(error){

        console.error(error);

        alert("Unable to update notification.");

    }

};

// ===============================
// Auto Refresh
// ===============================

setInterval(loadNotifications,30000);
