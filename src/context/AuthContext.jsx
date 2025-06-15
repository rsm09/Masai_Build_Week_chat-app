import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged,signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        setCurrentUser({ uid: user.uid, ...userDoc.data() });
        
      } else {
        setCurrentUser(null);
       
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
 
  
  const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error("Logout error", err);
  }
};
  return (
    <AuthContext.Provider value={{ currentUser,logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
