/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    FIREBASE_API_KEY: "AIzaSyCgRuBRPUfkXeFcwp4gA4TTj7upYr5Yhko",
    FIREBASE_AUTH_DOMAIN: "authentication-tutorial-180de.firebaseapp.com",
    FIREBASE_PROJECT_ID: "authentication-tutorial-180de",
    FIREBASE_STORAGE_BUCKET: "authentication-tutorial-180de.appspot.com",
    FIREBASE_MESSAGING_SENDER_ID: "852744294266",
    FIREBASE_APP_ID: "1:852744294266:web:80adbe875cc59f7ae350c3",
  },
};

module.exports = nextConfig;
