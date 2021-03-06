import {
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonToolbar,
  IonIcon,
  IonList,
  IonButton,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./Profile.css";
import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { getUserRef, dogsRef } from "../firebase-config";
import { onValue, get } from "@firebase/database";
import { addCircleOutline, locationSharp } from "ionicons/icons";
import DogListItem from "../components/DogCard";
import placeholder from "../images/placeholder.jpg";

export default function Profile() {
  const history = useHistory();
  const auth = getAuth();
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [dogs, setDogs] = useState([]);

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

    async function listenOnChange() {
      onValue(dogsRef, async (snapshot) => {
        // const users = await getUsers();
        const dogsArray = [];
        snapshot.forEach((dogSnapshot) => {
          const id = dogSnapshot.key;
          const data = dogSnapshot.val();
          const dog = {
            id,
            ...data,
          };
          if (user.uid === dog.id) {
            dogsArray.push(dog);
          }
        });
        setDogs(dogsArray.reverse());
      });
    }
    listenOnChange();
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
            <IonImg
              className="user-img"
              src={image ? image : placeholder}
            />
          </div>

          <div className="user-info-text">
            <h3>{name ? name : "Unknown name"}</h3>

            <div className="location-container">
              <IonIcon className="location-icon" icon={locationSharp} />
              <p>{location ? location : "Unknown location"}</p>
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

        <div className="dog-header">
          <h2 className="dogs-container-title">My Dog(s)</h2>
          <IonList className="ion-no-padding dogs-container">
            {dogs.map((dog) => (
              <DogListItem dog={dog} key={dog.name} onClick={()=>{
                history.push({
                  pathname:"/dogprofile",
                  state:{dog:dog}
                })
              }}/>
            ))}

            <IonIcon
              icon={addCircleOutline}
              className="add-icon-alt"
              onClick={() => history.replace("/dogsetup")}
            />
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
}
