export const phpURL = "http://localhost:8081/PHP";

import axios from "axios";

export const registerRequest = async function (data) {
  const response = await axios.post(`${phpURL}/register.php`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// Login request function using axios
export const loginRequest = async function (data) {
  const response = await axios.post(`${phpURL}/login.php`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
