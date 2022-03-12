import { IonButton, IonContent, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonPage } from "@ionic/react";
import SignupImg from "../images/signup.jpg";
import "./Start.css";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  function handleSubmit(event) {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, mail, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch(error => {
        console.log(error);
      });
  }
  return (
    <IonPage>
      <IonHeader>
        <IonImg className="post-img" src={SignupImg} />
      </IonHeader>
      <IonContent>
        <div className="start-container">
          <h2 className="start-headline">Sign up</h2>
          <form onSubmit={handleSubmit}>
            <IonItem>
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput
                value={mail}
                type="email"
                placeholder="Email"
                onIonChange={e => setMail(e.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Password</IonLabel>
              <IonInput
                value={password}
                type="password"
                placeholder="Password"
                onIonChange={e => setPassword(e.target.value)}
              />
            </IonItem>
            <div className="ion-padding">
              <IonButton type="submit" expand="block">
                Sign up
              </IonButton>
            </div>
  
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

