import { db } from "$lib/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const load = async ({ url, depends }) => {
    depends('products:now');
    const filter = url.searchParams.get('filter') || '';

    const ref = collection(db, 'product2');
    let q;
    if (filter) {
        q = query(ref,
            where('status', '==', filter)
        )
    } else {
        q = ref
    }
	const snapshot = await getDocs(q);
	const productList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return {
        productList
    }
}