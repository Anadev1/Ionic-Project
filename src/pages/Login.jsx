import {
  IonContent,
  IonImg,
  IonHeader,
  IonPage,
  IonButton,
  IonInput,
  IonText,
  IonIcon,
} from "@ionic/react";
import LoginImg from "../images/login.jpg";
import "./Start.css";
import { mailSharp, lockClosed } from "ionicons/icons";
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
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonImg className="post-img" src={LoginImg} />
      </IonHeader>
      <IonContent fullscreen>
        <div className="start-container">
          <h2 className="start-headline">Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="form-container">
              <IonIcon icon={mailSharp} />
              <IonInput
                value={mail}
                type="email"
                placeholder="Email"
                onIonChange={(e) => setMail(e.target.value)}
              />
            </div>
            <div className="form-container">
              <IonIcon icon={lockClosed} />
              <IonInput
                value={password}
                type="password"
                placeholder="Password"
                onIonChange={(e) => setPassword(e.target.value)}
              />
            </div>
          <div className="btn-container">
            <IonButton className="start-btn" type="submit" expand="block">
              Log in
            </IonButton>
          </div>
          <div className="info-container">
            <p className="login-text">Don't have an account?</p>
            <IonText
              class="login-signup-btn"
              onClick={() => history.replace("/signup")}
            >
              Sign up
            </IonText>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
}
