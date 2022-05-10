import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, where } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAaA6F5m36k_m_g-9lDJfRpbqJRYjuNyQQ",
  authDomain: "loginpage-603a7.firebaseapp.com",
  projectId: "loginpage-603a7",
  storageBucket: "loginpage-603a7.appspot.com",
  messagingSenderId: "613088890209",
  appId: "1:613088890209:web:f01fd6566adec579410920",
  measurementId: "G-5GSXMPN5ZT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


// Login
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Register
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    logout();
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Logout
const logout = () => {
  signOut(auth);
};


// Get Images
const getAllImages = async(setState) => {
  const imagesCollection = collection(db, "images");
  const snapshot = await getDocs(query(imagesCollection, orderBy("createdAt", "desc")));
  const list = snapshot.docs.map(doc => doc.data());
  setState(list);
}

const getImagesByUser = async(id, setState) => {
  const imagesCollection = collection(db, "images");
  const snapshot = await getDocs(query(imagesCollection, where("userId", "==", id), orderBy("createdAt", "desc")));
  const list = snapshot.docs.map(doc => doc.data());
  setState(list);
}


// Get User Info
const getUserName = async (id, setState) => {
  try {
    const usersCollection = collection(db, "users");
    const snapshot = await getDocs(query(usersCollection, where("uid", "==", id)));
    const data = snapshot.docs[0].data();
    setState(data.name);
  } catch (err) {
    console.error(err);
    alert("An error occured while fetching user data");
  }
};

const getUsers = async (setState) => {
  const usersCollection = collection(db, "users");
  const snapshot = await getDocs(query(usersCollection, orderBy("name")));
  const list = snapshot.docs.map(doc => doc.data());
  setState(list);
};

export {
  auth,
  db,
  storage,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
  getAllImages,
  getImagesByUser,
  getUserName,
  getUsers
};