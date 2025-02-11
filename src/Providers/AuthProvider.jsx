import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import AuthContext from "./AuthContext.jsx";
import auth from "../Firebase/firebase.init.js";
import {toast} from "react-toastify";
import BASE_URL from "../SharedUtilities/SharedUtilities.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const AuthProvider = ({children}) => {


    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);
    const navigate = useNavigate();


    const checking_user_availability_in_database = async (email) => {

        /* SAVING USER AVAILABILITY INTO MONGODB - WITHOUT AXIOS */
        /*const response = await fetch(`${BASE_URL}/users/find_availability_by_email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email }),
        });
        const result = await response.json();*/

        /* SAVING USER AVAILABILITY INTO MONGODB - WITH AXIOS */
        const response = await axios.post(
            `${BASE_URL}/users/find_availability_by_email`,
            { email: email }
        );

        return response.data.exists;
    }


    const signUpNewUser = async (name, photoUrl, email, password) => {
        try {
            setUserLoading(true);

            const user_availability_in_database = await checking_user_availability_in_database(email);
            if (user_availability_in_database) {
                toast.warning('Registration failed. Email address already exists!');
                setUserLoading(false);
                navigate('/auth/sign_in');
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            setUser(user);

            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photoUrl
            });

            const userInfoForDatabase = {
                uid: auth.currentUser.uid,
                displayName: auth.currentUser.displayName,
                email: auth.currentUser.email,
                photoURL: auth.currentUser.photoURL,
            };
            // console.log('userInfoForDatabase: ', userInfoForDatabase);

            /* SAVING USER INFO INTO MONGODB - WITHOUT AXIOS */
            /*const response = await fetch(`${BASE_URL}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userInfoForDatabase),
            });*/

             /* SAVING USER INFO INTO MONGODB - AXIOS USED */
            const response = await axios.post(
                `${BASE_URL}/users`,
                userInfoForDatabase
            );
            // console.log('response: ', response.status);

            if (response?.status === 201) {
                toast.success('Registration completed successfully! Please login to continue!');
                await signOut(auth);
            }

        }
        catch (error) {
            toast.error(`Registration failed. Error: ${error.message}`);
        }
        finally {
            setUserLoading(false);
        }
    };


    const signInExistingUsers = async (email, password) => {
        try {
            setUserLoading(true);

            const user_availability_in_database = await checking_user_availability_in_database(email);
            if (!user_availability_in_database) {
                toast.warning('Sign in failed. Email address not exists!');
                setUserLoading(false);
                navigate('/auth/registration');
                return;
            }

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);

            toast.success('Login successful!');

        }
        catch (error) {
            toast.error(`Login failed. Error: ${error.message}`);
        }
        finally {
            setUserLoading(false);
        }
    };


    const updateExistingUsers = async (name, photoUrl) => {
        try {
            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photoUrl
            });

            setUser(auth.currentUser);

            toast.success('Profile updated successfully!');

        } catch (error) {
            toast.error(`Profile update failed. Error: ${error.message}`);
        }
    };


    const signOutCurrentUser = async () => {
        try {
            await signOut(auth);

            setUser(null);
            toast.success('Logout successful!');

        } catch (error) {
            toast.error(`Logout failed. Error: ${error.message}`);
        }
        finally {
            setUserLoading(false);
        }
    };


    const resetPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);

            toast.success('Password reset email sent!');

        } catch (error) {
            toast.error(`ERROR MESSAGE: ${error.code}: ${error.message}`);
        }
    };


    const provider = new GoogleAuthProvider();
    const signInWithGoogle = async () => {
        try {
            setUserLoading(true);
            const userCredential = await signInWithPopup(auth, provider);

            setUser(userCredential.user);

            const user_availability_in_database = await checking_user_availability_in_database(auth.currentUser.email);
            if (!user_availability_in_database) {
                const userInfoForDatabase = {
                    uid: auth.currentUser.uid,
                    displayName: auth.currentUser.displayName,
                    email: auth.currentUser.email,
                    photoURL: auth.currentUser.photoURL,
                };
                //console.log('userInfoForDatabase: ', userInfoForDatabase);

                /* SAVING USER INFO INTO MONGODB - WITHOUT AXIOS */
                /*const response = await fetch(`${BASE_URL}/users`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userInfoForDatabase),
                });*/

                /* SAVING USER INFO INTO MONGODB - AXIOS USED */
                const response = await axios.post(
                    `${BASE_URL}/users`,
                    userInfoForDatabase
                );
                // console.log('response: ', response.status);

                if (response?.status === 201) {
                    toast.success('Login using Google completed successfully!');
                }
                return;
            }
            toast.success('Login using Google completed successfully!');
        }
        catch (error) {
            toast.error(`Sign in using Google failed. Error: ${error.message}`);
        }
        finally {
            setUserLoading(false);
        }
    };


    /* THIS OBSERVER IS CREATED ACCORDING TO THE FIREBASE DOCUMENT, INCLUDING DEPENDENCIES */
    useEffect(() => {
        /*The recommended way to get the current user is by setting an observer on the Auth object.*/
        const authentication_State_Observer = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // console.log("User is logged in");
                setUser(currentUser);
                setUserLoading(false);
            } else {
                // console.log("User is logged out.");
                setUser(null);
                setUserLoading(false);
            }
        })

        /*Component Unmounting.*/
        return () => {
            authentication_State_Observer();
        }
    }, [user]);
    /* THIS OBSERVER WAS CREATED ACCORDING TO THE FIREBASE DOCUMENT, INCLUDING DEPENDENCIES, AND THEN MODIFIED, EXCLUDING DEPENDENCIES */
    /*useEffect(() => {
        /!* The recommended way to get the current user is by setting an observer on the Auth object. *!/
        const authentication_State_Observer = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);

                /!* REQUESTING JSON WEB TOKEN THROUGH API *!/
                axios.post(`${BASE_URL}/auth/sign_in/jwt`,
                    {email: currentUser?.email},
                    {withCredentials: true})
                    .then(response => {
                        console.log(`JSON Web Token: `, response?.data);
                    })
                    .catch(error => {
                        console.error("Error while requesting JWT:", error);
                    })
                    .finally(() => {
                        setUserLoading(false);
                    });
            } else {
                setUser(null);

                /!* REQUESTING JSON WEB TOKEN CLEAR THROUGH API *!/
                axios.post(`${BASE_URL}/auth/logout/clear_jwt`,
                    {},
                    {withCredentials: true})
                    .then(response => {
                        console.log(`JSON Web Token cleared: `, response?.data);
                    })
                    .catch(error => {
                        console.error("Error while clearing JWT:", error);
                    })
                    .finally(() => {
                        setUserLoading(false);
                    });
            }
        });

        /!* Cleanup observer on unmount *!/
        return () => {
            if (authentication_State_Observer) {
                authentication_State_Observer();
            }
        };
    }, []);*/ // Removed 'user' from dependency array



    const authInfo = {user, userLoading, signUpNewUser, signInExistingUsers, updateExistingUsers, signOutCurrentUser, resetPassword, signInWithGoogle};


    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};


AuthProvider.propTypes = {
    children: PropTypes.node,
}

export default AuthProvider;
