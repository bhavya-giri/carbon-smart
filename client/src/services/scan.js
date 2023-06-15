
import { databases } from "../appwrite.js";
import { Query, ID } from "appwrite";

const databaseId = import.meta.env.VITE_DATABASE_ID;
const userTable = import.meta.env.VITE_PROFILE_COLLECTION;
const postsTable = import.meta.env.VITE_POSTS_COLLECTION;
const scansTable = import.meta.env.VITE_SCANS_COLLECTION
export const addScan = async (userId, imageUrl, result) => {
  try {
    // Add scan to scan table
    const scanData = {
      user: userId,
      image: imageUrl,
      result: result
    };

    const scanResponse = await databases.createDocument(databaseId, scansTable, ID.unique(),{...scanData});

    if (!scanResponse.$id) {
      return "Failed to add scan.";
    }

    // Update user's scans array
    const userQuery = Query.equal("email", [userId]);
    const userDocuments = await databases.listDocuments(databaseId, userTable, [userQuery]);

    if (userDocuments?.documents?.length > 0) {
      const userDoc = userDocuments.documents[0];
      console.log(userDoc)
      const updatedScans = userDoc.scan || [];
      updatedScans.push(scanResponse.$id);

      const userUpdate = {
        scan: updatedScans
      };

      await databases.updateDocument(databaseId, userTable, userDoc.$id, {...userUpdate});
      return "Scan added and user updated successfully.";
    } else {
      return "User not found."; 
    }
  } catch (error) {
    console.error("Error adding scan and updating user:", error);
    throw error;
  }
};

// Usage Example
// addScan("hi@hi.com", "https://example.com/scan-image.jpg", 5)
//   .then((message) => {
//     console.log(message);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
