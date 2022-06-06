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
import { useHistory } from "react-router-dom";

export default function DogProfile() {
   const history = useHistory();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="topbar">
          <IonButtons slot="start">
            <IonBackButton className="back-btn" text="" defaultHref="profile" />
          </IonButtons>
          <h1 className="topbar-title">Add dog</h1>
        </IonToolbar>
        </IonHeader>
      <IonContent fullscreen>
        <IonCard className="dog-profile-container">
          <IonCardContent className="dog-profile-info-section">
            <div className="dog-profile-image-container">
              <IonImg
                src={history.location.state.dog.image}
                className="dog-profile-photo"
                alt="user"
              />
              <p className="dog-profile-name">{history.location.state.dog.name}</p>
            </div>
          </IonCardContent>
        </IonCard>
        <div className="dog-profile-info-container">
          <p className="dog-profile-breed dog-profile-info">{history.location.state.dog.breed}</p>
          <p className="dog-profile-age dog-profile-info">{history.location.state.dog.age} </p>
          <p className="dog-profile-other-info dog-profile-info">
            {history.location.state.dog.additionalInfo}
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
}