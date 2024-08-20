"use client";
import { UserData } from "@ncl/app/shared/models";
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "@ncl/app/lib/firebase/firebase.config";
import { getUserById } from "@ncl/app/lib/firebase/firestore/user";

interface UserContextType {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const response = await getUserById(currentUser.uid);
        if (response.success) {
          setUser(response.result as UserData);
        } else {
          console.error(response.error);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
