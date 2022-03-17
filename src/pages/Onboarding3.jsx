import { IonContent, IonHeader, IonPage, IonImg, IonIcon } from "@ionic/react";
import OnboardingImg from "../images/onboarding-3.jpg";
import { arrowForwardCircle } from "ionicons/icons";
import "./Start.css";
import { useHistory } from "react-router-dom";

export default function Onboarding3() {
  const history = useHistory();
  return (
    <IonPage>
      <IonHeader>
        <IonImg className="post-img" src={OnboardingImg} />
      </IonHeader>
      <IonContent fullscreen>
        <div className="start-container">
          <h2 className="start-headline-alt">
            Select your walker & send your dog on their way
          </h2>
        </div>

        <div className="text-container">
          <p className="onboarding-text">
            Last step is to select a walker that you think will be a match with
            your dog and send them on their way.
          </p>
        </div>

        <div className="btn-container-alt">
          <div>
            <span
              className="dot"
              onClick={() => history.replace("/onboarding1")}
            ></span>
            <span
              className="dot"
              onClick={() => history.replace("/onboarding2")}
            ></span>
            <span className="dot-selected"></span>
          </div>

          <IonIcon
            className="onboarding-btn"
            icon={arrowForwardCircle}
            onClick={() => history.replace("/usersetup")}
          />
        </div>
      </IonContent>
    </IonPage>
  );
}
