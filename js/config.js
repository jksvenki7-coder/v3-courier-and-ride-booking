// =====================================
// V3 Group of Business
// config.js
// Version 1.0
// =====================================

const CONFIG = {

    APP_NAME: "V3 Group of Business",

    APP_VERSION: "1.0.0",

    COMPANY_NAME: "V3 Group of Business",

    PHONE: "9030868681",

    COUNTRY_CODE: "+91",

    WHATSAPP_NUMBER: "919030868681",

    SUPPORT_EMAIL: "support@v3group.in",

    CURRENCY: "INR",

    CURRENCY_SYMBOL: "₹",

    GOOGLE_MAPS_API_KEY: "YOUR_GOOGLE_MAPS_API_KEY",

    FIREBASE: {

        apiKey: "YOUR_API_KEY",

        authDomain: "YOUR_PROJECT.firebaseapp.com",

        projectId: "YOUR_PROJECT_ID",

        storageBucket: "YOUR_PROJECT.appspot.com",

        messagingSenderId: "YOUR_SENDER_ID",

        appId: "YOUR_APP_ID"

    },

    BOOKING_STATUS: {

        PENDING: "Pending",

        ACCEPTED: "Accepted",

        DRIVER_ASSIGNED: "Driver Assigned",

        PICKED_UP: "Picked Up",

        ON_THE_WAY: "On The Way",

        DELIVERED: "Delivered",

        COMPLETED: "Completed",

        CANCELLED: "Cancelled"

    },

    SERVICES: [

        "Parcel Delivery",

        "Document Delivery",

        "House Shifting",

        "Product Delivery",

        "Car Booking",

        "Bike Booking",

        "Auto Booking"

    ],

    PRICE: {

        PARCEL: 80,

        DOCUMENT: 50,

        PRODUCT: 120,

        BIKE: 100,

        AUTO: 150,

        CAR: 300,

        HOUSE_SHIFTING: 1500

    }

};

Object.freeze(CONFIG);

export default CONFIG;
