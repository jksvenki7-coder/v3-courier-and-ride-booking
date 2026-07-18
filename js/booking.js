// ==========================================
// V3 Group of Business
// booking.js
// ==========================================

import { db } from "./firebase.js";

import {
    doc,
    getDoc,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// ===============================
// Load Customer Profile
// ===============================

const phone = localStorage.getItem("userPhone");

if (!phone) {
    window.location.href = "login.html";
}

async function loadCustomer() {

    try {

        const userRef = doc(db, "users", phone);

        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {

            const data = userSnap.data();

            document.getElementById("customerName").value = data.name || "";

            document.getElementById("mobile").value = phone;

        }

    } catch (error) {

        console.error(error);

        alert("Unable to load profile.");

    }

}

loadCustomer();

// ===============================
// Calculate Price
// ===============================

const calculateBtn = document.getElementById("calculatePrice");

calculateBtn.addEventListener("click", () => {

    const vehicle = document.getElementById("vehicle").value;

    let price = 0;

    switch (vehicle) {

        case "Bike":
            price = 50;
            break;

        case "Scooter":
            price = 70;
            break;

        case "Auto":
            price = 120;
            break;

        case "Mini Van":
            price = 350;
            break;

        case "Pickup Van":
            price = 700;
            break;

        case "Truck":
            price = 1500;
            break;

        case "Car":
            price = 250;
            break;

        default:
            alert("Please select vehicle.");
            return;
    }

    document.getElementById("estimatedPrice").value = price;

});

// ===============================
// Current Location
// ===============================

const locationBtn = document.getElementById("currentLocation");

locationBtn.addEventListener("click", () => {

    if (!navigator.geolocation) {

        alert("Geolocation is not supported.");

        return;

    }

    navigator.geolocation.getCurrentPosition(

        (position) => {

            const lat = position.coords.latitude;

            const lng = position.coords.longitude;

            document.getElementById("pickup").value =
                `Latitude: ${lat}, Longitude: ${lng}`;

            if (typeof google !== "undefined") {

                const map = new google.maps.Map(document.getElementById("map"), {

                    center: { lat, lng },

                    zoom: 16

                });

                new google.maps.Marker({

                    position: { lat, lng },

                    map: map,

                    title: "Pickup Location"

                });

            }

        },

        () => {

            alert("Unable to fetch current location.");

        }

    );

});

// ===============================
// Booking Form Submit
// ===============================

const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        const bookingId =
            "V3-" + Date.now();

        const bookingData = {

            bookingId,

            customerName:
                document.getElementById("customerName").value,

            mobile:
                document.getElementById("mobile").value,

            service:
                document.getElementById("service").value,

            vehicle:
                document.getElementById("vehicle").value,

            pickup:
                document.getElementById("pickup").value,

            drop:
                document.getElementById("drop").value,

            pickupDate:
                document.getElementById("pickupDate").value,

            pickupTime:
                document.getElementById("pickupTime").value,

            description:
                document.getElementById("description").value,

            estimatedPrice:
                document.getElementById("estimatedPrice").value,

            status: "Pending",

            createdAt: serverTimestamp()

        };

        await addDoc(

            collection(db, "bookings"),

            bookingData

        );

        // ===============================
        // WhatsApp Message
        // ===============================

        const message =

`*New Booking*

Booking ID : ${bookingId}

Customer : ${bookingData.customerName}

Mobile : ${bookingData.mobile}

Service : ${bookingData.service}

Vehicle : ${bookingData.vehicle}

Pickup : ${bookingData.pickup}

Drop : ${bookingData.drop}

Price : ₹${bookingData.estimatedPrice}`;

        const whatsappLink =
            "https://wa.me/919030868681?text=" +
            encodeURIComponent(message);

        document.getElementById("whatsappBooking").href =
            whatsappLink;

        alert("Booking Created Successfully");

        window.location.href = "my-orders.html";

    }

    catch (error) {

        console.error(error);

        alert("Booking Failed");

    }

});
