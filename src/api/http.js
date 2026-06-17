import axios from "axios";

const API_URL = "https://api.gulfalolaya.com";

export { API_URL };

export const http = axios.create({
  baseURL: import.meta.env.PROD ? API_URL : "/", // proxy handles /api in dev
});

export const getImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  
  // If it's a local static asset (usually in /images or starting with /), don't prefix with API_URL
  // Backend assets from our CMS typically start with /storage
  const isLocalAsset = path.startsWith("/images") || path.startsWith("/assets");
  
  if (import.meta.env.PROD && !isLocalAsset) {
    return `${API_URL}${path.startsWith("/") ? "" : "/"}${path}`;
  }
  return path;
};

import i18n from "../i18n";

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;

  // Add current language to headers for dynamic translation from DB
  config.headers["Accept-Language"] = i18n.language || "en";
  
  return config;
});
