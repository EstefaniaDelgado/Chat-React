import { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

export default function Search() {

  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
 // console.log(user)
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);
  //console.log(currentUser)

  const handlerSearch = async () => {
    const newUserName = userName.toLowerCase();
    const q = query(
      collection(db, "users"),
      where("displayName", "==", newUserName)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  //handleKey
  const handlerKey = (e) => {
    e.code === "Enter" && handlerSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in fb) exists, if not create new one
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log(res)

      if (!res.exists()) {
        //create chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        //create user chats:
      const response=  await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        console.log(response)

        //create user chats:
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      // console.log(err);
    }
    setUser(null);
    setUserName("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handlerKey}
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="picture user" />
          <div className="userChatInfo">
            <span>
              {user.displayName[0].toUpperCase() + user.displayName.slice(1)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
