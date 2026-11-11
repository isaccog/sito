const isLocalhost = ["localhost", "127.0.0.1"].includes(location.hostname);
const BACKEND = isLocalhost
  ? "http://localhost:8000"
  : "https://api.whatisacco.com";
