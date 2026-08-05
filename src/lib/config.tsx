interface Config {
  API_BASE_URL: string;
  getGeoInfo: string;
  API_IMAGE_URL: string;
  FRONTEND_URL: string;
}

let config: Config;

let mode = "love"; // local || love

if (mode === "local") {
  const API_URL = "http://localhost:2515/api";
  const API_IMAGE = "http://localhost:2515";
  const FRONTEND_URL = "http://localhost:3000";

  config = {
    API_BASE_URL: `${API_URL}`,
    getGeoInfo: "https://ipapi.co/json/",
    API_IMAGE_URL: API_IMAGE,
    FRONTEND_URL,
  };
} else {
  const API_URL = "https://client-tinvox-backend.onrender.com/api";
  const API_IMAGE = "https://client-tinvox-backend.onrender.com";
  const FRONTEND_URL = "https://client-tinvox.onrender.com";

  config = {
    API_BASE_URL: `${API_URL}`,
    getGeoInfo: "https://ipapi.co/json/",
    API_IMAGE_URL: API_IMAGE,
    FRONTEND_URL,
  };
}

export default config;
