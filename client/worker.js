console.log("Service Worker Loaded...");
var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://localhost:1883");

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("static").then(cache => {
      return cache.addAll(["./"]);
    })
  );
});

self.addEventListener("fetch", e => {
  console.log(`Intercepting fetch request for ${e.request.url}`);
});

client.on("message", function (topic, message) {
  // message is Buffer
  self.addEventListener("push", e => {
    const data = e.data.json();
    console.log("Push Recieved...");
    self.registration.showNotification(data.title, {
      body: "Notified!",
      icon: "http://image.ibb.co/frYOFd/tmlogo.png",
    });
  });

  console.log(message.toString());
  client.end();
});

// self.addEventListener("push", e => {
//   const data = e.data.json();
//   console.log("Push Recieved...");
//   self.registration.showNotification(data.title, {
//     body: "Notified!",
//     icon: "http://image.ibb.co/frYOFd/tmlogo.png",
//   });
// });
