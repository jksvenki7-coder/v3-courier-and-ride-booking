// ==========================================
// V3 Group of Business
// payment.js
// Final Version 1.0
// ==========================================

import { db } from "./firebase.js";

import {
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// ===============================
// Booking ID
// ===============================

const params = new URLSearchParams(window.location.search);
const bookingDocId = params.get("id");

if (!bookingDocId) {
    alert("Booking Not Found");
    window.location.href = "my-orders.html";
}

let bookingData = null;

// ===============================
// Load Booking
// ===============================

async function loadBooking() {

    const bookingRef = doc(db, "bookings", bookingDocId);

    const bookingSnap = await getDoc(bookingRef);

    if (!bookingSnap.exists()) {

        alert("Booking Not Found");

        return;

    }

    bookingData = bookingSnap.data();

    document.getElementById("bookingId").innerText =
        bookingData.bookingId;

    document.getElementById("customerName").innerText =
        bookingData.customerName;

    document.getElementById("amount").innerText =
        bookingData.estimatedPrice;

}

loadBooking();

// ===============================
// Payment
// ===============================

document.getElementById("payNow").addEventListener("click", async () => {

    const paymentMethod = document.querySelector(
        "input[name='payment']:checked"
    ).value;

    try {

        if (paymentMethod === "COD") {

            await updateDoc(doc(db, "bookings", bookingDocId), {

                paymentMethod: "Cash On Delivery",

                paymentStatus: "Pending"

            });

            alert("Cash on Delivery Selected");

            window.location.href = "my-orders.html";

            return;

        }

        // Online Payment (Demo)

        alert(
            paymentMethod +
            " payment integration will be connected in production."
        );

        await updateDoc(doc(db, "bookings", bookingDocId), {

            paymentMethod: paymentMethod,

            paymentStatus: "Paid"

        });

        alert("Payment Successful");

        window.location.href = "my-orders.html";

    }

    catch (error) {

        console.error(error);

        alert("Payment Failed");

    }

});
