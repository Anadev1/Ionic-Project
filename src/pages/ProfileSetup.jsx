import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./ProfileSetup.css";
import UserForm from "../components/UserForm";

export default function ProfileSetup() {
  // }

  return (
    <IonPage color="light">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile Setup</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profile Setup</IonTitle>
          </IonToolbar>
        </IonHeader>

        <UserForm handleSubmit={UserForm.handleSubmit} />
      </IonContent>
    </IonPage>
  );
}
