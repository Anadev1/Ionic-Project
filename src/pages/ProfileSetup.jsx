import {
  IonButton,
  IonContent,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./ProfileSetup.css";

const ProfileSetup = () => {
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
        <IonImg
          src="assets/user-photo-placeholder.png"
          className="user-photo"
        />

        <IonList>
          <IonItem>
            <IonInput type="text" placeholder="Address" />
          </IonItem>
          <IonItem>
            <IonInput type="text" placeholder="City" />
          </IonItem>
        </IonList>

        <IonTitle>My Dog(s)</IonTitle>

        <IonButton className="setup-btn">Done</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ProfileSetup;
