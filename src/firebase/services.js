// services.js

import { db } from './config';
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  getDocs,
  query
} from "firebase/firestore";

// Thêm document vào Firestore
export const addDocument = async (collectionName, data) => {
  try {
    const colRef = collection(db, collectionName);
    await addDoc(colRef, {
      ...data,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

// Tạo keywords cho displayName, sử dụng cho search
export const generateKeywords = (displayName) => {
  const name = displayName.split(' ').filter((word) => word);
  const length = name.length;
  let flagArray = [];
  let result = [];
  let stringArray = [];

  for (let i = 0; i < length; i++) {
    flagArray[i] = false;
  }

  const createKeywords = (name) => {
    const arrName = [];
    let curName = '';
    name.split('').forEach((letter) => {
      curName += letter;
      arrName.push(curName);
    });
    return arrName;
  };

  function findPermutation(k) {
    for (let i = 0; i < length; i++) {
      if (!flagArray[i]) {
        flagArray[i] = true;
        result[k] = name[i];

        if (k === length - 1) {
          stringArray.push(result.join(' '));
        }

        findPermutation(k + 1);
        flagArray[i] = false;
      }
    }
  }

  findPermutation(0);

  const keywords = stringArray.reduce((acc, cur) => {
    const words = createKeywords(cur);
    return [...acc, ...words];
  }, []);

  return keywords;
};

// Update keywords cho user hiện có
export const updateUserKeywords = async (uid, displayName) => {
  try {
    const userRef = doc(db, 'users', uid);
    const keywords = generateKeywords(displayName.toLowerCase());
    
    await updateDoc(userRef, {
      keywords: keywords
    });
    
    console.log('Updated keywords for user:', uid);
  } catch (error) {
    console.error('Error updating user keywords:', error);
  }
};

// Update keywords cho tất cả users
export const updateAllUsersKeywords = async () => {
  try {
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);
    
    const updatePromises = snapshot.docs.map(async (docSnapshot) => {
      const userData = docSnapshot.data();
      const uid = docSnapshot.id;
      
      if (!userData.keywords && userData.displayName) {
        const keywords = generateKeywords(userData.displayName.toLowerCase());
        const userRef = doc(db, 'users', uid);
        
        return updateDoc(userRef, {
          keywords: keywords
        });
      }
    });
    
    await Promise.all(updatePromises);
    console.log('Updated keywords for all users');
  } catch (error) {
    console.error('Error updating all users keywords:', error);
  }
};
