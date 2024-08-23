"use client";
import { UserData } from "@ncl/app/shared/models";
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "@ncl/app/lib/firebase/firebase.config";
import { getUserById } from "@ncl/app/lib/firebase/firestore/user";
import { useUi } from "@ncl/app/context/ui-context";

interface UserContextType {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  users: UserData[];
  setUsers: React.Dispatch<React.SetStateAction<UserData[]>>;
  currentUser: UserData | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserData | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { setLoading } = useUi();
  const [user, setUser] = useState<UserData | null>(null);
  const [users, setUsers] = useState<UserData[]>([]);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log({ currentUser });
      setLoading(true);
      if (currentUser) {
        const response = await getUserById(currentUser.uid);
        setLoading(false);
        if (response.success) {
          setUser(response.result as UserData);
        } else {
          console.error(response.error);
        }
      } else {
        setLoading(false);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, users, setUsers, currentUser, setCurrentUser }}
    >
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
