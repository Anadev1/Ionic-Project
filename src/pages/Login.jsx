import {
    IonContent,
    IonImg,
    IonHeader,
    IonPage,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
  
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
            <IonLabel position="stacked">Mail</IonLabel>
            <IonInput
              value={mail}
              type="email"
              placeholder="Email"
              onIonChange={(e) => setMail(e.target.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
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
          <div className="ion-text-center">
            <IonButton
              size="small"
              fill="clear"
              onClick={() => history.replace("/signup")}
            >
              Don't have an account? <b>Sign up</b>
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

