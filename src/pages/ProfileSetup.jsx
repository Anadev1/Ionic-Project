import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonBackButton
} from "@ionic/react";
import "./ProfileSetup.css";
import UserForm from "../components/UserForm";

export default function ProfileSetup() {


  return (
    <IonPage color="light">
      <IonHeader>
        <IonToolbar className="topbar">
          <IonButtons slot="start">
            <IonBackButton className="back-btn" text="" defaultHref="profile" />
          </IonButtons>

          <h1 className="topbar-title">Edit profile</h1>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <UserForm handleSubmit={UserForm.handleSubmit} />
      </IonContent>
    </IonPage>
  );
}
