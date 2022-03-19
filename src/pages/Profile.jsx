import {
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonToolbar,
  IonButton,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./Profile.css";
import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { getUserRef } from "../firebase-config";
import { get } from "@firebase/database";

export default function Profile() {
  const history = useHistory();
  const auth = getAuth();
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    setUser(auth.currentUser);

    async function getUserDataFromDB() {
      const snapshot = await get(getUserRef(user.uid));
      const userData = snapshot.val();
      if (userData) {
        setName(userData.name);
        setAddress(userData.address);
        setCity(userData.city);
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
        <IonCard className="user-container">
          <IonCardContent className="user-info-section">
            <div className="user-image-container">
              <IonImg className="user-profile-photo" src={image} />
              <p onClick={() => history.replace("/usersetup")}>Edit</p>
            </div>

            <div className="user-info-text">
              <IonCardSubtitle>{name}</IonCardSubtitle>
              <p>{address}</p>
              <p>{city}</p>
            </div>
          </IonCardContent>
        </IonCard>

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

        <IonButton onClick={handleSignOut}>Log Out</IonButton>
      </IonContent>
    </IonPage>
  );
}
