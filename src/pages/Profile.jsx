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
        <IonCard>
          <IonCardContent className="user-info-section">
            <div className="user-image-container">
              <IonImg src="" />
              <a>Edit</a>
            </div>

            <div className="user-info-text">
              <IonCardSubtitle>Jens Frederiken</IonCardSubtitle>
              <p>Tordenskjoldgade 2, 3.7, Aarhus C</p>
            </div>
          </IonCardContent>
        </IonCard>
        <span className="divider"></span>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
