import {
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonButton
} from "@ionic/react";
import StartImg from "../images/start.jpg";
import "./Start.css";
import { useHistory } from "react-router-dom";


export default function Start() {
  const history = useHistory();
  
  return (
    <IonPage>
      <IonHeader>
        <IonImg className="post-img" src={StartImg} />
      </IonHeader>
      <IonContent fullscreen>
        <div className="start-container">
          <h2 className="start-headline">GoWalkies</h2>
          <p className="start-text">Walking Paws. Happy Dogs.</p>
        </div>

          <div className="ion-padding">
            <IonButton
              expand="block"
              onClick={() => history.replace("/signup")}
            >
              Sign up
            </IonButton>
          </div>
          <div className="ion-padding">
            <IonButton
              expand="block"
              fill="outline"
              onClick={() => history.replace("/login")}
            >
              Log in
            </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

