import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [userProfile, setUserProfile] = useState(null);

  const updateUserProfile = (profileData) => {
    setUserProfile((previousProfile) => ({
      ...previousProfile,
      ...profileData,
    }));
  };

  const clearUserProfile = () => {
    setUserProfile(null);
  };

  const value = {
    userProfile,
    setUserProfile,
    updateUserProfile,
    clearUserProfile,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside a UserProvider");
  }

  return context;
}

export default UserContext;