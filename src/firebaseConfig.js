import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBthQygEX0BYTIBuwrmSrXeDx7E_EWr-0k",
    authDomain: "foodfood-f92e9.firebaseapp.com",
    databaseURL: "https://foodfood-f92e9-default-rtdb.firebaseio.com",
    projectId: "foodfood-f92e9",
    storageBucket: "foodfood-f92e9.appspot.com",
    messagingSenderId: "617108121333",
    appId: "1:617108121333:web:8820d1a7958201f4e0c7bc",
  };

const app = initializeApp(firebaseConfig)

export default app