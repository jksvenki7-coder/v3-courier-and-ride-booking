import { db } from "./firebase.js";

import {

collection,

query,

where,

getDocs

} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const phone = localStorage.getItem("userPhone");

if(!phone){

window.location.href="login.html";

}

const container=document.getElementById("ordersContainer");

async function loadOrders(){

container.innerHTML="<h3>Loading...</h3>";

const q=query(

collection(db,"bookings"),

where("mobile","==",phone)

);

const snapshot=await getDocs(q);

container.innerHTML="";

if(snapshot.empty){

container.innerHTML=`

<div class="profile-card">

<h3>No Bookings Found</h3>

<p>You have not booked any service yet.</p>

<a href="booking.html" class="primary-btn">

Book Now

</a>

</div>

`;

return;

}

snapshot.forEach((bookingdoc)=>{

const data=bookingdoc.data();

const docld=bookingdov.in
  
container.innerHTML+=`

<div class="profile-card">

<h3>${data.bookingId}</h3>

<p><b>Service :</b> ${data.service}</p>

<p><b>Vehicle :</b> ${data.vehicle}</p>

<p><b>Status :</b> ${data.status}</p>

<p><b>Price :</b> ₹${data.estimatedPrice}</p>

<p><b>Pickup :</b> ${data.pickup}</p>

<p><b>Drop :</b> ${data.drop}</p>

<br>

<a

class="primary-btn"

href="tracking.html?id=${data.bookingId}">

Track Order

</a>

</div>

<br>

`;

});

}

loadOrders();

// ==========================================
// Cancel Booking
// ==========================================

import {
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

window.cancelBooking = async function (docId) {

    const confirmCancel = confirm(
        "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    try {

        await updateDoc(doc(db, "bookings", docId), {

            status: "Cancelled"

        });

        alert("Booking Cancelled Successfully");

        location.reload();

    } catch (error) {

        console.error(error);

        alert("Unable to cancel booking.");

    }

};

// ==========================================
// Refresh Every 30 Seconds
// ==========================================

setInterval(() => {

    loadOrders();

}, 30000);

// ==========================================
// WhatsApp Support
// ==========================================

window.contactSupport = function () {

    const message =
        encodeURIComponent(
            "Hello V3 Support, I need help with my booking."
        );

    window.open(

        "https://wa.me/919030868681?text=" + message,

        "_blank"

    );

};

// ==========================================
// Call Support
// ==========================================

window.callSupport = function () {

    window.location.href = "tel:+919030868681";

};
