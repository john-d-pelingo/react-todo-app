import firebase from 'firebase';

// CRUD: Creating, Reading, Updating, Deleting
try {
    let config = {
        apiKey           : process.env.API_KEY,
        authDomain       : process.env.AUTH_DOMAIN,
        databaseURL      : process.env.DATABASE_URL,
        storageBucket    : process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID
    };

    firebase.initializeApp(config);
} catch (e) {

}

// Used in our actions file to authenticate with Github
export let githubProvider = new firebase.auth.GithubAuthProvider();
export let firebaseRef = firebase.database().ref();

// The reason for default is just to clean up files that import the firebase above
// They'll just need to import this to get the firebase object
export default firebase;