import { databases } from "../appwrite.js";
import { Query, ID } from "appwrite";

const databaseId = import.meta.env.VITE_DATABASE_ID;
const userTable = import.meta.env.VITE_PROFILE_COLLECTION;
const postsTable = import.meta.env.VITE_POSTS_COLLECTION;

// Post something and update profile posts array
export const postAndAddToProfile = async (user, content, imageUrl, tag, location) => {
  try {
    // Create post in posts table
    const postData = {
      user:user,
      content:content,
      image:imageUrl,
      tag:tag,
      location:location
    };

    const postResponse = await databases.createDocument(databaseId, postsTable, ID.unique(), {...postData});
    const postId = postResponse.$id;

    // Update profile posts array
    const profileQuery = Query.equal("email", [user]);
    const profileDocuments = await databases.listDocuments(databaseId, userTable, [profileQuery]);

    if (profileDocuments?.documents?.length > 0) {
      const profileDoc = profileDocuments.documents[0];
      const postsArray = profileDoc.posts || [];

      postsArray.push(postId);

      const profileUpdate = {
        posts: postsArray
      };

      await databases.updateDocument(databaseId, userTable, profileDoc.$id, {...profileUpdate});
      return "Post created and added to profile successfully.";
    } else {
      return "User not found.";
    }
  } catch (error) {
    console.error("Error posting and updating profile:", error);
    throw error;
  }
};

// Usage Example
// postAndAddToProfile("cero@473.com", "Hello, world!", "https://example.com/image.jpg", 1,"40.7128,-74.0060")
//   .then((message) => {
//     console.log(message);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
