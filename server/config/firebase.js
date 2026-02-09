const admin = require('firebase-admin');
const dotenv = require('dotenv');
const path = require('path');

// Ensure env vars are loaded
dotenv.config({ path: path.join(__dirname, '../../.env') });

try {
    let serviceAccount;
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    }

    if (serviceAccount) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        console.log("Firebase Admin Initialized with Service Account");
    } else {
        // Fallback to default application credentials (useful for GCP deployment)
        // or if no service account is provided, it might fail locally unless logged in via gcloud
        admin.initializeApp();
        console.log("Firebase Admin Initialized with Default Credentials");
    }
} catch (error) {
    console.error("Firebase Admin Initialization Error:", error);
}

module.exports = admin;
