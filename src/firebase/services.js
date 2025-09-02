// services.js

import { db } from './config';
import {
  collection,
  addDoc,
  serverTimestamp
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
