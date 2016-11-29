import firebase from 'firebase';

let config = {
    apiKey           : "AIzaSyDRePLMppVIk1pj3sp8DPESm2X0WxuWnVg",
    authDomain       : "react-todo-7e0cb.firebaseapp.com",
    databaseURL      : "https://react-todo-7e0cb.firebaseio.com",
    storageBucket    : "react-todo-7e0cb.appspot.com",
    messagingSenderId: "600872856107"
};

firebase.initializeApp(config);
// CRUD: Creating, Reading, Updating, Deleting

let firebaseRef = firebase.database().ref();
// Get the reference and set some data to our database
firebaseRef.set({
    app      : {
        name   : 'Todo App',
        version: 4.2
    },
    isRunning: true,
    user     : {
        name: 'John',
        age : 22
    },
    // // How to store arrays in firebase
    // todos    : {
    //     // id
    //     '123456': {
    //         text: 'you drunk'
    //     }
    // }
});

// // Set completely wipes all the data at the current reference
// // In this case the root reference which everything
// firebaseRef.set({
//     appName: 'Todo Application'
// });
//
// // The reference is pointing at the user
// firebaseRef.child('user').set({
//     name: 'Nina'
// // The set method also returns a promise
// }).then(() => {
//     // Success
//     console.log('Set worked!');
// }, (e) => {
//     // Error
//     console.log('Set failed!');
// });
//
// firebaseRef.child('app').set({
//     name: 'Changed the app name'
// }).then(() => {
//     console.log('Set worked!');
// }, (e) => {
//     console.log('Set failed!');
// });

// // Just updates and doesn't wipe out the database
// update() returns a promise too
// firebaseRef.update({
//     isRunning    : false,
//     // Will fail because update only updates the first level of properties
//     // app : {
//     //     name: 'Todo Application'
//     // }
//     // Multi-path updates
//     'app/name'   : 'Todo Application',
//     'app/version': 999
// });
//
// // Same as multi-path value above
// firebaseRef.child('app').update({
//     name   : 'Todo Application',
//     version: 999
// }).then(() => {
//     console.log('Update worked!');
// }, (e) => {
//     console.log('Update failed!');
// });
//
// firebaseRef.update({
//     'app/name' : 'Must do?',
//     'user/name': 'User'
// });
//
// firebaseRef.child('app').update({
//     name: '???'
// });
//
// firebaseRef.child('user').update({
//     name: 1337
// });

// // Wipe the database completely
// firebaseRef.remove();
//
// // Remove app/name from our database
// firebaseRef.child('app/name').remove();
//
// firebaseRef.child('app').update({
//     version: '2.0',
//     // Remove the data 'app/name' completely
//     name   : null
// });
//
// firebaseRef.update({
//     'isRunning': null
// });
//
// firebaseRef.child('user/age').remove();

// // Allow to trigger and listen for an event
// // Fetch all of the data available at the current reference
// // firebaseRef.once('value').child('app') ... gets the data of app which is a subset
// firebaseRef.child('app').once('value').then(
//     (snapshot) => {
//         // .val() returns the data
//         // .key returns the value of the key which is app in this case
//         console.log('Got entire database: ', snapshot.key, snapshot.val());
//     },
//     (e) => {
//         console.log('Unable to fetch value', e);
//     }
// );

// // Listen for changes in our firebase database
// // Listens for more than just one triggering of the event
// // Meaning every time our database changes we can do something with that data
// firebaseRef.on('value', (snapshot) => {
//     console.log('Got value', snapshot.val());
// });
//
// // Turn off the listener for .on('value', ...)
// firebaseRef.off();
//
// // Another way to do this is
// let logData = (snapshot) => {
//     console.log('Got value', snapshot.val());
// };
//
// firebaseRef.on('value', logData);
//
// firebaseRef.update({
//     isRunning: false
// });
//
// // The difference by passing a function into .off() is we just remove that one listener
// // Without a function means that we're wiping every single event listener
// firebaseRef.off('value', logData);
//
// firebaseRef.child('user').on('value', (snapshot) => {
//     console.log('User ref changed ', snapshot.val());
// });
//
// firebaseRef.update({
//     'user/name': 'Jeff'
// });
//
// firebaseRef.child('app').update({
//     name: 'updated app/name'
// });

// let notesRef = firebaseRef.child('notes');
//
// // Create a new item at the current reference and return that reference to us so we can add some data to it
// // let newNoteRef = notesRef.push();
// // newNoteRef.set({
// //     text: 'Walk the doggo'
// // });
//
// // 'child_added' gets fired every time we add a new child to that reference
// notesRef.on('child_added', (snapshot) => {
//     console.log('child_added', snapshot.key);
// });
//
// // 'child_added' gets fired every time we change an existing child to that reference
// notesRef.on('child_changed', (snapshot) => {
//     console.log('child_changed', snapshot.key);
// });
//
// // 'child_remove' gets fired every time we change an remove a child from that reference
// notesRef.on('child_removed', (snapshot) => {
//     console.log('child_removed', snapshot.key);
// });
//
// // Shortcut of the above with the 'Walk the doggo'
// let newNoteRef = notesRef.push({
//     text: 'Walk the doggo'
// });
// console.log('New note ID: ', newNoteRef.key);

let todosRef = firebaseRef.child('todos');

todosRef.on('child_added', (snapshot) => {
    console.log('child_added', snapshot.key, ' ', snapshot.val());
});

let newTodoRef = todosRef.push({
    text: 'Go home'
});

let newTodoRef2 = todosRef.push({
    text: 'somewhere?'
});

// JSON object
// {
//     appName: 'Todo App',
//     isRunning: true,
//
// }

// Let our databases be edited by anyone even if they are not authenticated
// {
//     "rules": {
//         ".read": "true",
//         ".write": "true"
//     }
// }
