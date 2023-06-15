import { databases } from "../../appwrite.js";
import { Query, ID } from "appwrite";

const databaseId = import.meta.env.VITE_DATABASE_ID;
const userTable = import.meta.env.VITE_PROFILE_COLLECTION;
const postsTable = import.meta.env.VITE_POSTS_COLLECTION;
const scansTable = import.meta.env.VITE_SCANS_COLLECTION;

// Get user data
export const getUserData = (email) => {
  return databases.listDocuments(databaseId, userTable, [
    Query.equal("email", [email])
  ]);
};

// Get posts liked by a user
export const getLikedPosts = async (email) => {
  const promise = await databases.listDocuments(databaseId, userTable, [
    Query.equal("email", [email])
  ]);

  const posts = promise?.documents[0]?.liked;
  const data = await Promise.all(
    posts.map((post) =>
      databases.getDocument(databaseId, postsTable, post)
    )
  );

  return data;
};

// Get scans by a user
export const getScans = (email) => {
  return databases.listDocuments(databaseId, scansTable, [
    Query.equal("user", [email])
  ]);
};

// Get highscore of a user
export const getHighscore = (email) => {
  return databases.listDocuments(databaseId, userTable, [
    Query.equal("email", [email])
  ]).then((data) => data?.documents[0]?.highscore);
};

// Get posts done by a user
export const getUserPosts = async (email) => {
  const promise = await databases.listDocuments(databaseId, postsTable, [
    Query.equal("user", [email])
  ]);

  const posts = promise.documents;
  const data = await Promise.all(
    posts.map((post) =>
      databases.getDocument(databaseId, postsTable, post.$id)
    )
  );

  return data;
};

// Create a new user
export const createUserData = async ({name, email, imageUrl, id}) => {
  const userData = {
    name: name ?? "hi",
    email: email ?? "hi@hi.com",
    image: imageUrl ?? "https://www.hi.com",
    id: email ?? "hi@hi.com"
  };
  try{
      const existingUser = await databases.getDocument(databaseId, userTable, id);
      if (existingUser) {
        return "ok";
      }
  }
  catch(e){
      return databases.createDocument(databaseId, userTable, id, userData);
  }


};




// Increase user XP
export const increaseUserXP = async (email, amount) => {
  try {
    const userQuery = Query.equal("email", [email]);
    const userDocuments = await databases.listDocuments(databaseId, userTable, [userQuery]);

    if (userDocuments?.documents?.length > 0) {
      const userDoc = userDocuments.documents[0];
      const updatedXP = userDoc.xp + amount;

      const userUpdate = {
        xp: updatedXP
      };

      await databases.updateDocument(databaseId, userTable, userDoc.$id, userUpdate);
      return "User XP increased successfully.";
    } else {
      return "User not found.";
    }
  } catch (error) {
    console.error("Error increasing user XP:", error);
    throw error;
  }
};



// Update user's highscore if greater
export const updateHighscore = async (email, score) => {
  try {
    const userQuery = Query.equal("email", [email]);
    const userDocuments = await databases.listDocuments(databaseId, userTable, [userQuery]);

    if (userDocuments?.documents?.length > 0) {
      const userDoc = userDocuments.documents[0];
      const currentHighscore = userDoc.highscore;

      if (score > currentHighscore) {
        const userUpdate = {
          highscore: score
        };

        await databases.updateDocument(databaseId, userTable, userDoc.$id, userUpdate);
        return "User's highscore updated successfully.";
      } else {
        return "Provided score is not higher than the current highscore.";
      }
    } else {
      return "User not found.";
    }
  } catch (error) {
    console.error("Error updating user's highscore:", error);
    throw error;
  }
};

// Usage Example
// updateHighscore("cero@473.com", 500)
//   .then((message) => {
//     console.log(message);
//   })
//   .catch((error) => {
//     console.error(error);
//   });


// increaseUserXP("cero@473.com", 100)
//   .then((message) => {
//     console.log(message);
//   })
//   .catch((error) => {
//     console.error(error);
//   });



// Usage Examples
// getUserData("cero@473.com").then(data => {
//   console.log(data);
// });

// getLikedPosts("cero@473.com").then(data => {
//   console.log(data);
// });

// getScans("cero@473.com").then(data => {
//   console.log(data);
// });

// getHighscore("cero@473.com").then(highscore => {
//   console.log(highscore);
// });

// getUserPosts("cero@473.com").then(data => {
//   console.log(data);
// });

// createUserData().then(response => {
//   console.log(response);
// });
