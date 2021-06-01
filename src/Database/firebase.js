import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDauKQ9We5ICL_h9t5tygM9YzLQuAP6cvg",
    authDomain: "ecommerce-web-yy.firebaseapp.com",
    projectId: "ecommerce-web-yy",
    storageBucket: "ecommerce-web-yy.appspot.com",
    messagingSenderId: "564185564332",
    appId: "1:564185564332:web:7142af0b6cdbd7c4298b09",
    measurementId: "G-VV10NLTHQ2"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db ,auth, storage };