import {
    IonContent,
    IonImg,
    IonHeader,
    IonPage,
    IonButton,
    IonItem,
    IonInput,
    IonText,
  
} from "@ionic/react";
import LoginImg from "../images/login.jpg";
import "./Start.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


export default function Login() {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const auth = getAuth();

    function handleSubmit(event) {
        event.preventDefault();
        signInWithEmailAndPassword(auth, mail, password)
            .then(userCredential => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
            })
            .catch(error => {
                console.log(error)
            });
    }

  return (
    <IonPage>
      <IonHeader>
        <IonImg className="post-img" src={LoginImg} />
      </IonHeader>
      <IonContent fullscreen>
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonInput
              value={mail}
              type="email"
              placeholder="Email"
              onIonChange={(e) => setMail(e.target.value)}
            />
          </IonItem>
          <IonItem>
            <IonInput
              value={password}
              type="password"
              placeholder="Password"
              onIonChange={(e) => setPassword(e.target.value)}
            />
          </IonItem>
          <div className="ion-padding">
            <IonButton type="submit" expand="block">
              Log in
            </IonButton>
          </div>
          <div className="login-container">
            <p className="login-text">Don't have an account?</p>
            <IonText
              class="login-button"
              onClick={() => history.replace("/signup")}
            >
              Sign up
            </IonText>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

