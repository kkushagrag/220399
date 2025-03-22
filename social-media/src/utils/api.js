import axios from "axios";

// Base URL for the API
const BASE_URL = "http://20.244.56.144/test";

// Register the company
export const registerCompany = async () => {
  try {
    console.log("Registering company...");
    const response = await axios.post(`${BASE_URL}/register`, {
      companyName: "goMart",
      ownerName: "Astha",
      rollNo: "200367",
      ownerEmail: "astha.rai.22cse@bmu.edu.in",
      accessCode: "PRoJlR",
    });
    console.log("Registration successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error registering company:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Get authorization token
export const getAuthToken = async (clientID, clientSecret) => {
  try {
    console.log("Getting authorization token...");
    const response = await axios.post(`${BASE_URL}/auth`, {
      companyName: "goMart",
      clientID,
      clientSecret,
      ownerName: "Astha",
      ownerEmail: "astha.rai.22cse@bmu.edu.in",
      rollNo: "200367",
    });
    console.log("Authorization token received:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting authorization token:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Fetch users
export const fetchUsers = async (token) => {
  try {
    console.log("Fetching users...");
    const response = await axios.get(`${BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Users fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Fetch posts by user ID
export const fetchPostsByUser = async (userId, token) => {
  try {
    console.log(`Fetching posts for user ${userId}...`);
    const response = await axios.get(`${BASE_URL}/users/${userId}/posts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Posts fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts by user:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Fetch comments by post ID
export const fetchCommentsByPost = async (postId, token) => {
  try {
    console.log(`Fetching comments for post ${postId}...`);
    const response = await axios.get(`${BASE_URL}/posts/${postId}/comments`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Comments fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments by post:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Example usage of the functions
const run = async () => {
  try {
    // Step 1: Register the company
    const registrationData = await registerCompany();
    const { clientID, clientSecret } = registrationData;

    // Step 2: Get authorization token
    const authData = await getAuthToken(clientID, clientSecret);
    const token = authData.access_token;

    // Step 3: Fetch users
    const users = await fetchUsers(token);
    if (users.length === 0) {
      console.error("No users found.");
      return;
    }

    // Step 4: Fetch posts by user ID (assuming the first user for example)
    const userId = users[0].id;
    const posts = await fetchPostsByUser(userId, token);
    if (posts.length === 0) {
      console.error("No posts found for the user.");
      return;
    }

    // Step 5: Fetch comments by post ID (assuming the first post for example)
    const postId = posts[0].id;
    const comments = await fetchCommentsByPost(postId, token);
    if (comments.length === 0) {
      console.error("No comments found for the post.");
      return;
    }

    // Final output
    console.log("All data fetched successfully!");
    console.log("Users:", users);
    console.log("Posts:", posts);
    console.log("Comments:", comments);
  } catch (error) {
    console.error("Error in run function:", error);
  }
};

// Execute the run function
run();