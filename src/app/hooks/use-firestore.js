import { useState } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export const useFirestore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Add document
  const addDocument = async (collectionName, data) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setLoading(false);
      return docRef.id;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  // Update document
  const updateDocument = async (collectionName, docId, data) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date(),
      });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  // Delete document
  const deleteDocument = async (collectionName, docId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteDoc(doc(db, collectionName, docId));
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  // Get single document
  const getDocument = async (collectionName, docId) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);
      setLoading(false);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        return null;
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  // Get multiple documents
  const getDocuments = async (collectionName, filters = []) => {
    setLoading(true);
    setError(null);
    try {
      let q = collection(db, collectionName);

      // Apply filters if provided
      if (filters.length > 0) {
        const conditions = filters.map((filter) => {
          if (filter.type === "where") {
            return where(filter.field, filter.operator, filter.value);
          } else if (filter.type === "orderBy") {
            return orderBy(filter.field, filter.direction || "asc");
          } else if (filter.type === "limit") {
            return limit(filter.value);
          }
        });
        q = query(q, ...conditions);
      }

      const querySnapshot = await getDocs(q);
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });

      setLoading(false);
      return documents;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return {
    addDocument,
    updateDocument,
    deleteDocument,
    getDocument,
    getDocuments,
    loading,
    error,
  };
};
