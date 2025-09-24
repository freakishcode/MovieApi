import axios from "axios";

// Detect environment
const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

// Base URL: localhost for dev, InfinityFree/000webhost for prod
const BASE_URL = isLocalhost
  ? "http://localhost/php" // adjust if your local XAMPP maps differently
  : "https://bkapicalls.infinityfreeapp.com/"; // your deployed PHP backend

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10s timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
