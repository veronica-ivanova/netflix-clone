import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut} from "firebase/auth";
import {
    getFirestore,
    addDoc,
    collection } from "firebase/firestore";
import {toast} from "react-toastify";


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "netflix-clone-66a8e.firebaseapp.com",
    projectId: "netflix-clone-66a8e",
    storageBucket: "netflix-clone-66a8e.firebasestorage.app",
    messagingSenderId: "953042213507",
    appId: "1:953042213507:web:cf670ea74da6b5968f99b6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email
        });
    }
    catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = async () => {
    signOut(auth);
}

export {auth, db, login, signup, logout};