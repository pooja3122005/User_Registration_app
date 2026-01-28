/**
 * Firestore Service
 * Handles all database operations for submissions
 */

import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  query, 
  orderBy, 
  serverTimestamp,
  deleteDoc 
} from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION_NAME = 'submissions';

/**
 * Create a new submission
 * @param {Object} submissionData - Submission data
 * @returns {Promise<string>} - Document ID
 */
export const createSubmission = async (submissionData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...submissionData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error creating submission:', error);
    throw new Error('Failed to create submission. Please try again.');
  }
};

/**
 * Get all submissions
 * @returns {Promise<Array>} - Array of submissions
 */
export const getAllSubmissions = async () => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const submissions = [];
    
    querySnapshot.forEach((doc) => {
      submissions.push({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore timestamp to JavaScript Date
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      });
    });
    
    return submissions;
  } catch (error) {
    console.error('Error fetching submissions:', error);
    throw new Error('Failed to fetch submissions. Please try again.');
  }
};

/**
 * Get a single submission by ID
 * @param {string} id - Submission ID
 * @returns {Promise<Object>} - Submission data
 */
export const getSubmissionById = async (id) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error('Submission not found');
    }
    
    return {
      id: docSnap.id,
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt?.toDate(),
      updatedAt: docSnap.data().updatedAt?.toDate()
    };
  } catch (error) {
    console.error('Error fetching submission:', error);
    throw error;
  }
};

/**
 * Delete a submission
 * @param {string} id - Submission ID
 * @returns {Promise<void>}
 */
export const deleteSubmission = async (id) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error('Error deleting submission:', error);
    throw new Error('Failed to delete submission. Please try again.');
  }
};

/**
 * Check database connectivity
 * @returns {Promise<boolean>} - Connection status
 */
export const checkConnection = async () => {
  try {
    await getDocs(collection(db, COLLECTION_NAME));
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
};