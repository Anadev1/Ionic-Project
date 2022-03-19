import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonImg,
  IonItem,
  IonButton,
  IonIcon,
  useIonAlert,
  useIonActionSheet,
} from "@ionic/react";
import { ellipsisHorizontalOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { remove } from "@firebase/database";
import { getDogRef, storage } from "../firebase-config";
import { ref, deleteObject } from "@firebase/storage";
import { getAuth } from "firebase/auth";

export default function DogListItem({ dog }) {
  const [presentActionSheet] = useIonActionSheet();
  const [presentDeleteDialog] = useIonAlert();
  /*const [presentUpdateModal, dismissUpdateModal] = useIonModal(
    <PostUpdateModal post={post} dismiss={handleDismissUpdateModal} /> 
  );*/
  const history = useHistory();
  const currentUserId = getAuth().currentUser.uid;

  function showActionSheet(event) {
    event.preventDefault();
    presentActionSheet({
      buttons: [
        /*{ text: "Edit", handler: presentUpdateModal },*/
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

  /*function handleDismissUpdateModal() {
    dismissUpdateModal();
  }*/

  async function deleteDog() {
    let imageName = dog.image.split("/").pop();
    imageName = imageName.split("?alt")[0];
    const imageRef = ref(storage, imageName);
    await deleteObject(imageRef);
    remove(getDogRef(dog.id));
  }

  function goToDogDetailView() {
    history.push(`dogs/${dog.uid}`);
  }

  return (
    <IonCard onClick={goToDogDetailView}>
      <IonItem lines="none">
        {/* <IonAvatar slot="start" onClick={goToDogDetailView}>
          
        </IonAvatar> */}
        {dog.uid === currentUserId && (
          <IonButton fill="clear" onClick={showActionSheet}>
            <IonIcon slot="icon-only" icon={ellipsisHorizontalOutline} />
          </IonButton>
        )}
      </IonItem>
      <IonImg className="dog-img" src={dog.image} />
      <IonCardHeader>
        <IonCardTitle>
          <h4>{dog.name}</h4>
        </IonCardTitle>
        <IonCardTitle>
          <h4>{dog.age}</h4>
        </IonCardTitle>
        <IonCardTitle>
          <h4>{dog.breed}</h4>
        </IonCardTitle>
        <p>{dog.additionalInfo}</p>
        <p>{dog.uid}</p>
      </IonCardHeader>
    </IonCard>
  );
}
