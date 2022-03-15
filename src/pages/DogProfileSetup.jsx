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
  IonTextarea,
} from "@ionic/react";
import "./DogProfileSetup.css";

const DogProfileSetup = () => {
  return (
    <IonPage color="light">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dog Profile Setup</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Dog Profile Setup</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonImg src="assets/dog-photo-placeholder.png" className="dog-photo" />

        <IonList>
          <IonItem>
            <IonInput type="text" placeholder="Name" />
          </IonItem>
          <IonItem>
            <IonInput type="text" placeholder="Age" />
          </IonItem>

          <IonItem>
            <IonTextarea
              placeholder="Additional information"
              className="additional-information-field"
            ></IonTextarea>
          </IonItem>
        </IonList>

        <IonButton className="setup-btn">Add dog to profile</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default DogProfileSetup;
