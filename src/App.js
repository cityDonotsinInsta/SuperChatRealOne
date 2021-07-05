import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore' ;

firebase.initializeApp({
    apiKey: "AIzaSyBk8KEDI_ZVr7oLcm8UUN-aZMK6wpb78i8",
    authDomain: "superchatprogramm.firebaseapp.com",
    projectId: "superchatprogramm",
    storageBucket: "superchatprogramm.appspot.com",
    messagingSenderId: "757417196773",
    appId: "1:757417196773:web:7f24cfc315bb84cae6280c",
    measurementId: "G-644TT01F8C"
})

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {
  return (
    <div className="App">
      <header className="App-header">
       Hello

        {SignIn()}
       {ChatRoom()}

      </header>
    </div>
  );
}

function SignIn(){
    const signInWithGoogle = () =>
    {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.singInWithPopup(provider);
    }

    return <button onClick={signInWithGoogle}>Sign in with Google</button>
}

function SignOut(){
    return auth.currentUser && (

        <button onClick={() => auth.signOut}>Sign Out</button>
    )
}

function ChatRoom(){
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, {idField: 'id'});


    return (
        <>
            <div>
                {messages && messages.map(msg => <ChatMessage key = {msg.id} message = {msg}/>)}
            </div>
            
        </>
   )


}

function ChatMessage(props){

    const { text, uid , photoURL } = props.message;
    const messageClass = uid === auth.currentUser.uid ?  'sent' : 'received';

    return (<div className = {`message ${messageClass}`}>
    <img src="{photoURL}"/>
    <p>{text}</p>
    </div>)
}

export default App;

/*
 <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        */
