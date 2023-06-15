import { databases } from "../appwrite.js";
import { Query } from "appwrite";

const databaseId = import.meta.env.VITE_DATABASE_ID;
const postsTable = import.meta.env.VITE_POSTS_COLLECTION;
const commentTable = import.meta.env.VITE_COMMENTS_COLLECTION;

// Get posts for home page
export const getPosts = () => {
  return databases.listDocuments(databaseId, postsTable);
};

// Get post data
export const getPostData = async (id) => {
  const postDataPromise = databases.getDocument(databaseId, postsTable, id);
  const commentsPromise = databases.listDocuments(databaseId, commentTable, [
    Query.equal("post", [id])
  ]);

  try {
    const postData = await postDataPromise;
    const commentsData = await commentsPromise;

    return {
      post: postData,
      comments: commentsData
    };
  } catch (error) {
    console.error("Error retrieving post data:", error);
    throw error;
  }
};

// Usage Examples
// getPosts().then((data) => {
//   console.log(data);
// });

// getPostData("6485649d0d34493a0058").then((data) => {
//   console.log(data);
// });
