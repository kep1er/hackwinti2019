importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-messaging.js');
firebase.initializeApp({
    'messagingSenderId': 'YOUR_UNIQUE_SENDER_ID'
});
const messaging = firebase.messaging();
