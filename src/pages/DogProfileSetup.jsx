import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonBackButton
} from "@ionic/react";
import "./DogProfileSetup.css";
import { useHistory } from "react-router-dom";
import { dogsRef } from "../firebase-config";
import { push, set } from "firebase/database";
import DogForm from "../components/DogForm";

export default function DogProfileSetup() {
  const history = useHistory();

  async function handleSubmit(newDog) {
    const newDogRef = push(dogsRef);
    const newDogKey = newDogRef.key;
    console.log(newDogKey);
    /* const imageUrl = await uploadImage(newUser.image, newUserKey); 
    newUser.image = imageUrl; */
    set(newDogRef, newDog)
      .then(() => {
        history.replace("/profile");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <IonPage color="light">
      <IonHeader>
        <IonToolbar className="topbar">
          <IonButtons slot="start">
            <IonBackButton className="back-btn" text="" defaultHref="home" />
          </IonButtons>
          <h1 className="topbar-title">Add dog</h1>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <DogForm handleSubmit={handleSubmit} />
      </IonContent>
    </IonPage>
  );
}
