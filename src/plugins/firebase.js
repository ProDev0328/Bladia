import { firebase } from '@firebase/app';
import '@firebase/auth';


require('@firebase/firestore');
require('@firebase/storage');

const firebaseConfig = {
    apiKey: `${process.env.VUE_APP_FIREBASE_API_KEY}`,
    authDomain: `${process.env.VUE_APP_AUTH_DOMAIN}`,
    projectId: `${process.env.VUE_APP_PROJECT_ID}`,
    storageBucket: `${process.env.VUE_APP_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.VUE_APP_MESSAGING_SENDER_ID}`,
    appId: `${process.env.VUE_APP_APP_ID}`,
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();
export const auth = firebase.auth();
//export { firebase };
export { firebase, db, storage };