import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState({})
    const [user, setUser] = useState(null);
    const [deliveryMenID, setDeliveryMenID] = useState();
    const [total, setTotal] = useState(0);
    const [parcelIds, setParcelIds] = useState(0);

    // signup with email
    const signUpWithEmail = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInwithEmail = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const updateProfileData = (userName, image, phone) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: userName,
            photoURL: image,
            phoneNumber: phone
        });
    }
    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    // provider login
    const googleProvider = new GoogleAuthProvider()
    const GoogleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const githubProvider = new GithubAuthProvider()
    const githubLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, githubProvider)
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async currentUser => {
            setLoading(false)
            setUser(currentUser)
        })
        return () => {
            unSubscribe()
        }
    }, [])
    // console.log(user);


    const authInfo = {
        loading,
        address, setAddress,
        signUpWithEmail,
        signInwithEmail,
        updateProfileData,
        signOutUser,
        deliveryMenID,
        setDeliveryMenID,
        parcelIds,
        setParcelIds,
        user,
        GoogleLogin,
        githubLogin,
        setTotal,
        total

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;