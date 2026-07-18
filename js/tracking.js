// ==========================================
// V3 Group of Business
// tracking.js
// ==========================================

import { db } from "./firebase.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// ===============================
// Get Booking Document ID
// ===============================

const params = new URLSearchParams(window.location.search);

const bookingDocId = params.get("id");

if (!bookingDocId) {

    alert("Booking Not Found");

    window.location.href = "my-orders.html";

}

// ===============================
// Load Booking
// ===============================

async function loadTracking() {

    try {

        const bookingRef = doc(db, "bookings", bookingDocId);

        const bookingSnap = await getDoc(bookingRef);

        if (!bookingSnap.exists()) {

            alert("Booking Not Found");

            return;

        }

        const booking = bookingSnap.data();

        document.getElementById("bookingId").innerText =
            booking.bookingId;

        document.getElementById("status").innerText =
            booking.status;

        document.getElementById("customerName").innerText =
            booking.customerName;

        document.getElementById("mobile").innerText =
            booking.mobile;

        document.getElementById("service").innerText =
            booking.service;

        document.getElementById("vehicle").innerText =
            booking.vehicle;

        document.getElementById("pickup").innerText =
            booking.pickup;

        document.getElementById("drop").innerText =
            booking.drop;

        document.getElementById("price").innerText =
            booking.estimatedPrice;

        // ===============================
        // Driver Details
        // ===============================

        document.getElementById("driverName").innerText =
            booking.driverName || "Not Assigned";

        document.getElementById("driverMobile").innerText =
            booking.driverMobile || "--";

        if (booking.driverMobile) {

            document.getElementById("callDriver").href =
                "tel:" + booking.driverMobile;

            document.getElementById("whatsappDriver").href =
                "https://wa.me/" + booking.driverMobile;

        }

    }

    catch (error) {

        console.error(error);

        alert("Unable to load booking.");

    }

}

loadTracking();

updatestatuscolour(booking.status);

checkcompleted(booking.status);

updatedriverlocation(

booking.driverlatitude,

booking.driverlongitude

  // ==========================================
// Google Map
// ==========================================

let map;
let marker;

function initMap(lat = 13.6288, lng = 79.4192) {

    if (typeof google === "undefined") return;

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: { lat, lng }
    });

    marker = new google.maps.Marker({
        position: { lat, lng },
        map: map,
        title: "Driver Location"
    });

}

// Default Map
window.addEventListener("load", () => {
    initMap();
});

// ==========================================
// Live Driver Location
// ==========================================

function updateDriverLocation(lat, lng) {

    if (!map || !marker) return;

    const location = { lat, lng };

    marker.setPosition(location);

    map.setCenter(location);

}

// ==========================================
// Booking Status Color
// ==========================================

function updateStatusColor(status) {

    const statusElement = document.getElementById("status");

    switch (status) {

        case "Pending":
            statusElement.style.color = "orange";
            break;

        case "Accepted":
            statusElement.style.color = "blue";
            break;

        case "Picked Up":
            statusElement.style.color = "purple";
            break;

        case "On The Way":
            statusElement.style.color = "green";
            break;

        case "Delivered":
            statusElement.style.color = "darkgreen";
            break;

        case "Cancelled":
            statusElement.style.color = "red";
            break;

        default:
            statusElement.style.color = "#333";

    }

}

// Update Status Color
const statusText = document.getElementById("status").innerText;
updateStatusColor(statusText);

// ==========================================
// Auto Refresh
// ==========================================

setInterval(() => {

    loadTracking();

}, 30000);

// ==========================================
// Rating
// ==========================================

window.rateDelivery = function () {

    const rating = prompt("Rate our Service (1-5)");

    if (!rating) return;

    alert("Thank You for Rating ⭐ " + rating);

};

// ==========================================
// Completed Message
// ==========================================

function checkCompleted(status) {

    if (status === "Delivered") {

        alert("✅ Parcel Delivered Successfully");

    }

}
