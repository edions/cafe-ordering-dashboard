import { db } from "$lib/firebase/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export const actions = {
    addProduct: async ({ request }) => {
        const productData = await request.formData();
        const product = Object.fromEntries([...productData]);

        try {
            const ref = collection(db, 'product2');
            await addDoc(ref, {
                ...product,
                createdAt: serverTimestamp(),
            });
        } catch (error) {
            return {
                error
            }
        }
    }
};