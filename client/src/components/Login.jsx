import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useMutation } from 'react-query';
import { createUserData } from '../services/user/index';

const Login = () => {

  const createUserMutation = useMutation(createUserData, {
    onError: (error) => {
      console.error('Error creating user:', error);
      // Handle error
    },
    onSuccess: (data) => {
      console.log('User creation successful:', data);
      // Handle success
    },
  });
    const handleSignIn = () => {
        signInWithPopup(auth, provider)
        .then(async (data) => {
            console.log(data);
            createUserMutation.mutate( {name: data.user.displayName,email: data.user.email,imageUrl: data.user.photoURL,id: data.user.uid} );
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
//   const handleLogOut = () => {
//     signOut(auth)
//       .then(() => {})
//       .catch((error) => {});
//   };
    return (
        <li><button onClick={handleSignIn} disabled={createUserMutation.isLoading}>Sign Up</button></li>    
    )
}

export default Login;