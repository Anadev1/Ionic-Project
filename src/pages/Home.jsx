import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText } from '@ionic/react';
import './Home.css';
import { useHistory } from "react-router-dom";

export default function Home() {
    const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div>
          <IonText
            class="login-btn"
            onClick={() => history.replace("/usersetup")}
          >
            User set up
          </IonText>
          <br></br>
          <IonText
            class="login-btn"
            onClick={() => history.replace("/dogsetup")}
          >
            Dog set up
          </IonText>
          <br></br>
          <IonText
            class="login-btn"
            onClick={() => history.replace("/onboarding1")}
          >
            Onboarding
          </IonText>
        </div>

      </IonContent>
    </IonPage>
  );
};
