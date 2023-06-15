import { Client,Databases } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('64855eb18eab928a6e94');               // Your project ID

// const account = new Account(client);
const databases = new Databases(client);


// const promise = databases.createDocument("64855ee628ab75ff61aa","64855fab50c926ea3ebd","648576ba9b78139eefef",{
//     name:"Muskan Garg",
//     id:"muskan@evilcorp.com"
// });

// promise.then(function (response) {
//     console.log(response); // Success
// }, function (error) {
//     console.log(error); // Failure
// });

// Register User
// account.create(
//     ID.unique(),
//     'me@example.com',
//     'password',
//     'Jane Doe'
// ).then(response => {
//     console.log(response);
// }, error => {
//     console.log(error);
// });

// Subscribe to files channel
export {databases}