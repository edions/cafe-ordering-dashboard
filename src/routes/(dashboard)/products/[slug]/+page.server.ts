import { db } from "$lib/firebase/firebase";
import { getFile, uploadFile } from "$lib/firebase/storage";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";

export const actions = {
    default: async ({ params, request }) => {
        const productId = params.slug;
        const addProductData = await request.formData();
        const productData = Object.fromEntries([...addProductData]);

        const image = productData['imageUrl'] as File;
		const imagePath = await uploadFile(image, 'products/');
		const imageUrl = await getFile(imagePath);

        try {
            if(productId !== 'add') {
                const ref = doc(db, 'product2', productId);
                await updateDoc(ref, {
                    ...productData
                });
            } else {
                const ref = collection(db, 'product2');
                await addDoc(ref, {
                    ...productData,
                    imageUrl,
                    createdAt: serverTimestamp(),
                });
            }
        } catch (error) {
            return {
                error
            }
        }
    },
};