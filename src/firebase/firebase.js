import { firebaseConfig } from './config';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage';


firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const fireauth = firebase.auth;

const settings = {timestampsInSnapshots: true};

export const firestore = firebase.firestore();

export const firebasestore = firebase.firestore;
export const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
  };

 export const storage = firebase.storage();
