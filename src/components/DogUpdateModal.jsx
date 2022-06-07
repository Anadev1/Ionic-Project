import {
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonContent,
  useIonLoading,
} from "@ionic/react";
import DogForm from "./DogForm";
import { getDogRef } from "../firebase-config";
import { update } from "firebase/database";
import { storage } from "../firebase-config";
import { uploadString, ref, getDownloadURL } from "@firebase/storage";

export default function DogUpdateModal({ dog, dismiss }) {
  const [showLoader, dismissLoader] = useIonLoading();

  async function updateDog(dogToUpdate) {
    showLoader();
    if (dogToUpdate.image.dataUrl) {
      const imageUrl = await uploadImage(dogToUpdate.image, dog.id);
      dogToUpdate.image = imageUrl;
    } else {
      delete dogToUpdate.image;
    }
    console.log(dogToUpdate);
    await update(getDogRef(dog.id), dogToUpdate);
    dismiss();
    dismissLoader();
  }

  async function uploadImage(imageFile, dogKey) {
    const newImageRef = ref(storage, `${dogKey}.${imageFile.format}`);
    await uploadString(newImageRef, imageFile.dataUrl, "data_url");
    const url = await getDownloadURL(newImageRef);
    return url;
  }

  return (
    <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="secondary">
            <IonButton onClick={() => dismiss()}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Edit dog profile</IonTitle>
        </IonToolbar>
        
      </IonHeader>
      <DogForm post={dog} handleSubmit={updateDog} />
    </IonContent>
  );
}
