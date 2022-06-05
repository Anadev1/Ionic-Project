import {
  IonCard,
  IonImg,
  IonItem,
  IonAvatar,
  IonLabel,
} from "@ionic/react";
import { getAuth } from "firebase/auth";
import placeholder from "../images/placeholder.jpg";
import { useHistory } from "react-router";

export default function CommentListItem({ comment, post }) {

  const history = useHistory();
  const currentUserId = getAuth().currentUser.uid;


  function goToUserDetailView() {
    history.push(`users/${comment.uid}`);
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
      </IonItem>
      <IonImg className="post-img" src={post.image} />
      <p>
        {comment.user?.message}
      </p>
    </IonCard>
  );
}
