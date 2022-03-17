import {
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Profile.css";

const Profile = () => {
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
        <IonCard className="user-container">
          <IonCardContent className="user-info-section">
            <div className="user-image-container">
              <IonImg src="" />
              <p>Edit</p>
            </div>

            <div className="user-info-text">
              <IonCardSubtitle>Jens Frederiken</IonCardSubtitle>
              <p>Tordenskjoldgade 2, 3.7, Aarhus C</p>
            </div>
          </IonCardContent>
        </IonCard>
        <IonCard className="dogs-container">
          <IonCardContent className="dogs-info-section">
            <div className="dog-image-container">
              <IonImg src="" />
            </div>

            <div className="user-info-text">
              <IonCardSubtitle>Jens Frederiken</IonCardSubtitle>
              <p>Tordenskjoldgade 2, 3.7, Aarhus C</p>
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
