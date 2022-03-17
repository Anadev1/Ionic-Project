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
  IonButton
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./Profile.css";
import { addCircleOutline } from "ionicons/icons";
import userExamplePhoto from "../images/user-example-photo.png";
import dogExamplePhoto from "../images/dog-example-photo.png";
import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { getUserRef } from "../firebase-config";
import { get } from "@firebase/database";


export default function Profile() {
const history = useHistory();
const auth = getAuth();
const [user, setUser] = useState({});
const [name, setName] = useState("");

  console.log(name);

useEffect(() => {
  setUser(auth.currentUser);

  async function getUserDataFromDB() {
    const snapshot = await get(getUserRef(user.uid));
    const userData = snapshot.val();
    if (userData) {
      setName(userData.name);
    }
  }

  if (user) getUserDataFromDB();
}, [auth.currentUser, user]);

function handleSignOut() {
  signOut(auth);
}

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
              <IonImg
                src={userExamplePhoto}
                className="user-profile-photo"
                alt="user"
              />
              <p>Edit</p>
            </div>

            <div className="user-info-text">
              <IonCardSubtitle>Jens Frederiken</IonCardSubtitle>
              <p>Tordenskjoldgade 2, 3.7, Aarhus C</p>
            </div>
          </IonCardContent>
        </IonCard>
        <h2 className="dogs-container-title">My Dog(s)</h2>
        <ul className="dogs-container">
          <li
            className="dog-container"
            onClick={() => history.replace("/dogprofile")}
          >
            <IonImg
              src={dogExamplePhoto}
              className="dog-profile-photo"
              alt="dog"
            />
            <p className="dog-name">Amazing</p>
          </li>
          <li className="dog-container">
            <IonImg
              src={dogExamplePhoto}
              className="dog-profile-photo"
              alt="dog"
            />
            <p className="dog-name">Amazing</p>
          </li>
          <IonIcon icon={addCircleOutline} className="add-icon" />
        </ul>

        <IonButton onClick={handleSignOut}>Log Out</IonButton>
      </IonContent>
    </IonPage>
  );
};
