// import firebase from 'firebase/app'
import firebase from 'firebase/compat/app';
import "firebase/compat/database"


const firebaseConfig = {
    apiKey: "AIzaSyCrTYXRBXKiVc3tNcGndJqdDWVFwDrbYR4",
    authDomain: "contact-manager-9ba7a.firebaseapp.com",
    projectId: "contact-manager-9ba7a",
    storageBucket: "contact-manager-9ba7a.appspot.com",
    messagingSenderId: "92376474516",
    appId: "1:92376474516:web:fdb3b002df47d6f8d7a581"
  };
  const fireDb= firebase.initializeApp(firebaseConfig)
  export default fireDb.database().ref();






// import firebase from 'firebase/compat/app';
// import "firebase/compat/database"

// const firebaseConfig = {
//     apiKey: "AIzaSyBtjQGX13ZN0rXaAVxMlgRiEfBKJmtsx6o",
//     authDomain: "newcontactmanager-f8976.firebaseapp.com",
//     projectId: "newcontactmanager-f8976",
//     storageBucket: "newcontactmanager-f8976.appspot.com",
//     messagingSenderId: "648726353456",
//     appId: "1:648726353456:web:8e0c441d399e1e3caa7ff5"
//   };

//   const fireDb= firebase.initializeApp(firebaseConfig)
//   export default fireDb.database().ref();