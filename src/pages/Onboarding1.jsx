import {
  IonContent,
  IonHeader,
  IonPage,
  IonImg,
  IonIcon
} from "@ionic/react";
import OnboardingImg from "../images/onboarding-1.jpg";
import { arrowForwardCircle } from "ionicons/icons";
import "./Start.css";
import { useHistory } from "react-router-dom";

export default function Onboarding1() {
      const history = useHistory();
  return (
    <IonPage>
      <IonHeader>
        <IonImg className="post-img" src={OnboardingImg} />
      </IonHeader>
      <IonContent fullscreen>
        <div className="start-container">
          <h2 className="start-headline-alt">
            Create a profile for you and your furry friend
          </h2>
        </div>

        <div className="text-container">
          <p className="onboarding-text">
            To use GoWalkies you need a profile for both you and your dog(s)
            and simply fill in some information.
          </p>
        </div>

        <div className="btn-container-alt">
          <div>
            <span className="dot-selected"></span>
            <span
              className="dot"
              onClick={() => history.replace("/onboarding2")}
            ></span>
            <span
              className="dot"
              onClick={() => history.replace("/onboarding3")}
            ></span>
          </div>

          <IonIcon
            className="onboarding-btn"
            icon={arrowForwardCircle}
            onClick={() => history.replace("/onboarding2")}
          />
        </div>
      </IonContent>
    </IonPage>
  );
}
