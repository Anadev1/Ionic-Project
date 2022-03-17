import {
  IonButton,
  IonContent,
  IonHeader,
  IonImg,
  IonInput,
  IonPage,
  IonIcon,
  IonText,
} from "@ionic/react";
import SignupImg from "../images/signup.jpg";
import "./Start.css";
import { mailSharp, lockClosed } from "ionicons/icons";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, mail, password)
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
    <IonPage color="light">
      <IonHeader>
        <IonImg className="post-img" src={SignupImg} />
      </IonHeader>
      <IonContent fullscreen>
        <div className="start-container">
          <h2 className="start-headline">Sign up</h2>
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
              Sign up
            </IonButton>
          </div>
          <div className="info-container">
            <p className="login-text">Already have an account?</p>
            <IonText
              class="login-btn"
              onClick={() => history.replace("/login")}
            >
              Log in
            </IonText>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
}
