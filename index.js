const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");
const port = 3000;

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client")));

const publicVapidKey =
  "BOxknCiYmIm6Pq9r2AKsIP3fRdw3gOgAuAGx5hQxzlfpSAuL7nstzCqC8u_P7HgiY_v1bYb8VceKciNN63q062M";
const privateVapidKey = "SJcEIv8pDj7IPgVKemWHROq6PornpZhGFiFsC9B2my8";

webpush.setVapidDetails(
  "mailto:chayan@antstack.io",
  publicVapidKey,
  privateVapidKey
);

//Subscribe Route

app.post("/subscribe", (req, res) => {
  //Get Push Subscription Object
  const subscription = req.body;

  //send 201 - resource created
  res.status(201).json({});

  //Create Payload
  const payload = JSON.stringify({ title: "Push Test" });

  //Pass Object into sendNotification
  webpush.sendNotification(subscription, payload).catch(err => {
    console.error(err);
  });
});

app.listen(port, () => console.log(`Server Running on ${port}`));
