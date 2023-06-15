import { databases } from "../appwrite.js";
import { Query, ID } from "appwrite";

const databaseId = import.meta.env.VITE_DATABASE_ID;
const userTable = import.meta.env.VITE_PROFILE_COLLECTION;
const postsTable = import.meta.env.VITE_POSTS_COLLECTION;
const commentTable = import.meta.env.VITE_COMMENTS_COLLECTION

export const addComment = async (postId, userEmail, commentContent) => {
  try {
    // Add comment to comments table
    const commentData = {
      id: userEmail,
      user:userEmail,
      content: commentContent,
      post: postId
    };

    const commentResponse = await databases.createDocument(databaseId, commentTable, ID.unique(), {...commentData});

    if (!commentResponse.$id) {
      return "Failed to add comment.";
    }

    // Update post's comments array and comment count
    const postResponse = await databases.getDocument(databaseId, postsTable, postId);

    if (postResponse) {
      const updatedComments = postResponse.comments || [];
      updatedComments.push(commentResponse.$id);

      const postUpdate = {
        comments: updatedComments,
        comment_count: (postResponse.comment_count || 0) + 1
      };

      await databases.updateDocument(databaseId, postsTable, postId, {...postUpdate});
      return "Comment added and post updated successfully.";
    } else {
      return "Post not found.";
    }
  } catch (error) {
    console.error("Error adding comment and updating post:", error);
    throw error;
  }
};

// Usage Example
addComment("6485649d0d34493a0058", "cero@473.com", "Great post!")
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error(error);
  });
