import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonImg,
  IonButton,
  useIonAlert,
  useIonActionSheet,
  useIonModal
} from "@ionic/react";
import { remove } from "@firebase/database";
import { getDogRef, storage } from "../firebase-config";
import { ref, deleteObject } from "@firebase/storage";
import { getAuth } from "firebase/auth";
import DogUpdateModal from "./DogUpdateModal";

export default function DogListItem({ dog }) {
  const [presentActionSheet] = useIonActionSheet();
  const [presentDeleteDialog] = useIonAlert();
  const [presentUpdateModal, dismissUpdateModal] = useIonModal(
    <DogUpdateModal post={dog} dismiss={handleDismissUpdateModal} /> 
  );

  const currentUserId = getAuth().currentUser.uid;

  function showActionSheet(event) {
    event.preventDefault();
    presentActionSheet({
      buttons: [
        { text: "Edit", handler: presentUpdateModal },
        { text: "Delete", role: "destructive", handler: showDeleteDialog },
        { text: "Cancel", role: "cancel" },
      ],
    });
  }

  function showDeleteDialog() {
    presentDeleteDialog({
      header: "Delete Dog",
      message: "Do you want to delete this dog?",
      buttons: [
        { text: "No" },
        { text: "Yes", role: "destructive", handler: deleteDog },
      ],
    });
  }

  function handleDismissUpdateModal() {
    dismissUpdateModal();
  }

  async function deleteDog() {
    let imageName = dog.image.split("/").pop();
    imageName = imageName.split("?alt")[0];
    const imageRef = ref(storage, imageName);
    await deleteObject(imageRef);
    remove(getDogRef(dog.id));
  }

  return (
    <IonCard className="dog-card">
      {dog.uid === currentUserId && (
        <IonButton fill="clear" onClick={showActionSheet}></IonButton>
      )}

      <IonImg className="user-img" src={dog.image} onClick={showActionSheet} />
      <IonCardHeader>
        <IonCardTitle>
          <h4>{dog.name}</h4>
        </IonCardTitle>
      </IonCardHeader>
    </IonCard>
  );
}
