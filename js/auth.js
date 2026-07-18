<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Login | V3 Group of Business</title>

<link rel="stylesheet" href="css/style.css">

<link rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">

</head>

<body>

<header class="header">

<div class="container">

<a href="index.html" class="logo">

<img src="assets/logo.png" alt="Logo">

<div>

<h2>V3 Group of Business</h2>

<p>Courier & Ride Booking</p>

</div>

</a>

</div>

</header>

<section class="booking">

<div class="container">

<div class="profile-card">

<img src="assets/images/login.png"
alt="Login">

<h2>Customer Login</h2>

<p>

Login using your Mobile Number

</p>

<form id="loginForm">

<label>

Mobile Number

</label>

<input

type="tel"

id="mobile"

placeholder="Enter Mobile Number"

maxlength="10"

required>

<button

type="button"

id="sendOtp">

Send OTP

</button>

<br><br>

<div id="otpSection"

style="display:none;">

<label>

Enter OTP

</label>

<input

type="number"

id="otp"

placeholder="Enter OTP">

<button

type="button"

id="verifyOtp">

Verify OTP

</button>

</div>

</form>

<br>

<p>

New User?

Your profile will be created automatically after OTP verification.

</p>

</div>

</div>

</section>

<footer class="footer">

<div class="container">

<p style="text-align:center;">

© 2026

V3 Group of Business

</p>

</div>

</footer>

<script type="module"

src="js/auth.js">

</script>

</body>

</html>
