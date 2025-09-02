import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const useFirestore = (collectionName, condition) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    if (!collectionName) return;

    const collectionRef = collection(db, collectionName);

    let q;

    // Nếu có điều kiện filter
    if (condition && condition.compareValue) {
      // nếu compareValue rỗng thì reset state
      if (
        Array.isArray(condition.compareValue) &&
        condition.compareValue.length === 0
      ) {
        setDocuments([]);
        return;
      }

      q = query(
        collectionRef,
        where(condition.fieldName, condition.operator, condition.compareValue),
        orderBy("createdAt")
      );
    } else {
      // nếu không có điều kiện thì chỉ orderBy
      q = query(collectionRef, orderBy("createdAt"));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocuments(docs);
    });

    return () => unsubscribe();
  }, [collectionName, condition]);

  return documents;
};

export default useFirestore;
