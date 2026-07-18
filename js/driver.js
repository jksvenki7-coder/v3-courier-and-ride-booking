// ==========================================
// V3 Group of Business
// driver.js
// Final Version 1.0
// ==========================================

import { db } from "./firebase.js";

import {
    collection,
    query,
    where,
    getDocs,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Driver Details
const driverName = document.getElementById("driverName");
const driverMobile = document.getElementById("driverMobile");
const driverStatus = document.getElementById("driverStatus");
const ordersContainer = document.getElementById("driverOrders");

// Demo Driver (Later Firebase Login nunchi vastundi)
const DRIVER = {
    name: "V3 Driver",
    mobile: "9876543210"
};

driverName.innerText = DRIVER.name;
driverMobile.innerText = DRIVER.mobile;

// ===============================
// Online / Offline
// ===============================

document.getElementById("goOnline").addEventListener("click", () => {

    driverStatus.innerText = "Online";

    alert("You are Online");

});

document.getElementById("goOffline").addEventListener("click", () => {

    driverStatus.innerText = "Offline";

    alert("You are Offline");

});

// ===============================
// Load Assigned Orders
// ===============================

async function loadOrders() {

    ordersContainer.innerHTML = "<h3>Loading...</h3>";

    const q = query(

        collection(db, "bookings"),

        where("status", "==", "Accepted")

    );

    const snapshot = await getDocs(q);

    ordersContainer.innerHTML = "";

    if (snapshot.empty) {

        ordersContainer.innerHTML = `

<div class="profile-card">

<h3>No Orders Available</h3>

</div>

`;

        return;

    }

    snapshot.forEach((bookingDoc) => {

        const data = bookingDoc.data();

        const id = bookingDoc.id;

        ordersContainer.innerHTML += `

<div class="profile-card">

<h3>${data.bookingId}</h3>

<p><b>Customer :</b> ${data.customerName}</p>

<p><b>Mobile :</b> ${data.mobile}</p>

<p><b>Pickup :</b> ${data.pickup}</p>

<p><b>Drop :</b> ${data.drop}</p>

<p><b>Price :</b> ₹${data.estimatedPrice}</p>

<p><b>Status :</b> ${data.status}</p>

<br>

<button onclick="pickupOrder('${id}')">

Pickup

</button>

<br><br>

<button onclick="deliverOrder('${id}')">

Delivered

</button>

<br><br>

<a href="tel:${data.mobile}">

Call Customer

</a>

<br><br>

<a target="_blank"

href="https://wa.me/91${data.mobile}">

WhatsApp Customer

</a>

</div>

<br>

`;

    });

}

loadOrders();

// ===============================
// Pickup
// ===============================

window.pickupOrder = async function(id){

    await updateDoc(

        doc(db,"bookings",id),

        {

            status:"Picked Up",

            driverName:DRIVER.name,

            driverMobile:DRIVER.mobile

        }

    );

    alert("Parcel Picked Up");

    loadOrders();

};

// ===============================
// Delivered
// ===============================

window.deliverOrder = async function(id){

    await updateDoc(

        doc(db,"bookings",id),

        {

            status:"Delivered"

        }

    );

    alert("Parcel Delivered");

    loadOrders();

};

// ===============================
// Auto Refresh
// ===============================

setInterval(loadOrders,30000);
