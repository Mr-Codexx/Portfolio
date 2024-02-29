import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDqBScgnr3BmRryT1uO-n38JrAZ6VAB0d8",
  authDomain: "data-c3068.firebaseapp.com",
  databaseURL: "https://data-c3068-default-rtdb.firebaseio.com",
  projectId: "data-c3068",
  storageBucket: "data-c3068.appspot.com",
  messagingSenderId: "815387940626",
  appId: "1:815387940626:web:8f08fd34f702e6a3b005cb",
  measurementId: "G-GJWNPG809R"
};
export const logout = () => {
    return signOut(auth); // Sign out the user
  };  


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const auth = getAuth();

export { app, auth, database};
export default logout;
