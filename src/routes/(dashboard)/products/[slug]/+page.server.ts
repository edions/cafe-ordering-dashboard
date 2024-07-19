import { db } from "$lib/firebase/firebase";
import { getFile, uploadFile } from "$lib/firebase/storage";
import { redirect } from "@sveltejs/kit";
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";

export const load = async ({ params }) => {
    const productId = params.slug;
    
    if(productId !== 'add') {
        const ref = doc(db, 'product2', productId);
        const snapshot = await getDoc(ref);

        if (snapshot.exists()) {
            return {
                productName: snapshot.get('productName'),
                productDescription: snapshot.get('productDescription'),
                stock: snapshot.get('stock'),
                price: snapshot.get('price'),
                image: snapshot.get('imageUrl'),
                category: snapshot.get('category'),
                status: snapshot.get('status'),
            }
        }
    }
}

export const actions = {
    default: async ({ params, request }) => {
        const productId = params.slug;
        const addProductData = await request.formData();
        const productData = Object.fromEntries([...addProductData]);

        console.log(productData['imageUrl'])

        if (productData['imageUrl']) {
            const image = productData['imageUrl'] as File;
            const imagePath = await uploadFile(image, 'products/');
            productData['imageUrl'] = await getFile(imagePath);
        }

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
                    createdAt: serverTimestamp(),
                });
            }
        } catch (error) {
            return {
                error
            }
        }

        throw redirect(304, '/products');
    },
};