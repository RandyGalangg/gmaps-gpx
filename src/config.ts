export const GITHUB_URL: string = import.meta.env.VITE_GITHUB_URL || 'https://github.com';

// On Vercel, leave this empty to use the same-origin /api endpoint.
// For a GitHub Pages frontend, set this to the deployed Vercel API origin.
export const API_BASE_URL: string = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
