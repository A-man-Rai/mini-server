import 'dotenv/config';
import webpush from 'web-push';
import MapData from '../models/mapDataSchema.js';

const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;

webpush.setVapidDetails(
  'mailto:arai99981@gmail.com',
  publicKey,
  privateKey
);

// Map to store user subscriptions and their status
const userSubscriptions = new Map();

// Function to calculate distance using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

// Subscribe Route
// Subscribe Route
// Subscribe Route

// Map to store user subscriptions and notified areas
const userNotifications = new Map();

// ...

const subscribe = async (req, res) => {
  try {
    const { subscription, userId, latitude, longitude } = req.body;
    console.log('Received subscription for user:', userId);

    // Fetch accident-prone areas from your database (adjust the query based on your schema)
    const accidentProneAreas = await MapData.find({});

    // Check if the received location is within 1km of any accident-prone area
    const isWithinRange = accidentProneAreas.some((area) => {
      const distance = calculateDistance(
        parseFloat(latitude),
        parseFloat(longitude),
        parseFloat(area.latitude),
        parseFloat(area.longitude)
      );
      return distance <= 0.5; // Adjust the distance threshold as needed
    });

    // Get the notified areas for the user
    const notifiedAreas = userNotifications.get(userId) || new Set();

    if (isWithinRange && !notifiedAreas.has(userId)) {
      // Create payloadj
      const payload = JSON.stringify({ title: 'YOU ARE INSIDE ACCIDENT PRONE AREA' });

      // Pass object into sendNotification
      await webpush.sendNotification(subscription, payload);
      console.log('Push notification sent successfully');

      // Update user's notified areas
      notifiedAreas.add(userId);
      userNotifications.set(userId, notifiedAreas);

      // Send 201 - resource created with voice: true
      res.status(201).json({ voice: true });
    } else if (!isWithinRange && notifiedAreas.has(userId)) {
      // Remove user's notified areas if they are no longer in a prone area
      notifiedAreas.delete(userId);
      userNotifications.set(userId, notifiedAreas);

      // Send 201 - resource created with voice: false
      res.status(201).json({ voice: false });
    } else {
      // Send 201 - resource created with voice: false
      res.status(201).json({ voice: false });
    }
  } catch (error) {
    console.error('Error processing subscription:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { subscribe };
