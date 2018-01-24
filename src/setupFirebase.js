import firebase from 'firebase'



const config = {
    apiKey: "AIzaSyAe96xk5uHr5qyS25xl2-fZjuxIvRNo7fQ",
    authDomain: "todo-list-app-1ceb0.firebaseapp.com",
    databaseURL: "https://todo-list-app-1ceb0.firebaseio.com",
    projectId: "todo-list-app-1ceb0",
    storageBucket: "todo-list-app-1ceb0.appspot.com",
    messagingSenderId: "384171973947"
};


export default () => {
    firebase.initializeApp(config);
}