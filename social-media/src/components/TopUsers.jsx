import { useEffect, useState } from "react";
import { fetchUsers, fetchPostsByUser } from "../utils/api";

const TopUsers = ({ token }) => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const getTopUsers = async () => {
      try {
        const users = await fetchUsers(token);
        const userPostCounts = await Promise.all(
          Object.entries(users.users).map(async ([userId, userName]) => {
            const posts = await fetchPostsByUser(userId, token);
            return { userName, postCount: posts.posts.length };
          })
        );
        const sortedUsers = userPostCounts
          .sort((a, b) => b.postCount - a.postCount)
          .slice(0, 5);
        setTopUsers(sortedUsers);
      } catch (error) {
        console.error("Error fetching top users:", error);
      }
    };

    getTopUsers();
  }, [token]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Top Users</h2>
      <ul>
        {topUsers.map((user, index) => (
          <li key={index} className="mb-2">
            {user.userName} - {user.postCount} posts
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopUsers;