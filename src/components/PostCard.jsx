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
import { ellipsisHorizontalOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();
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

  function goToUserDetailView() {
    history.push(`walks/${post.uid}`);
  }

  return (
    <IonCard>
      <IonItem lines="none">
        <IonAvatar slot="start" onClick={goToUserDetailView}>
          <IonImg src={post.user?.image ? post.user.image : placeholder} />
        </IonAvatar>
        <IonLabel onClick={goToUserDetailView}>
          <h2>{post.user?.name ? post.user.name : "Unknown User Name"}</h2>
          <p>
            {post.user?.address ? post.user.address : "Unknown User Address"}
          </p>
          <p>{post.user?.city ? post.user.city : "Unknown User City"}</p>
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
          <h4>{post.time}</h4>
          <div>
            <h6>{post.time}</h6>
            <h6>{post.address}</h6>
          </div>
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>{post.description}</IonCardContent>
    </IonCard>
  );
}
