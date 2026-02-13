const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

console.log("DEBUG: Current API Base URL:", API_BASE);
console.log("DEBUG: VITE_API_URL Env Var:", import.meta.env.VITE_API_URL);

export default API_BASE;
