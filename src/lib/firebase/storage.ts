/* eslint-disable no-useless-catch */
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { nanoid } from 'nanoid';
import { storage } from './firebase';

export const uploadFile = async (file: File, folder: string): Promise<string> => {
  try {
    const filename = nanoid();
    const storageRef = ref(storage, `${folder}${filename}.${file.name.split('.').pop()}`);
    const res = await uploadBytes(storageRef, file);
    return res.metadata.fullPath;
  } catch (error) {
    throw error;
  }
};

export const getFile = async (path: string): Promise<string> => {
  try {
    const fileRef = ref(storage, path);
    return getDownloadURL(fileRef);
  } catch (error) {
    throw error;
  }
};
