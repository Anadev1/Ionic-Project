import {
  IonButton,
  IonContent,
  IonHeader,
  IonImg,
  IonInput,
  IonPage,
  IonIcon,
} from "@ionic/react";
import SignupImg from "../images/signup.jpg";
import "./Start.css";
import { mailSharp, lockClosed } from "ionicons/icons";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

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
        </form>
      </IonContent>
    </IonPage>
  );
}
