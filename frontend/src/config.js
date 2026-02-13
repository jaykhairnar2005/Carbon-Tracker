// Hardcoded production URL as backup since Vercel env var is having issues
const PROD_BACKEND = 'https://carbon-tracker-b4bf.onrender.com';

let API_BASE = import.meta.env.VITE_API_URL;

// If no Env var set, decide based on where the frontend is running
if (!API_BASE) {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        API_BASE = 'http://localhost:3000';
    } else {
        // We are on Vercel or some other remote host
        API_BASE = PROD_BACKEND;
    }
}

console.log("DEBUG: Final API Base URL:", API_BASE);

export default API_BASE;
