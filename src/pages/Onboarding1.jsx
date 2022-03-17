import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg,
} from "@ionic/react";
import OnboardingImg from "../images/onboarding-1.jpg";
import "./Start.css";

export default function Onboarding1() {
  return (
    <IonPage>
      <IonHeader>
        <IonImg className="post-img" src={OnboardingImg} />
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Onboarding</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
}
