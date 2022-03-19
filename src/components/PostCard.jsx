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
  IonAvatar,
  IonLabel,
  useIonModal,
} from "@ionic/react";
import { ellipsisHorizontalOutline, time, locationSharp } from "ionicons/icons";
import { Toast } from "@capacitor/toast";
import PostUpdateModal from "./PostUpdateModal";
import { remove } from "@firebase/database";
import { getPostRef, storage } from "../firebase-config";
import { ref, deleteObject } from "@firebase/storage";
import { getAuth } from "firebase/auth";
import placeholder from "../images/placeholder.jpg";

export default function PostListItem({ post }) {
  const [presentActionSheet] = useIonActionSheet();
  const [presentDeleteDialog] = useIonAlert();
  const [presentUpdateModal, dismissUpdateModal] = useIonModal(
    <PostUpdateModal post={post} dismiss={handleDismissUpdateModal} />
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
      header: "Delete Post",
      message: "Do you want to delete post?",
      buttons: [
        { text: "No" },
        { text: "Yes", role: "destructive", handler: deletePost },
      ],
    });
  }

  function handleDismissUpdateModal() {
    dismissUpdateModal();
  }

  async function deletePost() {
    let imageName = post.image.split("/").pop();
    imageName = imageName.split("?alt")[0];
    const imageRef = ref(storage, imageName);
    await deleteObject(imageRef);
    remove(getPostRef(post.id));

    await Toast.show({
      text: "Post deleted!",
      position: "center",
    });
  }

  return (
    <IonCard>
      <IonItem lines="none">
        <IonAvatar slot="start">
          <IonImg src={post.user?.image ? post.user.image : placeholder} />
        </IonAvatar>
        <IonLabel>
          <h2>{post.user?.name ? post.user.name : "Unknown User Name"}</h2>
          <p>
            {post.user?.location ? post.user.location : "Unknown User Location"}
          </p>
        </IonLabel>
        {post.uid === currentUserId && (
          <IonButton fill="clear" onClick={showActionSheet}>
            <IonIcon slot="icon-only" icon={ellipsisHorizontalOutline} />
          </IonButton>
        )}
      </IonItem>
      <IonImg className="post-img" src={post.image} />
      <IonCardHeader>
        <IonCardTitle>
          <h4>{post.dogName}</h4>
        </IonCardTitle>
        <div className="card-info">
          <div className="icon-container">
            <IonIcon className="card-icon" slot="icon-only" icon={time} />
            <h6>{post.time}</h6>
          </div>
          <div className="icon-container">
            <IonIcon
              className="card-icon"
              slot="icon-only"
              icon={locationSharp}
            />
            <h6>{post.address}</h6>
          </div>
        </div>
      </IonCardHeader>
      <IonCardContent>{post.description}</IonCardContent>
    </IonCard>
  );
}
