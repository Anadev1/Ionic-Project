import {
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonIcon,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./DogProfile.css";
import { addCircleOutline } from "ionicons/icons";
import dogExamplePhoto from "../images/dog-example-photo.png";

const DogProfile = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
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
