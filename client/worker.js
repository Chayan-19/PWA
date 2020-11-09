console.log("Service Worker Loaded...");

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

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: "Notified!",
    icon: "http://image.ibb.co/frYOFd/tmlogo.png",
  });
});
