import { useEffect, useState } from "react";
import { fetchUsers, fetchPostsByUser } from "../utils/api";

const Feed = ({ token }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getFeed = async () => {
      try {
        const users = await fetchUsers(token);
        let allPosts = [];

        // Fetch all posts
        for (const [userId] of Object.entries(users.users)) {
          const userPosts = await fetchPostsByUser(userId, token);
          allPosts.push(...userPosts.posts);
        }

        // Sort posts by ID (assuming higher IDs are newer)
        const sortedPosts = allPosts.sort((a, b) => b.id - a.id);
        setPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching feed:", error);
      }
    };

    getFeed();
  }, [token]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Feed</h2>
      <ul>
        {posts.map((post, index) => (
          <li key={index} className="mb-4">
            <p>{post.content}</p>
            <p className="text-sm text-gray-600">Posted by User {post.userid}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feed;