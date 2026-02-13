// Hardcoded production URL as backup
const PROD_BACKEND = 'https://carbon-tracker-b4bf.onrender.com';

let API_BASE = import.meta.env.VITE_API_URL;

const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// FORCE production backend if we are NOT on localhost, 
// even if VITE_API_URL is set to localhost (common user error)
if (!isLocalhost) {
    API_BASE = PROD_BACKEND;
} else {
    // We are on localhost, use env var or default to localhost
    if (!API_BASE) {
        API_BASE = 'http://localhost:3000';
    }
}

console.log("DEBUG: Final API Base URL:", API_BASE);
console.log("DEBUG: Is Localhost:", isLocalhost);

export default API_BASE;
