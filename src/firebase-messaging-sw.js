importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyCN00joMzTLb2evRaDI3pf3Dbbh1Fp36_U",
  authDomain: "angularfirebasecloudmessaging.firebaseapp.com",
  databaseURL: "https://angularfirebasecloudmessaging.firebaseio.com",
  projectId: "angularfirebasecloudmessaging",
  storageBucket: "angularfirebasecloudmessaging.appspot.com",
  messagingSenderId: "255011948038",
  appId: "1:255011948038:web:c3543eb35134b633"
});

const messaging = firebase.messaging();
