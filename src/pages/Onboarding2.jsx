import { IonContent, IonHeader, IonPage, IonImg, IonIcon } from "@ionic/react";
import OnboardingImg from "../images/onboarding-2.jpg";
import { arrowForwardCircle } from "ionicons/icons";
import "./Start.css";
import { useHistory } from "react-router-dom";

export default function Onboarding2() {
  const history = useHistory();
  return (
    <IonPage>
      <IonHeader>
        <IonImg className="post-img" src={OnboardingImg} />
      </IonHeader>
      <IonContent fullscreen>
        <div className="start-container">
          <h2 className="start-headline-alt">
            Add your walkies & find a walker in your area
          </h2>
        </div>

        <div className="text-container">
          <p className="onboarding-text">
            Once you are signed up, you simply add your walk to the app and
            we will find you a walker.
          </p>
        </div>

        <div className="btn-container-alt">
          <div>
            <span
              className="dot"
              onClick={() => history.replace("/onboarding1")}
            ></span>
            <span className="dot-selected"></span>
            <span
              className="dot"
              onClick={() => history.replace("/onboarding3")}
            ></span>
          </div>

          <IonIcon
            className="onboarding-btn"
            icon={arrowForwardCircle}
            onClick={() => history.replace("/onboarding3")}
          />
        </div>
      </IonContent>
    </IonPage>
  );
}
