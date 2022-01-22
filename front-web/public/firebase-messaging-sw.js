importScripts('https://www.gstatic.com/firebasejs/8.2.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.4/firebase-messaging.js');

// https://github.com/react-boilerplate/react-boilerplate/issues/2952
const firebaseConfig = {
    apiKey: "AIzaSyBZKDnw-ZcmJmoRoj5Xa4QfxqTOBncPsug",
    authDomain: "esoteric-might-286620.firebaseapp.com",
    projectId: "esoteric-might-286620",
    storageBucket: "esoteric-might-286620.appspot.com",
    messagingSenderId: "684233703781",
    appId: "1:684233703781:web:d3a1fcdcf92713bc47a18c"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
     console.log('sw bg message event: ', payload);
});

// O evento onMessage pertence ao contexto de Windows e não do service worker
//https://stackoverflow.com/questions/42964547/uncaught-firebaseerror-messaging-this-method-is-available-in-a-window-context
