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

        const imageFile = productData['imageUrl'] as File;
        
        try {
            if (imageFile && imageFile.size > 0) {
                const imagePath = await uploadFile(imageFile, 'products/');
                productData['imageUrl'] = await getFile(imagePath);
            } else if (productId !== 'add') {
                const ref = doc(db, 'product2', productId);
                const snapshot = await getDoc(ref);
                if (snapshot.exists()) {
                    productData['imageUrl'] = snapshot.get('imageUrl');
                }
            } else {
                productData['imageUrl'] = '';
            }
            
            if (productId !== 'add') {
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
            console.error('Error updating product:', error);
            return {
                success: false,
                message: 'An error occurred while saving the product',
                details: error instanceof Error ? error.message : 'Unknown error'
            };
        }
        throw redirect(304, '/products');
    },
};