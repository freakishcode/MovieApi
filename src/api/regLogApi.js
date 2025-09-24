// !! Using PHP AS BACKEND

import axios from "axios";
// URL
export const phpURL = "http://localhost/PHP";

// REGISTER USER request function using axios
export const registerRequest = async function (userData) {
  try {
    const res = await axios.post(`${phpURL}/register.php`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    if (!res.data.success) {
      throw new Error(res.data.message || "Registration failed");
    }
    return res.data; // contains token & user info
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || "Registration error"
    );
  }
};

// Login request function using axios
export const loginRequest = async function (data) {
  const response = await axios.post(`${phpURL}/login.php`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// CHECK EMAIL EXISTS
export const loginEmailExists = async (email) => {
  try {
    const res = await axios.get(`${phpURL}/login.php`, {
      params: { email },
    });
    console.log(res.data);
    return res.data.exists; // true or false from backend
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || "Email check error"
    );
  }
};

// Function to fetch user data from the API
export const fetchUser = async () => {
  try {
    const res = await axios.get(`${phpURL}/viewUsers.php`);
    // If your PHP returns { success: true, data: [...] }
    if (res.data.success) {
      console.log("Fetched users data:", res.data);
    } else if (Array.isArray(res.data)) {
      console.log(res.data);
    } else {
      console.log("Unexpected response format");
    }

    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to fetch users"
    );
  }
};

// DELETE USER
export const deleteUser = async (userId) => {
  const res = await fetch(`${phpURL}/delete.php`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: userId }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error deleting user");
  }

  return data;
};
