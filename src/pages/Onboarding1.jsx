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
            Welcome to GoWalkies - the dog walking app
          </h2>
        </div>

        <div className="text-container">
          <p className="onboarding-text">
            Do you want to exercise your dog more but struggle to find the time? GoWalkies is the app for you!
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
