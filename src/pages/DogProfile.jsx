import {
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonButtons,
  IonBackButton,
  IonToolbar,
} from "@ionic/react";
import "./DogProfile.css";
import dogExamplePhoto from "../images/dog-example-photo.png";

const DogProfile = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="topbar">
          <IonButtons slot="start">
            <IonBackButton className="back-btn" text="" defaultHref="home" />
          </IonButtons>
          <h1 className="topbar-title">Add dog</h1>
        </IonToolbar>
        </IonHeader>
      <IonContent fullscreen>
        <IonCard className="dog-profile-container">
          <IonCardContent className="dog-profile-info-section">
            <div className="dog-profile-image-container">
              <IonImg
                src={dogExamplePhoto}
                className="dog-profile-photo"
                alt="user"
              />
              <p className="dog-profile-name">Beautiful doggo</p>
            </div>
          </IonCardContent>
        </IonCard>
        <div className="dog-profile-info-container">
          <p className="dog-profile-breed dog-profile-info">Border Collie</p>
          <p className="dog-profile-age dog-profile-info">2 years old </p>
          <p className="dog-profile-other-info dog-profile-info">
            This dog is amazing. If you do anything to my dog I swear I will
            kill you with my bare hands. He likes snacks and long walks along
            the beach
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DogProfile;
