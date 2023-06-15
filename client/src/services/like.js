import { databases } from "../appwrite.js";
import { Query } from "appwrite";

const databaseId = import.meta.env.VITE_DATABASE_ID;
const postsTable = import.meta.env.VITE_POSTS_COLLECTION;
const userTable = import.meta.env.VITE_PROFILE_COLLECTION;

// Update post like_count and user likedPosts
export const likePost = async (postId, userId) => {
  try {
    // Update post like_count and likedBy array
    const postResponse = await databases.getDocument(databaseId, postsTable, postId);

    if (postResponse) {
      const postUpdate = {
        like_count: postResponse.like_count + 1??1,
        liked_by: [...(postResponse.liked_by || []), userId]
      };

      await databases.updateDocument(databaseId, postsTable, postId, {...postUpdate});
    } else {
      return "Post not found.";
    }

    // Update user likedPosts
    const userQuery = Query.equal("email", [userId]);
    const userDocuments = await databases.listDocuments(databaseId, userTable, [userQuery]);

    if (userDocuments?.documents?.length > 0) {
      const userDoc = userDocuments.documents[0];
      const likedPostsArray = userDoc.liked || [];

      likedPostsArray.push(postId);

      const userUpdate = {
        liked: likedPostsArray
      };

      await databases.updateDocument(databaseId, userTable, userDoc.$id, {...userUpdate});
      return "Post liked and user updated successfully.";
    } else {
      return "User not found.";
    }
  } catch (error) {
    console.error("Error liking post and updating user:", error);
    throw error;
  }
};

export const unlikePost = async (postId, userId) => {
  try {
    // Update post like_count and likedBy array
    const postResponse = await databases.getDocument(databaseId, postsTable, postId);

    if (postResponse) {
      const updatedLikedBy = postResponse.liked_by.filter((id) => id !== userId);
      const postUpdate = {
        like_count: Math.max(postResponse.like_count - 1, 0),
        liked_by: updatedLikedBy
      };

      await databases.updateDocument(databaseId, postsTable, postId, postUpdate);
    } else {
      return "Post not found.";
    }

    // Update user likedPosts
    const userQuery = Query.equal("email", [userId]);
    const userDocuments = await databases.listDocuments(databaseId, userTable, [userQuery]);

    if (userDocuments?.documents?.length > 0) {
      const userDoc = userDocuments.documents[0];
      const updatedLikedPosts = userDoc.liked.filter((id) => id !== postId);
      const userUpdate = {
        liked: updatedLikedPosts
      };

      await databases.updateDocument(databaseId, userTable, userDoc.$id, userUpdate);
      return "Post unliked and user updated successfully.";
    } else {
      return "User not found.";
    }
  } catch (error) {
    console.error("Error unliking post and updating user:", error);
    throw error;
  }
};

// Usage Example
// unlikePost("6485bf908f6b1f79452e", "cero@473.com")
//   .then((message) => {
//     console.log(message);
//   })
//   .catch((error) => {
//     console.error(error);
//   });



// Usage Example
// likePost("6485bf908f6b1f79452e", "cero@473.com")
//   .then((message) => {
//     console.log(message);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
