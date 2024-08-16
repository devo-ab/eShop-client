import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";
import PropTypes from 'prop-types';

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const auth = getAuth(app);

const AuthProviders = ({children}) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    // signIn signUp start
    const createUserWithEmailPass = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInWithEmailPass = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signInWithGoogle = () => {
        setLoading(true)
       return signInWithPopup(auth, googleProvider);
    };


    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };
    // signIn signUp end


    // user Auth State start
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('user in the auth state changed', currentUser);
            setUser(currentUser);
            setLoading(false)
        });
        return () => {
            unSubscribe();
        }
    }, []);
    // user Auth State end

    const authInfo = {user, loading, createUserWithEmailPass, signInWithEmailPass, signInWithGoogle, logOut};
    
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProviders.propTypes = {
    children: PropTypes.node
}

export default AuthProviders;