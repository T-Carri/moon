import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  
} from 'firebase/auth';


import { auth } from '../firebase/firebase';


const UserContext = createContext();
export default UserContext
export const UserAuth = () => {
  return useContext(UserContext);
};



export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  // const dispatch=useDispatch() ;
  //const firestore= getFirestore(app)
  
  //version normal 
  const createUsuario = (email, password) => {
    return  createUserWithEmailAndPassword(auth, email, password)
    
    
  };  
 

   const signIn = (email, password) =>  {
    return signInWithEmailAndPassword(auth, email, password)
    
   }


  const logout = () => {
      return signOut(auth)
      
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log({currentUser});
      //setUser(currentUser);
      setUser(currentUser);
      console.log('currentversion is running')
    });
    return () => unsubscribe();
  
  },[]);
console.log(user)
  return (
    <UserContext.Provider value={{createUsuario, user, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};


