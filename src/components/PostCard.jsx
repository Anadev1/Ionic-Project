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
  IonList,
} from "@ionic/react";
import { ellipsisHorizontalOutline, time, locationSharp } from "ionicons/icons";
import { Toast } from "@capacitor/toast";
import PostUpdateModal from "./PostUpdateModal";
import { remove } from "@firebase/database";
import { getPostRef, storage } from "../firebase-config";
import { ref, deleteObject } from "@firebase/storage";
import { getAuth } from "firebase/auth";
import placeholder from "../images/placeholder.jpg";
import { useHistory } from "react-router";
import CommentForm from "../components/CommentForm";
import { postsRef, commentsRef } from "../firebase-config";
import { push, set } from "firebase/database";
import { useEffect, useState } from "react";
import { onValue, get } from "firebase/database";
import CommentListItem from "../components/CommentCard";


export default function PostListItem({ post }) {

  // Comments 
  const [comments, setComments] = useState([]);

  async function getPosts() {
    const snapshot = await get(postsRef);
    const postsArray = [];
    snapshot.forEach((postSnapshot) => {
      const id = postSnapshot.key;
      const data = postSnapshot.val();
      const post = {
        id,
        ...data,
      };
      postsArray.push(post);
    });

    return postsArray;
  }

  useEffect(() => {
    async function listenOnChange() {
      onValue(commentsRef, async (snapshot) => {
        const posts = await getPosts();
        const commentsArray = [];
        snapshot.forEach((postSnapshot) => {
          const id = postSnapshot.key;
          const data = postSnapshot.val();
          const post = {
            id,
            ...data,
            post: posts.find((post) => post.id === data.uid),
          };
          commentsArray.push(post);
        });
        setComments(commentsArray.reverse());
      });
    }
    listenOnChange();
  }, []);

  // Edit, delete, user detail functionality
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
    history.push(`users/${post.uid}`);
  }

  const auth = getAuth();

  // Comments 

  async function handleSubmit(newComment) {

    newComment.uid = auth.currentUser.uid; // default user id added
    const newCommentRef = push(commentsRef); // push new to get reference and new id/key
    const newCommentKey = newCommentRef.key; // key from reference
    console.log(newCommentKey);
    set(newCommentRef, newComment)
      .then(() => {
        history.replace("/home");
        Toast.show({
          text: "New comment created!",
        });
      })
      .catch((error) => {
        console.log(error);
      })
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

      <div className="comment-section">
        <h2>Comments</h2>
        <IonList className="ion-no-padding">
          {comments.map((comment) => (
            <CommentListItem post={comment} key={comment.id} />
          ))}
        </IonList>
        <CommentForm handleSubmit={handleSubmit} />
      </div>
    </IonCard>
  );
}
