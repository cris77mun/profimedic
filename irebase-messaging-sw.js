// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDx-Ie5FZDjPTd0TIKC8UEi10AqUiMF5g0",
  authDomain: "profimedicoptik.firebaseapp.com",
  projectId: "profimedicoptik",
  messagingSenderId: "1064595454841",
  appId: "1:1064595454841:web:1dec24da0d4c836faf4da8",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/favicon.png',
  });
});
