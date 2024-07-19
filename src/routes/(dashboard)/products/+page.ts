import { db } from "$lib/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export const load = async () => {
    const ref = collection(db, 'product2');
	const snapshot = await getDocs(ref);
	const productList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return {
        productList
    }
}