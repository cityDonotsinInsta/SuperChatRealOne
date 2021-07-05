import React, {useRef, useState} from 'react';
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

    const [user] = useAuthState(auth);
    
  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn(){
    const signInWithGoogle = () =>
    {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom(){
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, {idField: 'id'});
    const [formValue, setFormValue] = useState('');

    const sendMessage = async(e) =>
    {
        e.preventDefault();

        const {uid, photoURL} = auth.currentUser;

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
          });

          setFormValue('');
    }


    return (<>
        <main>
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        </main>
            
        <form onSubmit={sendMessage}>

         <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

         <button type="submit" disabled={!formValue}>🕊️</button>

        </form>

    </>)


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
