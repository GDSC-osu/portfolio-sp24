import { getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth';

export const login = async (email, password) => {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password);
}
export const signout = async() => {
    const auth = getAuth();
    await signOut(auth)
}
