import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {
  getMessaging,
  onMessage,
  deleteToken,
  getToken,
} from "firebase/messaging";

function App() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("./firebase-messaging-sw.js")
        .then(function (registration) {
          console.log("Registration successful, scope is:", registration.scope);
        })
        .catch(function (err) {
          console.log("Service worker registration failed, error:", err);
        });
    }
    // https://github.com/react-boilerplate/react-boilerplate/issues/2952
    const firebaseConfig = {
      apiKey: "AIzaSyBZKDnw-ZcmJmoRoj5Xa4QfxqTOBncPsug",
      authDomain: "esoteric-might-286620.firebaseapp.com",
      projectId: "esoteric-might-286620",
      storageBucket: "esoteric-might-286620.appspot.com",
      messagingSenderId: "684233703781",
      appId: "1:684233703781:web:d3a1fcdcf92713bc47a18c",
    };

    firebase.initializeApp(firebaseConfig);
    const messaging = getMessaging();

    onMessage(messaging, function (payload) {
      console.log("onMessage event ", payload);
    });

    navigator.serviceWorker.addEventListener("message", (message) => {
      console.log("message event", message);
    });
  }, []);

  // Send the registration token your application server, so that it can:
  // - send messages back to this app
  // - subscribe/unsubscribe the token from topics
  const sendTokenToServer = (currentToken: any) => {
    if (!isTokenSentToServer()) {
      console.log("Sending token to server...");
      // TODO(developer): Send the current token to your server.
      setTokenSentToServer(true);
    } else {
      console.log(
        "Token already sent to server so won't send it again unless it changes"
      );
    }
  };

  const isTokenSentToServer = () => {
    return window.localStorage.getItem("sentToServer") === "1";
  };

  const setTokenSentToServer = (sent: boolean) => {
    window.localStorage.setItem("sentToServer", sent ? "1" : "0");
  };

  const requestPermission = () => {
    console.log("Requesting permission...");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
        // TODO(developer): Retrieve a registration token for use with FCM.
      } else {
        console.log("Unable to get permission to notify.");
      }
    });
  };

  const token = () => {
    const messaging = getMessaging();

    getToken(messaging, { vapidKey: process.env.REACT_APP_FIREBASE_VALID_PAIR_KEYS })
      .then((currentToken) => {
        if (currentToken) {
          console.log("TOKEN: ", currentToken);
          sendTokenToServer(currentToken);
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          );
          setTokenSentToServer(false);
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        setTokenSentToServer(false);
      });
  };
  // 1st time: network call, next: cache

  const deleteTheToken = () => {
    const messaging = getMessaging();
    deleteToken(messaging)
      .then(() => {
        console.log("Token deleted.");
        setTokenSentToServer(false);
      })
      .catch((err: any) => {
        console.log("Unable to delete token. ", err);
      });
  };

  return (
    <div className="App">
      <h1>Teste Firebase</h1>
      <button onClick={requestPermission}>Obter permissão</button>
      <button onClick={token}>Inscrever-se</button>
      <button onClick={deleteTheToken}>Desincrever</button>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
