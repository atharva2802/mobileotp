 // Initialize Firebase
 const firebaseConfig = {
    apiKey: "AIzaSyB-wDj4Hr6-hqiha1QZbTKQoTRP2ISOxnA",
    authDomain: "mobile-verification.firebaseapp.com",
    projectId: "mobile-verification",
    storageBucket: "mobile-verification.appspot.com",
    messagingSenderId: "1012257383407",
    appId: "1:1012257383407:web:6f1ddefb31fa1d46bf4c1a",
    measurementId: "G-7DY36JTLH8"
};
firebase.initializeApp(firebaseConfig);

let recaptchaVerifier;
document.addEventListener("DOMContentLoaded", function() {
    // Initialize reCAPTCHA verifier
    recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': function(response) {
            console.log('reCAPTCHA resolved');
        }
    });

    // Render reCAPTCHA
    recaptchaVerifier.render().then(function(widgetId) {
        window.recaptchaWidgetId = widgetId;
    }).catch(function(error) {
        console.error("reCAPTCHA rendering failed: ", error);
    });
});

// Function to send OTP
function phoneAuth() {
    var phoneNumber = document.getElementById('number').value;

    firebase.auth().signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
        .then(function (confirmationResult) {
            window.confirmationResult = confirmationResult;
            document.getElementById('sender').style.display = 'none';
            document.getElementById('verifier').style.display = 'block';
        }).catch(function (error) {
            console.error("Error sending SMS: ", error);
        });
}

// Function to verify OTP
function codeVerify() {
    var code = document.getElementById('verificationcode').value;
    confirmationResult.confirm(code)
        .then(function (result) {
            var user = result.user;
            document.getElementById('verification-result').innerText = "Number verified";
        }).catch(function (error) {
            document.getElementById('verification-result').innerText = "Incorrect OTP";
            console.error("Error verifying OTP: ", error);
        });
}