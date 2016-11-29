import firebase from 'firebase';

// CRUD: Creating, Reading, Updating, Deleting
try {
    let config = {
        apiKey           : "AIzaSyDRePLMppVIk1pj3sp8DPESm2X0WxuWnVg",
        authDomain       : "react-todo-7e0cb.firebaseapp.com",
        databaseURL      : "https://react-todo-7e0cb.firebaseio.com",
        storageBucket    : "react-todo-7e0cb.appspot.com",
        messagingSenderId: "600872856107"
    };

    firebase.initializeApp(config);
} catch (e) {

}

export let firebaseRef = firebase.database().ref();

// The reason for default is just to clean up files that import the firebase above
// They'll just need to import this to get the firebase object
export default firebase;