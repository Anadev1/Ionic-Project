import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
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
        <IonToolbar>
          <IonTitle>Dog Profile Setup</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Dog Profile Setup</IonTitle>
          </IonToolbar>
        </IonHeader>

        <DogForm handleSubmit={handleSubmit} />
      </IonContent>
    </IonPage>
  );
}
