import {getFirestore, doc, setDoc, getDoc} from 'firebase/firestore';

export const addPost = async(posts, title, content, month, day, year) => {
    const db = getFirestore();

    await setDoc(doc(db, "posts", "main"), {
        "posts": [{title, content, month, day, year}, ...posts]
    });
}

export const readPosts = async() => {
    const db = getFirestore();
    const docSnap = await getDoc(doc(db, "posts", "main"));
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null
    }
}