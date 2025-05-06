import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL
console.log("API_URL", API_URL);

// getUserData function
export const getUserData = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/users/${userId}`, {
      headers: {
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Axios Error shuu", error);
    return error;
  }
};


// getFriendData function
export const getFriendData = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/friends/${userId}`, {
      headers: {
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Axios Error shuu", error);
    return error;
  }
};