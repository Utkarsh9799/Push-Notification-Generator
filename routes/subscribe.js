var express = require('express');
var router = express.Router();
var webpush = require('web-push');

router.post('/subscribe', (req,res) => {
  // Get push subscription object
  const subscription = req.body;

  // Send 201 - resource created successfully
  res.status(201).json({});

  // Creating payload
  const payload = JSON.stringify({ title: 'Push Test' });

  // Passing object into sendNotification
  webpush.sendNotification(subscription, payload).catch(console.error(err));
});

module.exports = router;