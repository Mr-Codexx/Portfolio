import { signOut } from "firebase/auth"; // Import signOut from Firebase auth
import { auth } from "./firebase";

export const logout = () => {
  return signOut(auth); // Sign out the user
};
