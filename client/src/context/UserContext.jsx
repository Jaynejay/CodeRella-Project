import { createContext, useState, useEffect } from "react";
import axios from "../axios";
import { useContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [imageUrl, setImageUrl] = useState("/default-avatar.png");

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const userRes = await axios.get("/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(userRes.data);

      await loadProfileImage(token);
    } catch (err) {
      console.error("Failed to load user context", err);
    }
  };

  const loadProfileImage = async (token) => {
    try {
      const imageRes = await axios.get("/user/profile-image", {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });
      const blobUrl = URL.createObjectURL(imageRes.data);
      setImageUrl(blobUrl);
    } catch {
      setImageUrl("/default-avatar.png");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const refreshImage = () => {
    const token = localStorage.getItem("token");
    if (token) loadProfileImage(token);
  };

  return (
    <UserContext.Provider value={{ user, imageUrl, refreshImage }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
