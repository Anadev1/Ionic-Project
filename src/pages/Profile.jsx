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
  IonButton,
  IonIcon,
  IonList,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./Profile.css";
import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { getUserRef, dogsRef } from "../firebase-config";
import { onValue, get } from "@firebase/database";
import { addCircleOutline } from "ionicons/icons";
import DogListItem from "../components/DogCard";

export default function Profile() {
  const history = useHistory();
  const auth = getAuth();
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    setUser(auth.currentUser);

    async function getUserDataFromDB() {
      const snapshot = await get(getUserRef(user.uid));
      const userData = snapshot.val();
      if (userData) {
        setName(userData.name);
        setAddress(userData.address);
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
              <IonImg className="user-profile-photo" src={image} />
              <p onClick={() => history.replace("/usersetup")}>Edit</p>
            </div>

            <div className="user-info-text">
              <IonCardSubtitle>{name}</IonCardSubtitle>
              <p>{address}</p>
            </div>
          </IonCardContent>
        </IonCard>

        <h2 className="dogs-container-title">My Dog(s)</h2>
        <IonList>
          {dogs.map((dog) => (
            <DogListItem dog={dog} key={dog.id} />
          ))}
        </IonList>

        <IonIcon
          icon={addCircleOutline}
          className="add-icon"
          onClick={() => history.replace("/dogsetup")}
        />

        <IonButton onClick={handleSignOut}>Log Out</IonButton>
      </IonContent>
    </IonPage>
  );
}
