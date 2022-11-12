//firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAZEM4NLh_f0GfJMV7NxXe-foNyKEUtgCM",
    authDomain: "hackathon-prac-4bbab.firebaseapp.com",
    projectId: "hackathon-prac-4bbab",
    storageBucket: "hackathon-prac-4bbab.appspot.com",
    messagingSenderId: "943637009709",
    appId: "1:943637009709:web:89821171ecf2765fa3efa4",
    measurementId: "G-E0XLTXKWWV"
  };

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const apiKey = firebaseConfig.apiKey;


// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore, storage, auth, apiKey };