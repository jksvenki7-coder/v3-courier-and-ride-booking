// ==========================================
// V3 Group of Business
// admin.js
// ==========================================

import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const bookingList = document.getElementById("bookingList");

const totalBookings = document.getElementById("totalBookings");
const pendingBookings = document.getElementById("pendingBookings");
const completedBookings = document.getElementById("completedBookings");
const totalRevenue = document.getElementById("totalRevenue");

let allBookings = [];

// ==========================================
// Load Dashboard
// ==========================================

async function loadBookings() {

    bookingList.innerHTML = "<h3>Loading...</h3>";

    const bookingQuery = query(
        collection(db, "bookings"),
        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(bookingQuery);

    bookingList.innerHTML = "";

    let total = 0;
    let pending = 0;
    let completed = 0;
    let revenue = 0;

    allBookings = [];

    snapshot.forEach((bookingDoc) => {

        const data = bookingDoc.data();

        data.docId = bookingDoc.id;

        allBookings.push(data);

        total++;

        if (data.status === "Pending")
            pending++;

        if (data.status === "Delivered")
            completed++;

        revenue += Number(data.estimatedPrice || 0);

        bookingList.innerHTML += `

<div class="profile-card">

<h3>${data.bookingId}</h3>

<p><b>Customer :</b> ${data.customerName}</p>

<p><b>Mobile :</b> ${data.mobile}</p>

<p><b>Service :</b> ${data.service}</p>

<p><b>Status :</b> ${data.status}</p>

<p><b>Price :</b> ₹${data.estimatedPrice}</p>

<br>

<a class="primary-btn"
href="tracking.html?id=${data.docId}">

View

</a>

</div>

<br>

`;

    });

    totalBookings.innerText = total;

    pendingBookings.innerText = pending;

    completedBookings.innerText = completed;

    totalRevenue.innerText = "₹" + revenue;

}

loadBookings();

// ==========================================
// Live Search
// ==========================================

const searchBox = document.getElementById("searchBooking");

searchBox.addEventListener("keyup", () => {

    const keyword = searchBox.value.toLowerCase();

    const cards = document.querySelectorAll(".profile-card");

    cards.forEach(card => {

        const text = card.innerText.toLowerCase();

        if (text.includes(keyword)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});

// ==========================================
// Update Booking Status
// ==========================================

import {
    doc,
    updateDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

window.updateBookingStatus = async function (docId, status) {

    try {

        await updateDoc(doc(db, "bookings", docId), {

            status: status

        });

        alert("Status Updated Successfully");

        loadBookings();

    } catch (error) {

        console.error(error);

        alert("Failed to update status");

    }

};

// ==========================================
// Delete Booking
// ==========================================

window.deleteBooking = async function (docId) {

    const confirmDelete = confirm(
        "Delete this booking?"
    );

    if (!confirmDelete) return;

    try {

        await deleteDoc(
            doc(db, "bookings", docId)
        );

        alert("Booking Deleted");

        loadBookings();

    }

    catch (error) {

        console.error(error);

        alert("Unable to delete booking");

    }

};

// ==========================================
// Auto Refresh
// ==========================================

setInterval(() => {

    loadBookings();

}, 30000);
