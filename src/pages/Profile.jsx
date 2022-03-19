import {
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonToolbar,
  IonButton,
  IonButtons,
  IonBackButton,
  IonIcon
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./Profile.css";
import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { getUserRef } from "../firebase-config";
import { get } from "@firebase/database";
import { locationSharp } from "ionicons/icons";

export default function Profile() {
  const history = useHistory();
  const auth = getAuth();
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    setUser(auth.currentUser);

    async function getUserDataFromDB() {
      const snapshot = await get(getUserRef(user.uid));
      const userData = snapshot.val();
      if (userData) {
        setName(userData.name);
        setLocation(userData.location);
        setImage(userData.image);
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
        <IonToolbar className="topbar">
          <IonButtons slot="start">
            <IonBackButton className="back-btn" text="" defaultHref="home" />
          </IonButtons>

          <h1 className="topbar-title">Profile</h1>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="user-container">
          <div className="img-container">
            <IonImg className="user-img" src={image} />
          </div>

          <div className="user-info-text">
            <h3>{name}</h3>

            <div className="location-container">
              <IonIcon className="location-icon" icon={locationSharp} />
              <p>{location}</p>
            </div>
          </div>
        </div>
        <div className="button-container">
          <IonButton
            className="profile-btn-alt"
            fill="outline"
            onClick={() => history.replace("/usersetup")}
          >
            Edit
          </IonButton>
          <IonButton className="profile-btn" onClick={handleSignOut}>
            Log out
          </IonButton>
        </div>

        {/* <h2 className="dogs-container-title">My Dog(s)</h2>
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
        </ul> */}
      </IonContent>
    </IonPage>
  );
}
