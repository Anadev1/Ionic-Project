import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./ProfileSetup.css";
import { useHistory } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { usersRef } from "../firebase-config";
import { push, set } from "firebase/database";
/* import { uploadString, ref, getDownloadURL } from "@firebase/storage"; */
import UserForm from "../components/UserForm";

export default function ProfileSetup() {
  const history = useHistory();
  const auth = getAuth();
  

  async function handleSubmit(newUser) {
    newUser.uid = auth.currentUser.uid; 
    const newUserRef = push(usersRef);
    const newUserKey = newUserRef.key; 
    console.log(newUserKey);
    /* const imageUrl = await uploadImage(newUser.image, newUserKey); 
    newUser.image = imageUrl; */
    set(newUserRef, newUser)
      .then(() => {
        history.replace("/onboarding1");
      })
      .catch((error) => {
        console.log(error);
      })
  }
/*
  async function uploadImage(imageFile, postKey) {
    const newImageRef = ref(storage, `${postKey}.${imageFile.format}`);
    await uploadString(newImageRef, imageFile.dataUrl, "data_url");
    const url = await getDownloadURL(newImageRef);
    return url;
  } */

  return (
    <IonPage color="light">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile Setup</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profile Setup</IonTitle>
          </IonToolbar>
        </IonHeader>

        <UserForm handleSubmit={handleSubmit} />
      </IonContent>
    </IonPage>
  );
};

