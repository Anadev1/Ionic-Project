import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonImg,
  IonButton,
  useIonAlert,
  useIonActionSheet,
  useIonModal,
} from "@ionic/react";
import { Toast } from "@capacitor/toast";
import { remove } from "@firebase/database";
import { getDogRef, storage } from "../firebase-config";
import { ref, deleteObject } from "@firebase/storage";
import { getAuth } from "firebase/auth";
import DogUpdateModal from "./DogUpdateModal";

export default function DogListItem({ dog,onClick }) {
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

    await Toast.show({
      text: "Post deleted!",
      position: "center",
    });
  }
  return (
    <IonCard className="dog-card">
      {dog.uid === currentUserId && (
        <IonButton onClick={showActionSheet}></IonButton>
      )}
      <IonImg className="dog-img" src={dog.image} onClick={onClick}/>
      <IonCardHeader>
        <IonCardTitle>
          <h4>{dog.name}</h4>
        </IonCardTitle>
      </IonCardHeader>
    </IonCard>
  );
}
