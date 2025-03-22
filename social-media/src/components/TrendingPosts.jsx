import { useEffect, useState } from "react";
import { fetchUsers, fetchPostsByUser, fetchCommentsByPost } from "../utils/api";

const TrendingPosts = ({ token }) => {
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    const getTrendingPosts = async () => {
      try {
        const users = await fetchUsers(token);
        let allPosts = [];

        // Fetch all posts and their comments
        for (const [userId] of Object.entries(users.users)) {
          const posts = await fetchPostsByUser(userId, token);
          for (const post of posts.posts) {
            const comments = await fetchCommentsByPost(post.id, token);
            allPosts.push({ ...post, commentCount: comments.comments.length });
          }
        }

        // Find the post(s) with the maximum comments
        const maxComments = Math.max(...allPosts.map((post) => post.commentCount));
        const trending = allPosts.filter((post) => post.commentCount === maxComments);
        setTrendingPosts(trending);
      } catch (error) {
        console.error("Error fetching trending posts:", error);
      }
    };

    getTrendingPosts();
  }, [token]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Trending Posts</h2>
      <ul>
        {trendingPosts.map((post, index) => (
          <li key={index} className="mb-2">
            <p>{post.content}</p>
            <p className="text-sm text-gray-600">
              {post.commentCount} comments
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingPosts;