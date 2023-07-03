import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  console.log(users);

  const handlerSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value.toLowerCase();
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            // create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (error) {
            console.log(error);
            setError(true);
            setLoading(false);
          }
        });
      });

      // // Register three observers:
      // uploadTask.on(
      //   (error) => {
      //     setError(true);
      //   },
      //   () => {
      //     getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
      //       await updateProfile(res.user, {
      //         displayName: storageRef._location.path_,
      //         photoURL: downloadURL,
      //       });
      //       console.log(res.user.displayName);

      //       //Add a new document in collection "users"
      //       await setDoc(doc(db, 'users', res.user.uid), {
      //         uid: res.user.uid,
      //         displayName,
      //         email,
      //         photoURL: downloadURL,
      //       });
      //       // setUsers(doc.data().uid)
      //      //Add new document userChats when the user sign up in the app, is empty because whe don't have any conversation yet
      //       await setDoc(doc(db, 'userChats', res.user.uid), {});
      //       navigate('/');
      //     });
      //   }
      // );
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat</span>
        <span className="title">Register</span>

        <form onSubmit={handlerSubmit}>
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <input required style={{ display: "none" }} type="file" id="file" />
          {/* este label representa el file input */}
          <label htmlFor="file">
            <i className="material-icons">filter</i>
            <span>Add avatar</span>
          </label>
          <button disabled={loading}>Sign up</button>
          {loading && "Uploading and compressing the image please wait..."}
          {error && <span>Something went wrong</span>}
        </form>
        <p>
          You do have an account? <Link to={"/"}> Login </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
